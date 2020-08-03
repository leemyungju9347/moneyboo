<template>
  <div class="daily-list-add">
    <!-- <form class="add-cont" @submit.prevent="submitList"> -->
    <form class="add-cont" @submit.prevent="submitList">
      {{ date }}
      <button
        type="button"
        v-on:click="clickIncomeBtn()"
        class="add-income-btn"
        v-bind:class="{ inputOn: inputControl === 'income' }"
      >
        수입
      </button>
      <button
        type="button"
        v-on:click="clickExpendBtn()"
        class="add-expend-btn"
        v-bind:class="{ inputOn: inputControl === 'expend' }"
      >
        지출
      </button>
      <div>
        <!-- <button class="btn what-date" type="button">날짜</button> -->
        <DatePicker
          v-model="date"
          color="green"
          titlePosition="center"
          :available-dates="{
            start: new Date(2020, 0, 1),
            end: new Date(),
          }"
        ></DatePicker>
        <select v-model="selectCategory">
          <option disabled value="">분류</option>
          <option v-for="(name, index) in getCategory" :key="index">{{
            name
          }}</option>
        </select>
        <select class="add-bank" v-model="selectBank">
          <option disabled value="">은행</option>
          <option>현금</option>
          <option v-for="(name, index) in bankAsset.bank" :key="index">{{
            name
          }}</option>
        </select>
        <input
          class="price-box"
          type="text"
          v-model="price"
          placeholder="금액을 입력해주세요."
        />
        <input
          class="text-box"
          type="text"
          v-model="listText"
          placeholder="상세내역을 입력해주세요."
        />
        <button class="btn small list-add-btn">
          <i class="fas fa-plus"></i>
        </button>
        <!-- <button class="btn small list-add-btn">등록</button> -->
      </div>
    </form>
  </div>
</template>

<script>
import { saveListData } from '@/utils/cookies.js';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
// import DatePicker from '@/js/v-calendar.js';
import { makeID } from '@/utils/filters.js';
import { eventBus } from '@/main.js';
import { getUsersRef } from '@/api/firebase';
import firebase from 'firebase';

