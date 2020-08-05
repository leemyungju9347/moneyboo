<template>
  <div class="daily-list" :class="{ 'list-empty': listArray.length == 0 }">
    <ul class="daily-list-cont">
      <!-- {{
        listArray
      }} -->
      <!-- ****************** firstore 출력 부분 **********************-->
      <ul>
        <li v-if="listArrLength === 0">
          {{ logMessage }}
        </li>
        <li v-for="(item, index) in getAllListData" :key="index" v-else>
          <strong>{{ item.id }}</strong>
          <ul>
            <li v-for="list in item.data" :key="list.id">
              <p v-if="list.item === 'income'">
                {{ list.item }}
                {{ list.category }}
                + {{ list.price }}
              </p>
              <p v-else>
                {{ list.item }}
                {{ list.category }}
                - {{ list.price }}
              </p>
            </li>
          </ul>
        </li>
      </ul>
      <!-- **************** firstore 출력 부분 확인하고 삭제해주세요!! ****************-->
      <li v-if="listArray.length == 0">
        등록한 내역이 없습니다.
      </li>
      <li
        v-else
        class="daily-list-day"
        v-for="date in sortListDate()"
        :key="date"
      >
        <strong class="font-uto">{{ date }}</strong>
        <em class="daily-list-income"
          >수입 : <b class="list-income">{{ checkDayIncome(date) }}원</b></em
        >
        <em class="daily-list-expend"
          >지출 : <b class="list-expend">{{ checkDayExpend(date) }}원</b></em
        >
        <ul>
          <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
          <!-- <li v-for="list in propsdata" :key="list.id" v-if="list.date == date"> -->
          <li v-for="list in listArray" :key="list.id">
            <!-- :class="convertIntoIcon(list.category)" -->

            <i class="category-icon"></i>

            <!-- <p class="list-text">{{ list.text }}</p> -->
            <span class="font-uto"> {{ list.bank }} </span>
            <p class="list-text">{{ list.text }}</p>
            <b v-if="list.item === 'income'"
              ><a
                href="#/daily"
                title="수정하기"
                class="list-income"
                @click.prevent="editList(list)"
                >+ {{ editCommaPrice(list.price) }} 원</a
              ></b
            >
            <b class="list-expend" v-else>
              <a
                href="#/daily"
                title="수정하기"
                class="list-expend"
                @click.prevent="editList(list)"
              >
                - {{ editCommaPrice(list.price) }} 원</a
              >
            </b>
            <!-- <p class="list-text">{{ list.text }}</p> -->
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
import { deleteListCookie } from '@/utils/cookies';
import { addComma } from '@/utils/filters';
import { eventBus } from '@/main';
import { moneybooRef } from '@/api/firebase';

