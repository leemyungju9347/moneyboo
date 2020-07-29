<template>
  <div class="daily-list-add">
    <!-- <form class="add-cont" @submit.prevent="submitList"> -->
    <form class="add-cont" @submit="submitList">
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
          <option v-for="(name, index) in categorys.name" :key="index">{{
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