export default {
  components: { DatePicker },
  created() {
    eventBus.$on('editList', data => {
      // 리스트에서 edit 버튼을 누른다면,
      console.log(data);
      let dd = new Date(` 2020, ${data.date}`);
      // 데이터는 연결이 잘 되는데, 달력에 연결이 안된다...
      this.date = dd.toString();
      this.price = data.price;
      this.inputControl = data.item;
      this.selectCategory = data.category;
      this.selectBank = data.bank;
      this.edit = true;
      this.editId = data.id;
      this.listText = data.text;
    });
    this.categorys = this.$store.state.categorys;
    // getCategoryCookie();
    // getBanksCookie(this.saveAsset);

    // Select option에 setting에서 받아온 category 값 셋팅
    const moneybooRef = getUsersRef()
      .doc(this.currentUid)
      .collection('moneyboo');

    moneybooRef
      .doc('settings')
      .get()
      .then(docSnapshot => {
        // 값이 있으면
        if (docSnapshot) {
          const setCategory = docSnapshot.data().setCategory;
          setCategory.forEach(el => {
            console.log(el.name);
            this.getCategory.push(el.name);
          });
          //값이 없으면
        } else {
          console.log('setting에 값이 없음');
        }
      })
      .catch(err => {
        console.log('에러가 발생한 위치는 listAdd Created', err);
      });
  },
  data() {
    return {
      date: new Date(),
      inputControl: 'income',
      selectCategory: '',
      selectBank: '',
      price: null,
      listText: '',
      edit: false,
      editId: '',
      // num: 1,
      // categorys: this.$store.state.categorys,
      // saveAsset: {
      //   total: this.$store.state.totalGoal,
      //   cash: this.$store.state.cashGoal,
      //   banks: [],
      // },
      categorys: [],
      bankAsset: this.$store.state.bankAsset,
      currentUid: this.$store.state.uid,
      getCategory: [],
    };
  },
  methods: {
    // 수입 지출 버튼에 따른 인풋창 변화.
    clickIncomeBtn() {
      this.inputControl = 'income';
    },
    clickExpendBtn() {
      this.inputControl = 'expend';
    },
    // checkEmptyList() {},
    // checkPriceNumber() {
    //   // 숫자가 아니면 alert 창을 띄워라
    //   if (isNaN(this.price)) {
    //     alert('숫자만 입력해주세요');
    //     return;
    //   }
    // },
    submitList() {
      if (
        // 하나라도 값이 입력되지 않으면, alert창으로 입력해야함을 알려야 한다.
        this.selectCategory === '' ||
        this.selectBank === '' ||
        this.price === null
      ) {
        alert('값을 선택, 입력해 주세요.');
        return;
      }
      // 숫자가 아니라면, alert 창으로 숫자만 입력해야함을 알린다.
      if (isNaN(this.price)) {
        alert('숫자만 입력해주세요');
        this.price = null;
        return;
      }
      // 값이 하나라도 빌 경우를 확인해주는 함수
      let listData = {};
      if (this.edit === true) {
        listData = {
          id: this.editId,
          date: this.conversionDate(this.date), // 한국날짜로 변환
          item: this.inputControl,
          category: this.selectCategory,
          bank: this.selectBank,
          price: this.price,
          text: this.listText,
        };
      } else {
        listData = {
          id: makeID('l'),
          date: this.conversionDate(this.date), // 한국날짜로 변환
          item: this.inputControl,
          category: this.selectCategory,
          bank: this.selectBank,
          price: this.price,
          text: this.listText,
        };
      }
      // if (this.id) {
      //   console.log('수정한 리스트 저장한다!');
      // }

      // *** 신규사용자 데일리페이지에서 첫 등록하면 등록 안됨 확인해야함

      /*
        <데이터 구조>
        users (collection)
          - currentUid (document)
            - moneyboo (sub collection)
              - daily (doc)
                - listAdd (sub sub collection)
                  - 7.29 (doc)
                    - income (field title) = array
                      [{listData}][0] (field)
                      [{listData}][1] (field)
                      [{listData}][2] (field)
                    - expend 
                      [{listData}][0]
                      [{listData}][1]
                      [{listData}][2]
                  - 7.30
                  - 7.31
      */

      /* 
        신규사용자 문제!!! ==>> 일단 해결 
        - 처음 회원가입 하고 로그인하면 field의 income을  찾지 못함 예외처리 해줄것
        - 새로운 사용자는 추가해도 문서가 안생김...일단 나중에 처리하자


        만약 listData === 0 이면 set으로 데이터 등록 해준뒤에 update문으로 갱신?

        !!!!!!!!!!!!!!! 왜 처음에 배열 셋팅이 안될까!!!???????????ㅡㅡ
        다시해보니 된다 됐다 안됐다 한다....... 일단패쓰ㅠ
      */

      let today = new Date();
      this.conversionDate(today);

      const dailyListAddRef = getUsersRef()
        .doc(this.currentUid)
        .collection('moneyboo')
        .doc('daily')
        .collection('listAdd');

      // dailyListAdd Ref를 불러와서
      dailyListAddRef
        .doc(this.conversionDate(today))
        .get()
        .then(docSnapshot => {
          // 만약 document값이 없으면 초기값 셋팅해주고
          if (!docSnapshot.exists) {
            dailyListAddRef
              .doc(this.conversionDate(today))
              .set({ listData: [listData] });
            console.log('초기 리스트 데이터 저장');

            // 만약 값이 있다면 배열을 업데이트 해줄것
          } else {
            console.log('리스트 데이터 업데이트');

            dailyListAddRef.doc(this.conversionDate(today)).update({
              listData: firebase.firestore.FieldValue.arrayUnion(listData),
            });
          }
        })
        .catch(err => {
          console.log('listAdd submitList 부분 에러 발생', err);
        });
      /* 
        문제점 발견

        1. 만약 document에 값이 없다면 set을 해줘야함
        2. 그 뒤에 update 데이터
        ** 3. field 값에 데이터가 없으면 income도 못불러오고 적용이 안되기때문에 오류가 난다 다른 조건을 주자.. 
      */

      console.log(listData);
      // 쿠키저장
      saveListData(listData);
      // this.$emit('addListData', listData);
      this.resetData(); // 인풋창의 데이터를 리셋해주는 함수
    },
    resetData() {
      // 인풋창의 데이터를 리셋해주는 함수
      this.date = new Date();
      this.inputControl = 'income';
      this.selectCategory = '';
      this.selectBank = '';
      this.price = null;
      this.listText = '';
    },
    conversionDate(date) {
      console.log(date);
      console.log(new Date());

      // 저장되는 날짜를 한국기준으로 정리해서 저장.
      let month = date.getMonth();
      let todayDate = date.getDate();

      return `${month + 1}.${todayDate}`;
      // 출력 형식 : 7.17
    },
  },
};
// 1. 인풋창 숫자가 아닐때 처리해주기
</script>

<style></style>
