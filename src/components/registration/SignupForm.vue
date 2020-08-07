<template>
  <!--회원가입 페이지  -->
  <div class="regist-form signup-form">
    <div class="regist-form-cont fade">
      <h3>회원가입</h3>
      <form class="form" action="" @submit.prevent="submitForm">
        <!-- 아이디 -->
        <div>
          <label for="username" v-if="!username">이메일</label>
          <input id="username" type="text" v-model="username" />
        </div>
        <!-- 닉네임 -->
        <div>
          <label for="nickname" v-if="!nickname">닉네임</label>
          <input id="nickname" type="text" v-model="nickname" />
        </div>
        <!-- 비밀번호 -->
        <div>
          <label for="password" v-if="!password">비밀번호</label>
          <input id="password" type="text" v-model="password" />
        </div>
        <button class="btn big signup add-btn font-jua">가입</button>
      </form>
      <button class="reset-btn" @click.prevent="resetBtnForm()">
        되돌아가기
      </button>
    </div>
    <a
      href=""
      class="mask mask-signup fade"
      @click.prevent="clickSignupForm($event)"
      @mouseover="overSignupForm($event)"
      @mouseout="outSignupForm($event)"
    >
      <i class="mask-icon mask-signup"></i>
      <strong class="font-jua mask-signup">회원가입</strong>
    </a>
  </div>
</template>
<script>
// import { auth } from '@/api/firebase';
import { auth, db } from '@/api/firebase';

import {
  clickFormEvent,
  globalMountedInSingup,
  overFormEvent,
  resetFormEvent,
  outFormEvent,
} from '@/js/register-event.js';

export default {
  data() {
    return {
      // register
      username: '',
      nickname: '',
      password: '',
      //firebase
      docInit: ['userInfo', 'daily', 'settings'],
      // for문 돌려서 신규 가입자는 doc을 미리 셋팅해놓음??
      // 혹시모르니 메인 페이지에서는 if exists 인지 확인하고 데이터를 삽입
    };
  },
  mounted() {
    // 이벤트 함수를 담당하는 js 함수에 element를 넘겨줘서 쉽게 dom을 제어할 수 있도록 함.
    globalMountedInSingup(this.$el);
  },
  methods: {
    // 회원가입 양식 제출
    submitForm() {
      // 1. 만약 유저가 있을 경우? 예외처리..
      // 2. 중복체크
      // 3. 유저정보 저장 방법 다르게?
      // 4. 회원가입이 완료되고 로그인,회원가입창 리셋시키기
      const userInfo = {
        created_date: new Date(),
        email: this.username,
        nickname: this.nickname,
        login_status: false,
      };

      // 1. 회원가입할때 settings와 daily document를 미리 만들어놓을까?
      // 2. 회원탈퇴? 회원 삭제하면 db에서도 사라지게 구현하자.
      // 3. 코드 깔끔하게 다시짜자 (nickname은 함수한에서 등록이 안됨 update시켜줄까?)

      auth.createUserWithEmailAndPassword(this.username, this.password).then(
        function(user) {
          // 회원가입시 users 하위 doc 고유 값 생성해서 moneyboo collection에 'userInfo' doc 생성한뒤 회원정보 저장
          console.log(user);
          console.log('유저의 이메일', user.user.email);

          // const userInfo = {
          //   created_date: new Date(),
          //   email: user.user.email,
          //   nickname: this.nickname,
          //   login_status: false,
          // };

          db.collection('users')
            .doc(user.user.uid)
            .collection('moneyboo')
            .doc('userInfo')
            .set(userInfo);

          alert('계정이 생성되었습니다! 로그인을 해주세요 🎉');
          // 리셋이벤트해줄것..(마지막에 하자)
        },
        function(err) {
          console.log(err);
          alert(err.message);
        },
      );
      this.resetUserInfo(); // input 값 리셋
    },
    // 회원가입 페이지 클릭 이벤트
    clickSignupForm(event) {
      clickFormEvent(event.target);
    },
    // 마우스오버 이벤트
    overSignupForm(event) {
      overFormEvent(event.target);
    },
    // 리셋 버튼
    resetBtnForm() {
      resetFormEvent('signup');
    },
    // 마우스 아웃 이벤트
    outSignupForm(event) {
      outFormEvent(event);
    },
    // input 정보 리셋 함수
    resetUserInfo() {
      this.nickname = '';
      this.username = '';
      this.password = '';
    },
  },
};
</script>
