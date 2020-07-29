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
          <li
            v-for="(category, index) in showCategoryIcon"
            :key="showCategoryId[index]"
          >
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
          class="btn small"
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
        <button class="btn small" @click.prevent="clickAddCategory()">
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
import { saveCategory } from '@/utils/cookies.js';
import { makeID } from '@/utils/filters.js';

export default {
  data() {
    return {
      // 새로 입력한 카테고리 & 수정할 카테고리
      inputCategory: {
        name: '',
        icon: '',
        id: '',
      },
      // 불러온 카테고리명
      showCategoryName: this.$store.state.categorys.name,
      // 불러온 카테고리 아이콘명
      showCategoryIcon: this.$store.state.categorys.icon,
      // 불러온 카테고리 id
      showCategoryId: this.$store.state.categorys.id,
      // 카테고리 클릭 여부 확인용
      categoryCardClick: false,
    };
  },
  created() {
    // console.log(this.$store.state.categorys.name);
    // console.log(this.showCategoryName);
    // 페이지 로딩될 때마다 cookie에 저장된 카테고리 불러옴.
    // if (this.showCategoryName.length === 0) {
    //   getCategoryCookie();
    // }
  },
  methods: {
    clickAddCategory() {
      // cookie에 저장할 때 함께 저장할 각각의 id생성.
      this.inputCategory.id = makeID('category');

      // cookies.js에 있는 saveCategory()함수 실행.
      let newCategory = `${this.inputCategory.name}|${this.inputCategory.icon}|${this.inputCategory.id}`;
      console.log(newCategory);
      saveCategory(newCategory);
    },
    clickCategoryCard() {
      // 화면에 보이는 카테고리 클릭할 때마다 ture, false값을 줘서 [수정]버튼 활성, 비활성화 되게 해줌. + 클릭한 해당 카테고리의 배경색, 글자색 변경하기 위한 :class 주는 용도.
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
