<template>
  <!-- 로그인 페이지 -->
  <div class="regist-form login-form">
    <div class="regist-form-cont fade">
      <h3>로그인</h3>
      <form class="form" action="" @submit.prevent="submitForm">
        <!-- 아이디 -->
        <div :class="{ active: useremail }">
          <label for="useremail" v-if="!useremail">아이디</label>
          <input id="useremail" type="text" v-model="useremail" />
        </div>
        <!-- 비밀번호 -->
        <div :class="{ active: password }">
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
        <button
          class="btn big login add-btn font-jua"
          :class="{ active: userCompleted }"
        >
          로그인
        </button>
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
import {
  clickFormEvent,
  globalMountedInLogin,
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
      password: '',
      // event
    };
  },
  created() {},
  mounted() {
    // 이벤트 함수를 담당하는 js 함수에 element를 넘겨줘서 쉽게 dom을 제어할 수 있도록 함.
    globalMountedInLogin(this.$el);
  },
  computed: {
    userCompleted() {
      return this.useremail && this.password;
    },
  },
  methods: {
    // 1. 로그인 안했을때 에러처리
    // 2. 회원 삭제되면 db 목록에도 삭제

    // 로그인 양식 제출
    async submitForm() {
      // 1. async await문으로 작성 (완)
      // 2. 로그인하면 gnb 화면에 유저 정보가 바로 로드 될 수 있도록 하자.. (완)
      // 3. 만약 로그인 정보가 없을 경우의 예외처리
      // 4. 로그인하고 다음 동작
      // 5. 쿠키 순서 수정..(완)

      const userData = {
        email: this.useremail,
        password: this.password,
      };

      try {
        const response = await this.$store.dispatch('FATCH_LOGIN', userData);
        console.log(response);
        alert('로그인되었습니다!😊');
        this.initForm();
        initRegistForm();
      } catch (err) {
        console.log('로그인폼 에러다!!!', err);
      }

      // const usersDoc = db.collection('users').doc(auth.currentUser.uid);
      // const moneybooColl = usersDoc.collection('moneyboo').doc('userInfo');

      // 로그인한 유저의 login_status를 true로 바꿔줌
      // moneybooColl.update({
      //   login_status: true,
      // });
    },
    // 클릭 이벤트
    clickSignupForm(event) {
      clickFormEvent(event.target);
    },
    initForm() {
      this.useremail = '';
      this.password = '';
    },
    // 마우스오버 이벤트
    overLoginForm(event) {
      overFormEvent(event.target);
    },
    // 리셋 버튼
    resetBtnForm() {
      resetFormEvent('login');
      this.initForm();
    },
    // 마우스 아웃 이벤트
    outLoginForm() {
      outFormEvent();
    },
  },
};
</script>
