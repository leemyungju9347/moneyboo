<template>
  <!-- 사이드 GNB -->
  <div class="side-gnb-form">
    <!-- 로고 -->
    <div class="logo-cont">
      <h1><a href="">머니부</a></h1>
    </div>
    <!-- GNB 메뉴 -->
    <div class="gnb-list-cont">
      <ul>
        <li
          v-for="(item, index) in gnbList"
          :class="[item.value, { active: activeIndex === index }]"
          :key="index"
          @click.prevent="setActive(item, index)"
        >
          <a href="" v-if="item.value !== 'transparent-bar'">
            <i class="gnb-icon" :class="`${item.value}-icon`"></i
            >{{ item.text }}
          </a>
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
        {
          text: '로그아웃',
          value: 'logout',
          link: '',
        },
      ],
    };
  },
  methods: {
    setActive(item, index) {
      //투명바 혹은 로그아웃 버튼은 active 애니메이션을 적용하지 않는다.
      if (item.value === 'transparent-bar' || item.value === 'logout') return;

      this.activeIndex = index; // activeIndex에 클릭된 index를 부여해준다.
      this.$router.push(item.link); // 해당 링크로 이동
    },
  },
};
</script>

<style></style>
