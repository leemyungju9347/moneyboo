<template>
  <div class="set-category">
    <!-- 수입/지출 카테고리 아이콘 수정 -->
    <div class="category-list-cont">
      <h3 class="font-jua">수입 / 지출 카테고리</h3>
      <form action="">
        <ul>
          <b class="explanation" v-if="showCategoryName == ''"
            >추가 된 카테고리가 보여지는 공간입니다.</b
          >
          <!-- script를 작성하면 li의 '관리비'등의 이름을 {{}}로 줘서 data랑 연동되도록 하면 되겠다 -->
          <li v-for="(category, index) in showCategoryIcon" :key="index">
            <label
              ><input type="radio" name="category" />
              <!-- 추후에 span 옆에 선택한 아이콘도 넣어줄 것 -->
              <div
                :class="{ click: categoryCardClick === true }"
                @click="clickCategoryCard()"
              >
                <!-- <i class="fas fa-wallet"></i> -->
                <i :class="category"></i>
                <span :class="{ click: categoryCardClick === true }">{{
                  showCategoryName[index]
                }}</span>
                <!-- <img src="../../assets/images/045-ecology.png" alt="" /> -->
              </div>
              <button
                :class="{ click: categoryCardClick === true }"
                @click.prevent="clickRemoveCategory()"
              >
                ✕
              </button>
            </label>
          </li>
        </ul>

        <button
          :class="{ click: categoryCardClick === true }"
          @click.prevent="clickCategoryEdit()"
        >
          수정
        </button>
      </form>
    </div>

    <!-- <p>***cookie에 저장되어있는 카테고리명들***</p>
    {{ saveCategory }}
    <br /><br />
    <p>***아래 input창에 새롭게 입력한 카테고리명+아이콘명***</p>
    {{ inputCategory }} -->
    <div class="category-edit-cont">
      <strong>카테고리 추가</strong>
      <b class="explanation"
        >* 추가/수정 할 카테고리명 입력 후 원하는 아이콘을 선택해 주세요</b
      >
      <form action="">
        <input
          type="text"
          placeholder="추가할 카테고리를 입력해 주세요"
          v-model="inputCategory.name"
        />

        <ul>
          <li>
            <label for="">
              <!-- <input type="radio" name="icon" /> -->
              <input
                type="radio"
                name="icon"
                value="fas fa-wallet"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-wallet"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-piggy-bank"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-piggy-bank"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-shopping-cart"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-shopping-cart"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-shopping-basket"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-shopping-basket"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-gifts"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-gifts"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-birthday-cake"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-birthday-cake"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-tshirt"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-tshirt"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-baby"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-baby"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-child"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-child"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-bicycle"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-bicycle"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-basketball-ball"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-basketball-ball"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="ffas fa-futbol"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-futbol"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-bone"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-bone"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-cat"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-cat"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-briefcase-medical"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-briefcase-medical"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-clinic-medical"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-clinic-medical"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-bus"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-bus"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-car"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-car"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-subway"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-subway"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-charging-station"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-charging-station"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-gas-pump"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-gas-pump"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-home"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-home"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-building"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-building"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-school"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-school"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-utensils"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-utensils"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-hamburger"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-hamburger"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-pizza-slice"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-pizza-slice"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-cocktail"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-cocktail"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-coffee"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-coffee"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-beer"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-beer"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-suitcase-rolling"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-suitcase-rolling"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-plane"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-plane"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-couch"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-couch"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-camera"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-camera"></i>
            </label>
          </li>
          <li>
            <label for="">
              <input
                type="radio"
                name="icon"
                value="fas fa-desktop"
                v-model="inputCategory.icon"
              />
              <i class="fas fa-desktop"></i>
            </label>
          </li>
        </ul>

        <!-- 위의 수정 버튼을 누르면 '추가'버튼이 '수정'으로 바뀌도록 할 것 -->
        <button @click.prevent="clickAddCategory()">
          추가
        </button>
        <!-- <button>수정</button> -->
      </form>
    </div>
    <!-- {{ categorys }}
    {{ showCategoryName }}
    {{ showCategoryIcon }} -->
  </div>
