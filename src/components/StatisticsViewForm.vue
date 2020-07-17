<template>
  <div class="statistics-view-form">
    <div class="statistics-cont">
      <div class="graph-cont">
        <div class="round-graph">
          <h3><sapn>1월</sapn> 지출 내역</h3>
          <ul>
            <li>
              <span>화장품</span>
              <b>30%</b>
            </li>
            <li>
              <span>식비</span>
              <b>30%</b>
            </li>
            <li>
              <span>공과금</span>
              <b>30%</b>
            </li>
          </ul>
        </div>
        <div class="bar-graph">
          <h3><sapn>2020년</sapn> 지출 내역</h3>
          <ul>
            <li>
              <span>1월</span>
            </li>
            <li>
              <span>1월</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="statistics-list">
        <h3><sapn>1월</sapn> 지출 내역 리스트</h3>
        <ul>
          <li>
            <b>화장품</b>
            <span>20만원</span>
          </li>
          <li>
            <b>식비</b>
            <span>10만원</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.graph-cont {
  outline: 1px solid lime;
  display: flex;
}
.graph-cont > div {
  outline: 1px solid red;
  width: 50%;
}
</style>
