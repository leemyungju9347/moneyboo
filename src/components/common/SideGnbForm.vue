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
    <div class="username-cont" :class="setUserClassName">
      <a href="" @click.prevent="goMypage()">
        <i class="fas" :class="`fa-user-${userIcon}`"></i>
        <span>{{ usernNickname }}</span>
      </a>
      <div v-if="email" class="tooltip">
        <p>{{ email }}</p>
      </div>
    </div>
    <!-- GNB 메뉴 -->
    <div class="gnb-list-cont">
      <ul>
        <li
          v-for="(item, index) in gnbList"
          :class="[item.value, { active: item.link === currentRouter }]"
          :key="index"
          @click.prevent="setRouterPath(item)"
        >
          <a href="" v-if="item.value !== 'transparent-bar'">
            <i class="gnb-icon" :class="`${item.value}-icon`"></i
            >{{ item.text }}
          </a>
        </li>
        <!-- 로그아웃 버튼 -->
        <li class="logout" v-if="isLogin" @click.prevent="logoutUser()">
          <a href=""><i class="gnb-icon logout-icon"></i>로그아웃</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { deleteCookie } from '@/utils/cookies';
import { auth } from '@/api/fireAuth';
import bus from '@/utils/bus';
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
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
      ],
    };
  },
  computed: {
    ...mapState(['email', 'nickname', 'currentRouter']),
    ...mapGetters(['isLogin']),
    usernNickname() {
      return this.isLogin ? this.nickname : '로그인을 해주세요.';
    },
    userIcon() {
      return this.isLogin ? 'cog' : 'lock';
    },
    logoLink() {
      return this.isLogin ? '/main' : '/registration';
    },
    setUserClassName() {
      return this.isLogin ? 'on' : '';
    },
  },
  methods: {
    ...mapMutations(['CLEAR_USER']),
    // Gnb메뉴 클릭시 라우터 이동
    setRouterPath(item) {
      // 투명바는 active 애니메이션을 적용하지 않는다.
      if (item.value === 'transparent-bar') return;

      if (this.$router.currentRoute.path !== item.link) {
        this.$router.push(item.link);

        // 라우터 위치가 현재 위치랑 같으면 리턴 처리
      } else return;
    },
    // 로그아웃
    logoutUser() {
      // 로딩 시작
      bus.$emit('start:spinner');
      // 현재 라우터 위치가 회원가입 페이지가 아닐 경우에 로그아웃 시도
      if (this.$router.currentRoute.path !== '/registration') {
        setTimeout(() => {
          // 스토어에 저장된 유저정보 삭제
          this.CLEAR_USER();

          // 쿠키에 저장된 유저정보 삭제
          this.deleteCookies();

          // 첫 로드됐을때 페이지로 이동
          this.$router.push('/').catch(err => {
            console.log('로그아웃 푸시에러', err);
          });
        }, 1000);

        // 만약에 회원가입 페이지일 경우 오류가 발생하기 때문에 리턴처리
      } else return;

      this.firebaseLogout();
    },
    deleteCookies() {
      deleteCookie('user_email');
      deleteCookie('user_uid');
      deleteCookie('user_nickname');
    },
    // 파이어베이스 로그아웃
    firebaseLogout() {
      const currentUser = auth.currentUser;

      if (currentUser) {
        auth
          .signOut()
          .then(user => {
            console.log('로그아웃시도', user);
          })
          .catch(err => {
            console.log('로그아웃 에러', err);
          });
      } else return;
    },
    // 유저 아이디 클릭시 마이페이지로 이동하도록 하는 함수
    goMypage() {
      // 로그인 했을때만 마이페이지로 이동
      if (this.isLogin) {
        // 현재 위치가 마이페이지가 아니면 라우터 이동
        if (this.$router.currentRoute.path !== '/mypage') {
          this.$router.push('/mypage');

          // 마이페이지에서 마이페이지로 라우터 이동시 오류 발생하기 때문에 리턴 처리
        } else return;

        // 로그인 요청 알림
      } else {
        bus.$emit('show:toast', '로그인이 필요한 기능입니다.', 'warning');
      }
    },
  },
};
</script>

<style></style>
