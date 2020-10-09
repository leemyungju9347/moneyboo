<template>
  <div class="set-category">
    <!-- 수입/지출 카테고리 아이콘 수정 -->
    <div class="category-list-cont">
      <h3 class="font-jua">수입 / 지출 카테고리</h3>
      <form action="">
        <b class="explanation" v-if="getCategory.length !== 0"
          >( 현재 {{ getCategory.length }}개의 카테고리가 저장되어 있습니다.
          )</b
        >
        <ul>
          <b class="explanation" v-if="getCategory.length === 0"
            >추가 된 카테고리가 보여지는 공간입니다.</b
          >
          <li v-for="category in getCategory" :key="category.id">
            <label
              ><input type="radio" name="category" />
              <div
                :class="{
                  click: categoryCardClick === true,
                  disabled: editStatus === true,
                }"
                @click="clickCategoryCard(category)"
              >
                <i :class="category.icon"></i>
                <span :class="{ click: categoryCardClick === true }">{{
                  category.name
                }}</span>
              </div>
              <button
                :class="{ click: categoryCardClick === true }"
                @click.prevent="clickRemoveCategory(category)"
                :disabled="editStatus === true"
              >
                ✕
              </button>
            </label>
          </li>
        </ul>

        <button
          class="btn small"
          :class="{
            click: categoryCardClick === true,
            disabled: editStatus === true,
          }"
          @click.prevent="clickCategoryEdit(clickCategory)"
          :disabled="editStatus === true"
        >
          수정
        </button>
      </form>
    </div>

    <!-- category 이름 + 아이콘 선택 -->
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
                value="fas fa-futbol"
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
        <button
          class="btn small"
          v-if="editStatus === false"
          @click.prevent="clickAddCategory()"
        >
          추가
        </button>
        <button
          class="btn small editCancel"
          :class="{ edit: editStatus === true }"
          v-if="this.editStatus === true"
          @click.prevent="editCancelBtn()"
        >
          취소
        </button>
        <button
          class="btn small"
          :class="{ edit: editStatus === true }"
          v-if="this.editStatus === true"
          @click.prevent="clickEditCategory(clickCategory)"
        >
          수정
        </button>
        <!-- <button>수정</button> -->
      </form>
    </div>
  </div>
</template>

