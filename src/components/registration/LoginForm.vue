<template>
  <!-- 로그인 페이지 -->
  <div class="regist-form login-form">
    <div class="regist-form-cont fade">
      <h3>로그인</h3>
      <form class="form" action="" @submit.prevent="submitForm">
        <!-- 아이디 -->
        <div>
          <label for="username" v-if="!username">아이디</label>
          <input id="username" type="text" v-model="username" />
        </div>
        <!-- 비밀번호 -->
        <div>
          <label for="password" v-if="!password">비밀번호</label>
          <input
            id="password"
            type="text"
            v-model="password"
            @click.prevent=""
          />
        </div>
        <!-- 회원정보 까먹었을때 찾는 버튼 -->
        <p><a href="" class="font-jua">비밀번호 찾기</a></p>
        <button class="btn big login add-btn font-jua">로그인</button>
      </form>
      <button class="reset-btn" @click.prevent="resetBtnForm()">
        되돌아가기
      </button>
    </div>

    <a
      href=""
      class="mask mask-login fade"
      @mouseover="overLoginForm($event)"
      @click.prevent="clickSignupForm($event)"
      @mouseout="outLoginForm()"
    >
      <i class="mask-icon mask-login"></i>
      <strong class="font-jua mask-login">로그인</strong>
    </a>
  </div>
</template>
<script>
import { auth, db } from '@/api/firebase';
import { saveAuth } from '@/utils/cookies.js';

import {
  clickFormEvent,
  globalMountedInLogin,
  overFormEvent,
  resetFormEvent,
  outFormEvent,
} from '@/js/register-event.js';
export default {
  data() {
    return {
      // register
      username: '',
      password: '',
      // event
    };
  },
  mounted() {
    // 이벤트 함수를 담당하는 js 함수에 element를 넘겨줘서 쉽게 dom을 제어할 수 있도록 함.
    globalMountedInLogin(this.$el);
  },
  methods: {
    // 1. 로그인 안했을때 에러처리
    // 2. 회원 삭제되면 db 목록에도 삭제

    // 로그인 양식 제출
    submitForm() {
      // 1. async await문으로 작성
      // 2. 로그인하면 gnb 화면에 유저 정보가 바로 로드 될 수 있도록 하자..
      // 3. 만약 로그인 정보가 없을 경우의 예외처리
      // 4. 로그인하고 다음 동작
      // 5. 쿠키 순서 수정..
      auth.signInWithEmailAndPassword(this.username, this.password).then(
        function(user) {
          alert('로그인되었습니다!😊');
          console.log(user);
          // 로그인 유저의 데이터 가져오기
        },
        function(err) {
          alert(err.message);
        },
      );

      // 처음 로그인했을때 미리 document를 셋팅해줄까?

      this.$store.commit('SET_USER', this.username);

      this.username = '';
      this.password = '';

      // this.$store.commit('set_value', this.inputValue);
      console.log(auth.currentUser.uid);
      // 로그인시 현재 유저가 안바뀜...
      const usersDoc = db.collection('users').doc(auth.currentUser.uid);
      const moneybooColl = usersDoc.collection('moneyboo').doc('userInfo');

      // 로그인한 유저의 login_status를 true로 바꿔줌
      moneybooColl.update({
        login_status: true,
      });

      // db에서 유저의 이메일을 가져와 쿠키에 저장
      moneybooColl.get().then(doc => {
        // 로그인된 유저정보를 가져와서 쿠키에 저장
        saveAuth('user_email', doc.data().email);
      });
      // uid도 쿠키 값에 저장
      saveAuth('user_uid', auth.currentUser.uid);
    },
    // 클릭 이벤트
    clickSignupForm(event) {
      clickFormEvent(event.target);
    },
    // 마우스오버 이벤트
    overLoginForm(event) {
      overFormEvent(event.target);
    },
    // 리셋 버튼
    resetBtnForm() {
      resetFormEvent('login');
    },
    // 마우스 아웃 이벤트
    outLoginForm() {
      outFormEvent();
    },
  },
};
</script>
