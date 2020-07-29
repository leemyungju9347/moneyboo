<template>
  <div id="app">
    <Sidebar class="sidebar"></Sidebar>
    <StatusHeader v-if="isHeader()"></StatusHeader>
    <router-view class="router-area"></router-view>
  </div>
</template>

<script>
import Sidebar from '@/views/Sidebar.vue';
import StatusHeader from '@/views/StatusHeader.vue';

export default {
  components: {
    Sidebar,
    StatusHeader,
  },
  methods: {
    isHeader() {
      // let routerArr = this.$router.options.routes.map(a => a.path);
      // 현재 내 라우터 path 위치를 변수 삽입
      const currentRouter = this.$router.currentRoute.path;
      // const headerList = ['/daily', '/statistics', '/main'];

      // 조건 현재 라우터 위치가 '데일리','통계','메인' 일때만 true를 출력하도록 변수 생성
      const haveHeader =
        currentRouter === '/daily' ||
        currentRouter === '/statistics' ||
        currentRouter === '/main';

      //조건이 맞을 경우 true or false 출력해서 statusHeader 존재 여부를 파악한다.
      return haveHeader ? true : false;
    },
  },
};
</script>

<style>
@import './assets/css/reset.css';
@import './assets/css/common.css';
@import './assets/css/mypage.css';
@import './assets/css/setting-page.css';
@import './assets/css/main-page.css';
@import './assets/css/statistics-page.css';
@import './assets/css/registration.css';
@import './assets/css/daily-page.css';
</style>
