<template>
  <div class="daily-list">
    <ul class="daily-list-cont">
      <li class="daily-list-day">
        <strong class="font-uto">6.25 금요일</strong>
        <em class="daily-list-income"
          >수입 : <b class="list-income">20,000원</b></em
        >
        <em class="daily-list-expend"
          >지출 : <b class="list-expend">35,000원</b></em
        >
        <ul>
          <li>
            <i> 식비 </i>
            <span class="font-uto"> 농협 </span>
            <b
              ><a href="#/daily" title="수정하기" class="list-income"
                >+ 20,000원</a
              ></b
            >
            <!-- <b class="list-expend">
              <a href="#/daily" title="수정하기" class="list-expend"></a>
              - 0 원
            </b> -->
            <button class="btn list-delete">
              <i class="fas fa-times"></i>
            </button>
          </li>
          <li>
            <i> 교통비 </i>
            <span> 카카오뱅크 </span>
            <!-- <b
              ><a href="#/daily" title="수정하기" class="list-income"
                >+ 0 원</a
              ></b
            > -->
            <b class="list-expend">
              <a href="#/daily" title="수정하기" class="list-expend"
                >- 35,000 원</a
              >
            </b>
            <button class="btn list-delete">
              <i class="fas fa-times"></i>
            </button>
          </li>
          {{
            listHistory
          }}
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    listHistory() {
      return this.$store.state.listData;
    },
  },
};
</script>

<style></style>
