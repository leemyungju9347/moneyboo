import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import bus from '@/utils/bus';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/registration',
  },
  {
    path: '/registration',
    component: () => import('@/views/RegistrationPage.vue'),
    meta: {
      requiresAuth: false,
    },
    beforeEnter: (to, from, next) => {
      store.getters.isLogin ? next('/main') : next();
    },
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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/daily',
    component: () => import('@/views/DailyPage.vue'),
    warning,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/statistics',
    component: () => import('@/views/StatisticsPage.vue'),
    meta: {
      requiresAuth: true,
    },
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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/month',
    component: () => import('@/views/MonthPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  // 사용자가 로그인하지 않았을때 접근 못하도록 조건
  if (to.meta.requiresAuth && !store.getters.isLogin) {
    from.path === '/registration' ? warning() : next('/');
    return;
  }

  setTimeout(() => {
    next();
  }, 1000);

  bus.$emit('start:spinner');
});

function warning() {
  bus.$emit('show:toast', '로그인이 필요한 메뉴입니다.', 'warning');
}

export default router;
