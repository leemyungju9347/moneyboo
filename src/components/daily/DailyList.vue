<template>
  <div class="daily-list" :class="{ 'list-empty': getAllListData.length == 0 }">
    <ul class="daily-list-cont">
      <!-- 데일리에 등록한 값이 없을때 보여지는 화면 -->
      <li v-if="getAllListData.length == 0">
        등록한 내역이 없습니다.
      </li>
      <!-- 데일리에 등록한 값이 있을때 보여지는 화면 -->
      <li
        v-else
        class="daily-list-day"
        v-for="date in callSortListDate()"
        :key="date"
      >
        <strong class="font-uto">{{ `${addMonth()}.${date}` }}</strong>
        <em class="daily-list-expend"
          >지출 :
          <b class="list-expend"
            >{{ callCheckDayItem(date, 'expend') }}원</b
          ></em
        >
        <em class="daily-list-income"
          >수입 :
          <b class="list-income"
            >{{ callCheckDayItem(date, 'income') }}원</b
          ></em
        >
        <ul>
          <li v-for="list in callCheckMatchDateList(date)" :key="list.id">
            <i
              class="category-icon"
              :class="callConvertIntoIcon(list.category)"
            ></i>
            <span class="font-uto"> {{ list.bank }} </span>
            <p class="list-text">{{ list.text }}</p>
            <b v-if="list.item === 'income'"
              ><a
                href="#/daily"
                title="수정하기"
                class="list-income"
                @click.prevent="clickeEditList(list)"
                >+ {{ editCommaPrice(list.price) }} 원</a
              ></b
            >
            <b class="list-expend" v-else>
              <a
                href="#/daily"
                title="수정하기"
                class="list-expend"
                @click.prevent="clickeEditList(list)"
              >
                - {{ editCommaPrice(list.price) }} 원</a
              >
            </b>
            <button
              class="btn list-delete"
              @click.prevent="deleteListData(list)"
            >
              <i class="fas fa-times"></i>
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { addComma, newConversionMonth } from '@/utils/filters';
import { eventBus } from '@/main';
import firebase from 'firebase';
import { moneybooRef, settingColRef } from '@/api/firestore';
import {
  sortListDate,
  checkMatchDateList,
  checkDayItem,
  convertIntoIcon,
} from '@/utils/daily.js';

export default {
  created() {
    this.getListData();
    this.getBanksData();
    this.getCategoriesData();
  },
  computed: {
    ...mapState(['uid']), // 현재 로그인한 유저 uid
  },
  data() {
    return {
      listDateArray: [],
      getAllListData: [],
      getCategory: [],
    };
  },
  methods: {
    // firestore에 있는 저장된 은행 DB 불러오기
    getBanksData() {
      this.settingListRef()
        .doc('banks')
        .onSnapshot(snapshot => {
          // document의 값이 있으면
          if (snapshot.exists) {
            const banks = snapshot.data().banks;
            if (banks) {
              this.getBankAsset = banks;
            }
          } else if (this.$router.currentRoute.path !== '/daily') {
            alert(
              '관리 페이지에서 은행값을 등록해주세요! 관리페이지로 이동합니다.',
            );
            this.$router.push('/setting');
          } else return;
        });
    },
    // firestore에 있는 저장된 카테고리 DB 불러오기
    getCategoriesData() {
      this.settingListRef()
        .doc('categories')
        .onSnapshot(snapshot => {
          // document의 값이 있으면
          if (snapshot.exists) {
            const categories = snapshot.data().categories;
            if (categories) {
              // this.getCategory 에 category 이름만 넣어라.
              categories.forEach(data => {
                this.getCategory.push(data);
              });
            }
          } else {
            alert(
              '관리 페이지에서 카테고리값을 등록해주세요! 관리페이지로 이동합니다.',
            );
            this.$router.push('/setting');
          }
        });
    },
    getListData() {
      const yearsMonth = newConversionMonth();

      // listAdd collection 하위에 있는 document 전체를 불러옴
      this.dailyListAddRef()
        .doc(yearsMonth)
        .onSnapshot(snapshot => {
          snapshot.exists
            ? (this.getAllListData = snapshot.data().listData)
            : console.log('값이 없습니다!');
        });
    },
    // listAdd collection 참조 값
    dailyListAddRef() {
      return this.mbooRef()
        .doc('daily')
        .collection('listAdd');
    },
    mbooRef() {
      return moneybooRef(this.uid);
    },
    settingListRef() {
      // settings document > settingList collection 참조값
      return settingColRef(this.uid);
    },
    // 날짜 정렬 함수
    callSortListDate() {
      return (this.listDateArray = sortListDate(this.getAllListData));
    },
    // 하루 수입, 지출 확인 함수
    callCheckDayItem(date, item) {
      return checkDayItem({
        date: date,
        item: item,
        data: this.getAllListData,
        to: 'list',
      });
    },
    // 수정버튼 눌렀을때의 함수
    clickeEditList(data) {
      eventBus.editList(data);
    },
    editCommaPrice(price) {
      return addComma(price);
    },
    // 카테고리 이름을 아이콘으로 변경해주는함수
    callConvertIntoIcon(category) {
      return convertIntoIcon(category, this.getCategory);
    },
    // 삭제버튼을 눌렀을때의 함수
    deleteListData(list) {
      const yearsMonth = newConversionMonth();
      this.dailyListAddRef()
        .doc(yearsMonth)
        .update({
          listData: firebase.firestore.FieldValue.arrayRemove(list),
        });
    },
    // date 에 맞는 list 만 불러오는 함수
    callCheckMatchDateList(date) {
      return checkMatchDateList(date, this.getAllListData);
    },
    // 월 만 추가해주고 리턴하는 함수
    addMonth() {
      const month = new Date().getMonth() + 1;
      return month;
    },
  },
};
</script>

<style></style>
