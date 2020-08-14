<template>
  <!-- 사이드 GNB -->
  <div class="side-gnb-form">
    <!-- 로고 -->
    <div class="logo-cont">
      <h1>
        <router-link :to="logoLink" class="logo"
          ><img src="../../assets/images/moneyboo_logo.png" alt=""
        /></router-link>
      </h1>
    </div>
    <!-- username -->
    <a href="" class="username-cont"
      ><strong><i class="user-icon"></i>{{ useremail }}</strong></a
    >

    <!-- GNB 메뉴 -->
    <div class="gnb-list-cont">
      <ul>
        <li
          v-for="(item, index) in gnbList"
          :class="[item.value, { active: item.link === currentRouter }]"
          :key="index"
          @click.prevent="setActive(item)"
        >
          <a href="" v-if="item.value !== 'transparent-bar'">
            <i class="gnb-icon" :class="`${item.value}-icon`"></i
            >{{ item.text }}
          </a>
        </li>
        <!-- 로그아웃 버튼 -->
        <li class="logout" v-if="isUserLogin" @click.prevent="logoutUser()">
          <a href=""><i class="gnb-icon logout-icon"></i>로그아웃</a>
        </li>
      </ul>
    </div>
    <!-- 날씨와 날짜정보 -->
    <div class="calender-cont">
      <i></i>
      <span class="desc">날씨아이콘 / 날씨 정보</span>
      <strong class="date">10</strong>
      <span class="day">Friday</span>
      <span class="month">July, 2020</span>
    </div>
  </div>
</template>

<script>
import { deleteCookie } from '@/utils/cookies';

export default {
  data() {
    return {
      //첫 로드시에는 active가 되어있지 않도록 일단 설정
      activeIndex: undefined,
      gnbList: [
        {
          text: '메인',
          value: 'main',
          link: '/main',
        },
        {
          text: '데일리',
          value: 'daily',
          link: '/daily',
        },
        {
          text: '통계',
          value: 'statistics',
          link: '/statistics',
        },
        {
          text: '관리',
          value: 'settings',
          link: '/setting',
        },
        {
          value: 'transparent-bar',
        },
        {
          text: '마이페이지',
          value: 'mypage',
          link: '/mypage',
        },
        // {
        //   text: '로그아웃',
        //   value: 'logout',
        //   link: '',
        // },
      ],
      currentPath: '',
    };
  },
  created() {},
  computed: {
    // 로그인이 되었을 경우에 (= ture) 로그아웃표시, 로그아웃 되면 로그인표시
    // 방법 연구
    // 1. 배열에서 빼서 로그인 로그아웃만 따로 관리
    // 2. 객체안에서 comnuted로 조건을 줘서 관리
    // 객체에서 삼항연산자로 조건을 줘서 적용이 안됨
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
    useremail() {
      return this.isUserLogin ? this.$store.state.email : '로그인을 해주세요.';
    },
    logoLink() {
      return this.$store.getters.isLogin ? '/main' : '/registration';
    },
    currentRouter() {
      return this.$store.state.currentRouter;
    },
  },
  methods: {
    setActive(item) {
      //투명바 혹은 로그아웃 버튼은 active 애니메이션을 적용하지 않는다.
      if (item.value === 'transparent-bar') return;

      this.$router.push(item.link).catch(err => {
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (
          err.name !== 'NavigationDuplicated' &&
          !err.message.includes(
            'Avoided redundant navigation to current location',
          )
        ) {
          // But print any other errors to the console
          console.log(err);
        }
      });
    },
    logoutUser() {
      this.$store.commit('CLEAR_USER');
      this.$store.commit('CLEAR_UID');

      deleteCookie('user_email');
      deleteCookie('user_uid');

      this.$router.push('/registration').catch(err => {
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (
          err.name == 'NavigationDuplicated' &&
          err.message.includes(
            'Avoided redundant navigation to current location',
          )
        ) {
          // But print any other errors to the console
          console.log(err);
        }
      });
    },
  },
};
</script>

<style></style>