<script>
// import { saveCategory } from '@/utils/cookies.js';
import { makeID } from '@/utils/filters.js';
import { moneybooRef, settingColRef } from '@/api/firestore';
import firebase from 'firebase';
import bus from '@/utils/bus';
export default {
  data() {
    return {
      // 새로 입력한 카테고리 & 수정할 카테고리
      inputCategory: {
        name: '',
        icon: '',
        id: '',
      },
      // 카테고리 클릭 여부 확인용
      categoryCardClick: false,
      currentUid: this.$store.state.uid, // 현재 로그인한 유저의 uid
      // logMessage: '',
      getCategory: [],
      clickCategory: '',
      editStatus: false,
    };
  },
  created() {
    // firestore에 저장된 category DB 가져오기
    this.getFirebase();
  },
  methods: {
    // 머니부 참조값
    mbooRef() {
      return moneybooRef(this.currentUid);
    },
    settingListRef() {
      // settings document > settingList collection 참조값
      return settingColRef(this.currentUid);
    },
    clickAddCategory() {
      if (this.inputCategory.name === '') {
        let alertData = {
          show: true,
          message: '카테고리명을 입력해주세요.',
        };
        bus.$emit('sendAlertMessage', alertData);
      } else if (this.inputCategory.icon === '') {
        let alertData = {
          show: true,
          message: '아이콘을 선택해주세요.',
        };
        bus.$emit('sendAlertMessage', alertData);
      } else {
        // cookie에 저장할 때 함께 저장할 각각의 id생성.
        this.inputCategory.id = makeID('category');
        // cookies.js에 있는 saveCategory()함수 실행.
        let newCategory = `${this.inputCategory.name}|${this.inputCategory.icon}|${this.inputCategory.id}`;
        console.log(newCategory);

        // firestore에 category DB 저장
        this.settingListRef()
          .doc('categories')
          .get()
          .then(docSnapshot => {
            // 만약 document에 데이터가 없으면 초기값 셋팅
            if (!docSnapshot.exists) {
              this.settingListRef()
                .doc('categories')
                .set({ categories: [this.inputCategory] }); // 배열로 넘겨줌
              this.logMessage = '';
              // 만약 document에 데이터가 있다면 배열을 업데이트
            } else {
              this.settingListRef()
                .doc('categories')
                .update({
                  categories: firebase.firestore.FieldValue.arrayUnion(
                    this.inputCategory,
                  ),
                });

              // 저장 후 안내창 뜨게 함.
              let alertData = {
                show: true,
                message: `'${this.inputCategory.name}' 카테고리가 추가되었습니다.`,
              };
              bus.$emit('sendAlertMessage', alertData);
            }
            this.resetInputCategory();
          })
          .catch(err => {
            console.log(
              'setCategory.vue에 있는 clickAddCategory함수에서 나온 에러!!',
              err,
            );
          });
      }
    },
    // [추가]버튼 클릭 시 category 입력 창 비워줌.
    resetInputCategory() {
      this.inputCategory.name = '';
      this.inputCategory.icon = '';
      this.inputCategory.id = '';
    },
    // firestore에 저장된 category DB 가져오기 (created()에서 함수 실행)
    getFirebase() {
      this.settingListRef()
        .doc('categories')
        .onSnapshot(snapshot => {
          // console.log(snapshot.data());
          // console.log(snapshot.data().setCategory);
          // document가 존재하면
          if (snapshot.exists) {
            const categories = snapshot.data().categories;
            // setCategory 데이터가 있으면
            if (categories) {
              this.getCategory = categories;
            }
          }
        });
    },
    clickCategoryCard(category) {
      // 화면에 보이는 카테고리 클릭할 때마다 ture, false값을 줘서 [수정]버튼 활성, 비활성화 되게 해줌. + 클릭한 해당 카테고리의 배경색, 글자색 변경하기 위한 :class 주는 용도.
      if (this.categoryCardClick === false) {
        this.categoryCardClick = true;
      } else {
        this.categoryCardClick = false;
      }

      this.clickCategory = category;
    },
    clickRemoveCategory(category) {
      console.log('이 카테고리 삭제하자!!!');
      this.settingListRef()
        .doc('categories')
        .update({
          categories: firebase.firestore.FieldValue.arrayRemove(category),
        });
    },
    // 우측 상단 category박스에서 수정할 카테고리 선택 후 바로 아래 [수정] 버튼 클릭 했을 경우.
    clickCategoryEdit(category) {
      console.log('이 카테고리 수정하자!!!!');
      console.log(category);
      this.editStatus = true;
      this.inputCategory.name = category.name;
      this.inputCategory.icon = category.icon;
      this.inputCategory.id = category.id;
    },
    // 수정할 카테고리명을 고친 후, 카테고리생성박스 우측 제일 아래 [수정] 버튼을 클릭 했을 경우.
    clickEditCategory(category) {
      if (this.inputCategory.name === '') {
        let alertData = {
          show: true,
          message: '카테고리명을 입력해주세요.',
        };
        bus.$emit('sendAlertMessage', alertData);
      } else if (this.inputCategory.icon === '') {
        let alertData = {
          show: true,
          message: '아이콘을 선택해주세요.',
        };
        bus.$emit('sendAlertMessage', alertData);
      } else {
        this.settingListRef()
          .doc('categories')
          .update({
            categories: firebase.firestore.FieldValue.arrayRemove(category),
          });
        this.settingListRef()
          .doc('categories')
          .update({
            categories: firebase.firestore.FieldValue.arrayUnion(
              this.inputCategory,
            ),
          });
        this.categoryCardClick = false;
        this.editStatus = false;

        // 저장 후 안내창 뜨게 함.
        let alertData = {
          show: true,
          message: `'${category.name}' 카테고리가 '${this.inputCategory.name}' 카테고리로 수정 되었습니다.`,
        };
        bus.$emit('sendAlertMessage', alertData);

        this.resetInputCategory();
      }
    },
    // 수정 [취소] 버튼 클릭 한 경우.
    editCancelBtn() {
      this.categoryCardClick = false;
      this.editStatus = false;
      this.resetInputCategory();
    },
  },
};
</script>

<style></style>