</template>

<script>
import { saveCategory /*getCategory*/ } from '@/utils/cookies.js';

export default {
  data() {
    return {
      // 새로 입력한 카테고리
      inputCategory: {
        name: '',
        icon: '',
      },
      // cookie에서 불러온 저장되어있던 카테코리 (개발 중 확인용- 완성하면 삭제할 것임)
      // saveCategory: '',
      // 불러온 카테고리 (이름+아이콘주소)(개발 중 확인용- 완성하면 삭제할 것임)
      // categorys: [],
      // 저장 된 카테고리 개수
      categoryNum: '',
      // 불러온 카테고리명
      showCategoryName: [],
      // 불러온 카테고리 아이콘명
      showCategoryIcon: [],
      categoryCardClick: false,
    };
  },
  created() {
    // // 카테고리 기본 셋팅(category를 수정하지 않은 처음에만 적용되게 함.)
    // if (getCategory === '') {
    //   document.cookie = `category = {관리비fas fa-wallet}{쇼핑fas fa-shopping-cart}{식비fas fa-utensils}{주유비fas fa-gas-pump}{적금fas fa-piggy-bank}`;
    // }

    // ----------- cookie에 저장 된 카테고리 목록들 불러와서 화면에 나타내줌 (해당 코드들 다른 페이지에서도 사용되니까 자주 사용되는 코드 모아놓는 페이지에 넣어놓고 불러다 쓰면 될 듯) -----------
    // *** 1. cookie에 저장 된 카테고리 목록 불러옴 ***
    let cookieCategory = this.$store.state.category;
    this.saveCategory = cookieCategory; // 이건 개발 중 화면에서 확인하기 위한 용도로 저장한 것.
    console.log(cookieCategory);

    // *** 2. 각 카테고리 별로 분할 ***
    // (cookie에서 불러온 카테고리 배열 속 카테고리들을 감싸고 있던 {}를 삭제해줌.)
    let categoryArr = cookieCategory
      .split(/{/)
      .map(ele => ele.replace(/}/g, ''));
    // (바로 위에서 splice(/{/)을 통해 나눠줬을 때, 첫 번째 {로 나눈 부분에서 그 앞에 빈배열이 생성되었음. 따라서 이 빈배열을 삭제해 줘야함.)
    categoryArr.splice('', 1);
    // (저장된 카테고리들 개수를 데이터에 저장해줌.)
    this.categoryNum = categoryArr.length;
    // 카테고리명+아이콘주소가 합쳐져있는 배열 데이터에 저장.(v-for를 돌릴 때 사용할 것)
    this.categorys = categoryArr;

    // *** 3. 카테고리명과 아이콘주소를 모은 각각의 배열 생성 ***
    for (let i = 0; i < categoryArr.length; i++) {
      this.showCategoryName.push(
        categoryArr[i].slice(0, categoryArr[i].indexOf('fas')),
      );
      this.showCategoryIcon.push(
        categoryArr[i].slice(
          categoryArr[i].indexOf('fas'),
          categoryArr[i].length,
        ),
      );
    }
  },
  methods: {
    clickAddCategory() {
      let newCategory = `${this.inputCategory.name}${this.inputCategory.icon}`;
      console.log(newCategory);
      saveCategory(newCategory);
    },
    clickCategoryCard() {
      if (this.categoryCardClick === false) {
        this.categoryCardClick = true;
      } else {
        this.categoryCardClick = false;
      }
      console.log('click', this.categoryCardClick);
    },
    clickRemoveCategory() {
      console.log('이 카테고리 삭제하자!!!');
    },
    clickCategoryEdit() {
      console.log('이 카테고리 수정하자!!!!');
    },
  },
};
</script>

<style></style>