export default {
  created() {
    this.listArray = this.$store.state.listData;

    /*
      회원가입하고 아무것도 추가하지 않은 상태에서 daily Page 들어왔을때부터 생각해줘야함

      1. daily doc이 없으면?
      2. listAdd coll이 없으면?
      3. 해당 날짜의 doc이 없으면?
    */
    this.getListData();

    // // 스토어의 전체 리스트를 불러온다.
    // let allList = this.$store.state.listData;
    // // 카테고리 할당
    // this.categorys = this.$store.state.categorys;

    // // 이번달 확인 후 모든 리스트에서 달이 같은 리스트를 불러온 뒤, 해당달의 내역이라면 listArray에 push해 준다.
    // let Month = new Date().getMonth() + 1;
    // for (let i = 0; i < allList.length; i++) {
    //   let checkMonth = allList[i].date.split('.');
    //   if (checkMonth[0] == Month) {
    //     this.listArray.push(allList[i]);
    //   }
    // }
  },
  // props: ['propsdata'],
  data() {
    return {
      listArray: [],
      // listArray: [],
      listDateArray: [],
      currentUid: this.$store.state.uid, // 현재 로그인한 유저 uid
      // 왜 새로고침을 해야 반영이 될까? ( 쿠키에 저장하기만하고 스토어에 저장 안할때)
      // categorys: this.$store.state.categorys,
      categorys: [],
      getAllListData: [],
      listArrLength: 0,
      logMessage: '',
      // 이번달데이터: [],
    };
  },
  methods: {
    // firestore에 있는 저장된 DB를 가져오는 함수
    getListData() {
      // listAdd collection 하위에 있는 document 전체를 불러옴
      this.dailyListAddRef()
        .get()
        .then(querySnapshot => {
          const docSnapshot = querySnapshot.docs;
          this.listArrLength = querySnapshot.size; // 문서의 값이 있는지 없는지 판단해서 처리할 용도

          // 데이터가 생성되지 않았을 경우
          if (querySnapshot.empty) {
            this.logMessage = '등록한 내역이 없습니다!!';

            // 데이터가 있을 경우 실행
          } else {
            this.logMessage = ''; // 로그메세지 리셋
            // document 출력

            // 가져온 데이터를 배열에 삽입
            docSnapshot.forEach(doc => {
              this.getAllListData.push({
                id: doc.id, // document 이름
                data: doc.data().listData,
              });
            });
          }
        })
        .catch(err => {
          console.log('위치는 DailyList 메쏘드', err);
        });
    },
    // listAdd collection 참조 값
    dailyListAddRef() {
      return this.mbooRef()
        .doc('daily')
        .collection('listAdd');
    },
    mbooRef() {
      return moneybooRef(this.currentUid);
    },
    // 날짜 정렬 함수
    sortListDate() {
      // 저장된 객체가 없으면 리턴해서 나가라.
      if (!this.listArray) return;

      let copyListArray = this.listArray;
      let dateArray = [];

      // date만 dateArray 에 할당한다.
      for (let i = 0; i < copyListArray.length; i++) {
        dateArray[i] = copyListArray[i].date;
      }
      // dateArray, 즉 입력값이 하나면 그대로 dateArray에 담고 나가라.
      if (dateArray.length == 1) {
        return (this.listDateArray = dateArray);
      }
      // 1개 이상이라면 내림차순으로 정렬한다. ( 최근 리스트가 가장 위로 올라오게 하기 위함)
      dateArray.sort(function(a, b) {
        return b - a;
      });
      // 중복값 제거 ( 중복값 세개이상일때 예외처리 해야함)
      for (let i = 0; i < dateArray.length; i++) {
        if (dateArray[i] === dateArray[i - 1]) {
          // 값이 같다면 지워라
          dateArray.splice(i, 1);
          // 위에서 splice 로 중복값을 지워줬기 때문에 i값도 빼줘야 dateArray를 순차적으로 돌수있다.
          i--;
        }
      }
      // 중복값이 없다면 this.listDateArray 에 할당후 함수를 빠져나가라.
      return (this.listDateArray = dateArray);
    },
    // 하루 수입 확인 함수
    checkDayIncome(date) {
      let copyListArray = this.listArray;
      let totalPrice = 0;
      for (let i = 0; i < copyListArray.length; i++) {
        if (
          copyListArray[i].item === 'income' &&
          copyListArray[i].date === date
        ) {
          let stringToNumber = Number(copyListArray[i].price);
          totalPrice += stringToNumber;
        }
      }
      return addComma(totalPrice);
    },
    // 하루 지출 확인 함수
    checkDayExpend(date) {
      let copyListArray = this.listArray;
      let totalPrice = 0;
      for (let i = 0; i < copyListArray.length; i++) {
        if (
          copyListArray[i].item === 'expend' &&
          copyListArray[i].date === date
        ) {
          let stringToNumber = Number(copyListArray[i].price);
          totalPrice += stringToNumber;
        }
      }
      return addComma(totalPrice);
    },
    editList(data) {
      console.log('수정해야할 리스트');
      console.log(data);
      eventBus.editList(data);
      // deleteCookie(data);
    },
    editCommaPrice(price) {
      return addComma(price);
    },
    conversionDate(date) {
      // console.log(date);

      // 저장되는 날짜를 한국기준으로 정리해서 저장.
      let month = date.getMonth();
      let todayDate = date.getDate();

      return `${month + 1}.${todayDate}`;
      // 출력 형식 : 7.17
    },
    // convertIntoIcon(category) {
    //   let copyCategorys = this.categorys;
    //   let categoryIconNum = 0;
    //   for (let i = 0; i < copyCategorys.name.length; i++) {
    //     if (copyCategorys.name[i] == category) {
    //       categoryIconNum = i;
    //     }
    //   }
    //   return copyCategorys.icon[categoryIconNum];
    // },
    deleteListData(list) {
      // console.log();
      deleteListCookie(list);
    },
    // 이번달만추리기() {
    //   let copyList = this.listArray;
    //   let Month = new Date().getMonth() + 1;
    //   for (let i = 0; i < copyList.length; i++) {
    //     let checkMonth = copyList[i].date.split('.');
    //     if (checkMonth[0] == Month) {
    //       this.이번달데이터.push(copyList[i]);
    //       console.log(copyList[i]);
    //     }
    //   }
    // },
  },
};
</script>

<style></style>
