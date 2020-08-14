<template>
  <!--회원가입 페이지  -->
  <div class="regist-form signup-form">
    <div class="regist-form-cont fade">
      <h3>회원가입</h3>
      <form class="form" action="" @submit.prevent="submitForm">
        <!-- 아이디 -->
        <div :class="{ active: useremail }">
          <label for="useremail" v-if="!useremail">이메일</label>
          <input id="useremail" type="text" v-model="useremail" />
          <!-- <button @click.prevent="emailCheck()">중복체크</button> -->
        </div>
        <!-- 닉네임 -->
        <div :class="{ active: nickname }">
          <label for="nickname" v-if="!nickname">닉네임</label>
          <input id="nickname" type="text" v-model="nickname" />
        </div>
        <!-- 비밀번호 -->
        <div :class="{ active: password }">
          <label for="password" v-if="!password">비밀번호</label>
          <input id="password" type="text" v-model="password" />
        </div>
        <strong>{{ errCode }}</strong>
        <strong>{{ errMessage }}</strong>

        <button
          :class="{ active: userCompleted }"
          class="btn big signup add-btn font-jua"
        >
          가입
        </button>
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
import {
  auth,
  signupUser,
  moneybooRef,
  userProfileUpdate,
} from '@/api/firebase';
import { dateFormat } from '@/utils/filters';

import {
  clickFormEvent,
  globalMountedInSingup,
  overFormEvent,
  resetFormEvent,
  outFormEvent,
  initRegistForm,
} from '@/js/registration.js';

export default {
  data() {
    return {
      // register
      useremail: '',
      nickname: '',
      password: '',
      errCode: '',
      errMessage: '',
    };
  },
  computed: {
    userCompleted() {
      return this.useremail && this.nickname && this.password;
    },
  },
  created() {
    // 만약에 로그인한 사용자가 해당페이지로 진입할 경우 메인페이지로 돌아가도록 설정
  },
  mounted() {
    // 이벤트 함수를 담당하는 js 함수에 element를 넘겨줘서 쉽게 dom을 제어할 수 있도록 함.
    globalMountedInSingup(this.$el);
  },
  methods: {
    // 회원가입 양식 제출
    async submitForm() {
      // 1. 만약 유저가 있을 경우? 예외처리..
      // 2. 중복체크
      // 3. 유저정보 저장 방법 다르게?
      // 4. 회원가입이 완료되고 로그인,회원가입창 리셋시키기
      // 5. 회원탈퇴? 회원 삭제하면 db에서도 사라지게 구현하자.

      // 에러처리 어떤게 있을까..

      /*
        << 로그인 기능 순서 >>
        1. 로그인/회원가입 등록함 
        2. width,display 등 css를 리셋
        3. 팝업창 기다리는 동안 로딩바가 나옴 (로딩바 뒷배경은 아무것도 없도록?? 혹은 dimmed처리??)
        4. 팝업창
      */

      // 1. 이메일 중복체크,
      // 2. 비밀번호 유효성검사
      // 3. 중복검사
      // 4. 에러처리

      try {
        // 만약 입력값이 있다면
        if (this.nickname && this.password && this.nickname) {
          const response = await signupUser(this.useremail, this.password);

          // 닉네임 등록
          userProfileUpdate(response, this.nickname);

          const userInfo = {
            createdAt: this.getDateFormat(new Date()),
            email: response.user.email,
            nickname: this.nickname,
            loginStatus: false,
          };

          // user 정보 DB에 등록
          this.userInfoSetting(response.user.uid, userInfo);

          console.log(response);
          alert('계정이 생성되었습니다! 로그인을 해주세요 🎉');

          this.resetUserInfo();
          initRegistForm();

          // 하나라도 입력값이 없다면
        } else {
          console.log('닉네임', this.nickname);
          console.log('비밀번호', this.password);
          console.log('이메일', this.useremail);
          // 둘 다 입력되지 않았을때..??
          const errTarget =
            this.nickname === ''
              ? '닉네임'
              : this.password === ''
              ? '비밀번호'
              : '이메일';

          alert(`${errTarget}이(가) 입력되지 않았습니다!`);
        }

        // 에러처리
      } catch (err) {
        // console.log(err);
        alert(err.errMessage);
        this.errCode = err.code;
        this.errMessage = err.errMessage;
      }

      //this.resetUserInfo(); // input 값 리셋
    },
    emailCheck() {
      console.log(this.useremail);
      auth.importUsers().then(user => {
        console.log(user);
      });
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
      this.resetUserInfo();
    },
    // 마우스 아웃 이벤트
    outSignupForm(event) {
      outFormEvent(event);
    },
    // input 정보 리셋 함수
    resetUserInfo() {
      this.nickname = '';
      this.useremail = '';
      this.password = '';
    },
    getDateFormat(date) {
      return dateFormat(date);
    },
    userInfoSetting(uid, userData) {
      return moneybooRef(uid)
        .doc('userInfo')
        .set(userData);
    },
  },
};
</script>
