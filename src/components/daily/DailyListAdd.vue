<template>
  <div class="daily-list-add">
    <form class="add-cont" @submit.prevent="submitList">
      <!-- <vc-calendar />
      <v-date-picker /> -->
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
          class="btn what-date"
          v-model="date"
          color="green"
        ></DatePicker>
        <select v-model="selectCategory">
          <option disabled value="">분류</option>
          <option>식비</option>
          <option>교통비</option>
        </select>
        <select class="add-bank" v-model="selectBank">
          <option disabled value="">은행</option>
          <option>농협</option>
          <option>기업은행</option>
        </select>
        <input
          type="text"
          v-model="price"
          placeholder="내역을 0 단위로 입력해주세요. ex 10,000"
        />
        <button class="btn list-add-btn">등록</button>
      </div>
    </form>
  </div>
</template>

<script>
// import Monthly from '@/components/daily/Monthly.vue';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
// import Vue from 'vue';
// import VCalendar from 'v-calendar';

// Vue.use(VCalendar, {
//   componentPrefix: 'vc', // Use <vc-calendar /> instead of <v-calendar />               // ...other defaults
// });

export default {
  components: { DatePicker },
  data() {
    return {
      date: new Date(),
      inputControl: 'income',
      selectCategory: '',
      selectBank: '',
      price: null,
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
      const listData = {
        date: this.conversionDate(this.date), // 한국날짜로 변환
        item: this.inputControl,
        category: this.selectCategory,
        bank: this.selectBank,
        price: Number(this.price).toLocaleString(), // 세자리수 변환
      };

      console.log(listData);
      this.$store.commit(
        'SET_DAILYLIST',
        this.$store.state.listData.push(listData),
      );
      this.resetData(); // 인풋창의 데이터를 리셋해주는 함수
    },
    resetData() {
      // 인풋창의 데이터를 리셋해주는 함수
      this.date = new Date();
      this.inputControl = 'income';
      this.selectCategory = '';
      this.selectBank = '';
      this.price = null;
    },
    conversionDate(date) {
      // 저장되는 날짜를 한국기준으로 정리해서 저장.
      let month = date.getMonth();
      let todayDate = date.getDate();
      let hh = date.getHours().toString();
      let mm = date.getMinutes().toString();
      let ss = date.getSeconds().toString();

      return ` ${month + 1}.${todayDate} ${hh < 10 ? `0${hh}` : hh}:${
        mm < 10 ? `0${mm}` : mm
      }:${ss < 10 ? `0${ss}` : ss} `;
      // 출력 형식 : 7.17 13:37:53  앞에서부터 월.일 시:분:초
    },
  },
};
</script>

<style></style>
