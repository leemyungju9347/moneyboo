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
    meta: {
      requiresAuth: true,
    },
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
  // 존재하지 않는 모든 경로는 로그인 페이지로 리다이렉션
  // 사용자인증이 됐을 경우에는 main 페이지로 로드되도록 설정
  {
    path: '*',
    redirect: '/registration',
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
