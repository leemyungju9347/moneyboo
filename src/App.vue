<template>
  <div id="app">
    <Sidebar class="sidebar"></Sidebar>
    <StatusHeader></StatusHeader>
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
};
</script>

<style>
@import './assets/css/reset.css';
@import './assets/css/common.css';
@import './assets/css/mypage.css';
@import './assets/css/setting-page.css';

.sidebar {
  width: 20%;
}
</style>
