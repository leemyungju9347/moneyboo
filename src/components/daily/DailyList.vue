<template>
  <div class="daily-list">
    <!-- 😁 firestore 출력 결과!!! 지저분하게 출력해서 죄송합니다 진아씨ㅠㅠㅠㅠ 결과를 보여드리기 위해서...  -->
    <ul>
      <li v-for="item in listIncomeDataArr" :key="item.id">
        <strong> 수입 : {{ item }}</strong>
      </li>
    </ul>
    <ul>
      <li v-for="item in listExpendDataArr" :key="item.id">
        <strong> 지출 : {{ item }}</strong>
      </li>
    </ul>
    <!--😁 firestore 출력 결과 -->
  <div class="daily-list" :class="{ 'list-empty': listArray.length == 0 }">
    <ul class="daily-list-cont">
      <!-- {{
        listArray
      }} -->

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
          <li v-for="list in listArray" :key="list.id" v-if="list.date == date">
            <i
              class="category-icon"
              :class="convertIntoIcon(list.category)"
            ></i>
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
import { getUsersRef } from '@/api/firebase';

export default {
  created() {
    this.listArray = this.$store.state.listData;

    // 오늘 날짜를 기준으로 문서를 불러옴
    const today = new Date();
    const todayListRef = this.dailyListAddRef().doc(this.conversionDate(today));

    // firebase.firestore.DocumentSnapshot
    // todayListRef.onSnapshot(doc => {
    //   doc.data().income.forEach(element => {
    //     console.log(element);
    //     this.listIncomeDataArr.push(element);
    //   });
    // });

    // 저장된 유저의 데이터 출력문
    todayListRef.get().then(doc => {
      // 데이터가 수입
      doc.data().income.forEach(element => {
        // console.log(element);
        this.listIncomeDataArr.push(element);
      });

      // 데이터가 지출
      doc.data().expend.forEach(element => {
        this.listExpendDataArr.push(element);
      });
    });
    // 스토어의 전체 리스트를 불러온다.
    let allList = this.$store.state.listData;
    // 카테고리 할당
    this.categorys = this.$store.state.categorys;

    // 이번달 확인 후 모든 리스트에서 달이 같은 리스트를 불러온 뒤, 해당달의 내역이라면 listArray에 push해 준다.
    let Month = new Date().getMonth() + 1;
    for (let i = 0; i < allList.length; i++) {
      let checkMonth = allList[i].date.split('.');
      if (checkMonth[0] == Month) {
        this.listArray.push(allList[i]);
      }
    }
  },
  // props: ['propsdata'],
  data() {
    return {
      listArray: [],
      // listArray: [],
      listDateArray: [],
      currentUid: this.$store.state.uid, // 현재 로그인한 유저 uid
      listIncomeDataArr: [], // 수입 데이터 담아올 배열
      listExpendDataArr: [], // 지출 데이터 담아올 배열
      // 왜 새로고침을 해야 반영이 될까? ( 쿠키에 저장하기만하고 스토어에 저장 안할때)
      // categorys: this.$store.state.categorys,
      categorys: [],
      // 이번달데이터: [],
    };
  },
  methods: {
    // daily listAdd DB 레퍼런스 급하게하느라 맨위에 뒀습니다 진아씨가 필요에 따라 변형하거나 위치 옮겨주세요!
    dailyListAddRef() {
      return getUsersRef()
        .doc(this.currentUid)
        .collection('moneyboo')
        .doc('daily')
        .collection('listAdd');
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
    // date 값이 필요해서 listAdd에서 진아씨가 만든 함수 복사했습니다!!! 필요없으면 삭제해주세요 😉 - 명주 -
    conversionDate(date) {
      console.log(date);

      // 저장되는 날짜를 한국기준으로 정리해서 저장.
      let month = date.getMonth();
      let todayDate = date.getDate();

      return `${month + 1}.${todayDate}`;
      // 출력 형식 : 7.17
    },
    convertIntoIcon(category) {
      let copyCategorys = this.categorys;
      let categoryIconNum = 0;
      for (let i = 0; i < copyCategorys.name.length; i++) {
        if (copyCategorys.name[i] == category) {
          categoryIconNum = i;
        }
      }
      return copyCategorys.icon[categoryIconNum];
    },
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
