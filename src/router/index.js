import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/registration',
  },
  {
    path: '/registration',
    component: () => import('@/views/RegistrationPage.vue'),
  },

  {
    path: '/main',
    component: () => import('@/views/MainPage.vue'),
  },
  {
    path: '/mypage',
    component: () => import('@/views/MyPage.vue'),
  },
  {
    path: '/daily',
    component: () => import('@/views/DailyPage.vue'),
  },
  {
    path: '/statistics',
    component: () => import('@/views/StatisticsPage.vue'),
  },
  {
    path: '/sidebar',
    component: () => import('@/views/Sidebar.vue'),
  },
  {
    path: '/statusheader',
    component: () => import('@/views/StatusHeader.vue'),
  },
  {
    path: '/setting',
    component: () => import('@/views/SettingPage.vue'),
  },
  {
    path: '/month',
    component: () => import('@/views/MonthPage.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
