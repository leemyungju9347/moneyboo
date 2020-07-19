<template>
  <!--회원가입 페이지  -->
  <div class="regist-form signup-form">
    <div class="regist-form-cont">
      <h3>SIGN UP</h3>
      <form action="" @submit.prevent="submitForm">
        <!-- 아이디 -->
        <div>
          <label for="username" v-if="!username">ID</label>
          <input id="username" type="text" v-model="username" />
        </div>
        <!-- 닉네임 -->
        <div>
          <label for="nickname" v-if="!nickname">NICKNAME</label>
          <input id="nickname" type="text" v-model="nickname" />
        </div>
        <!-- 비밀번호 -->
        <div>
          <label for="password" v-if="!password">PASSWORD</label>
          <input id="password" type="text" v-model="password" />
        </div>
        <button class="add-btn font-jua">add</button>
      </form>
      <button class="reset-btn" @click.prevent="resetEvent()">
        되돌아가기
      </button>
    </div>
    <a
      href=""
      class="mask signup"
      @click.prevent="clickEvent($event)"
      @mouseover="overEvent($event)"
      @mouseout="outEvent()"
    >
      <i class="icon"></i>
      <strong class="font-jua">SIGN UP</strong>
    </a>
  </div>
</template>
<script>
import firebase from 'firebase';
export default {
  data() {
    return {
      // register
      username: '',
      nickname: '',
      password: '',
      // event
      status: true,
      outCheck: true,
    };
  },
  /*
    outCheck 변수가 true이면 마우스 아웃을 실행하고
    false일때 클릭이벤트를 실행해서 width가 줄어드는 것을 방지한다.
  */
  methods: {
    submitForm() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.username, this.password)
        .then(
          function(user) {
            console.log(user);
            alert('계정이 생성되었습니다!🎉');
          },
          function(err) {
            console.log(err);
            alert(err.message);
          },
        );
    },
    clickEvent(event) {
      //event.target === a.mask
      // this.$el
      const loginCont = document.querySelector(
        '.login-form > .regist-form-cont',
      );
      const signupCont = document.querySelector(
        '.signup-form > .regist-form-cont',
      );
      const signupForm = document.querySelector('.signup-form');
      const loginForm = document.querySelector('.login-form');
      const loginMask = document.querySelector('.login-form > .mask');
      const signupMask = document.querySelector('.signup-form > .mask');

      this.status = !this.status;
      this.outCheck = !this.outCheck;
      // console.log('위치는 클릭', this.outCheck);
      console.log(event.target);
      if (!status) {
        signupForm.style.width = `${50 + 30}%`;
        loginForm.style.width = `${50 - 30}%`;

        loginForm.classList.add('active');

        signupMask.style.display = 'none';
        signupCont.style.display = 'block';

        loginCont.style.display = 'none';
        loginMask.style.display = 'block';
      }
    },
    resetEvent() {
      const loginCont = document.querySelector(
        '.login-form > .regist-form-cont',
      );
      const signupCont = document.querySelector(
        '.signup-form > .regist-form-cont',
      );
      const signupForm = document.querySelector('.signup-form');
      const loginForm = document.querySelector('.login-form');
      const loginMask = document.querySelector('.login-form > .mask');
      const signupMask = document.querySelector('.signup-form > .mask');

      this.status = true;
      this.outCheck = true;
      // console.log('위치는 리셋', this.outCheck);

      if (this.status) {
        signupForm.style.width = `${50}%`;
        loginForm.style.width = `${50}%`;

        loginForm.classList.remove('active');
        signupForm.classList.remove('active');

        signupMask.style.display = 'block';
        signupCont.style.display = 'none';

        loginCont.style.display = 'none';
        loginMask.style.display = 'block';
      }
    },
    // 문제점 마우스 오버 이벤트, 마우스 아웃 이벤트를 했을때
    // 클릭 이벤트를 하면 width가 줄어듦..
    overEvent(event) {
      // console.log(this);
      // const signupForm = document.querySelector('.signup-form');
      const loginForm = document.querySelector('.login-form');
      const loginMask = document.querySelector('.login-form > .mask');
      // console.log(this.$el);
      // console.log('위치는 오버', this.outCheck);
      // console.log('타겟임', event.target);
      if (event.relatedTarget === loginMask) {
        console.log(event.relatedTarget);
      }
      // console.log(event.relatedTarget);
      this.$el.style.width = `${50 + 5}%`;
      loginForm.style.width = `${50 - 5}%`;
    },
    outEvent() {
      const signupForm = document.querySelector('.signup-form');
      const loginForm = document.querySelector('.login-form');

      // outCheck가 true일때만 마우스 아웃 이벤트를 실행해라.
      if (this.outCheck) {
        signupForm.style.width = `${50}%`;
        loginForm.style.width = `${50}%`;
      }
      // console.log('위치는 아웃', this.outCheck);

      // console.log(this.$el);
    },
  },
};
</script>
