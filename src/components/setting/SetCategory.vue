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
              <!-- 추후에 span 옆에 선택한 아이콘도 넣어줄 것 -->
              <div
                :class="{ click: categoryCardClick === true }"
                @click="clickCategoryCard()"
              >
                <i :class="category.icon"></i>
                <span :class="{ click: categoryCardClick === true }">{{
                  category.name
                }}</span>
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
          @click="clickCategoryEdit()"
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
        <button class="btn small" @click.prevent="clickAddCategory()">
          추가
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

export default {
  data() {
    return {
      // 새로 입력한 카테고리 & 수정할 카테고리
      inputCategory: {
        name: '',
        icon: '',
        id: '',
      },
      // // cookie에 저장 된 category 개수
      // categoryNum: '',
      // // 불러온 카테고리명
      // showCategoryName: this.$store.state.categorys.name,
      // // 불러온 카테고리 아이콘명
      // showCategoryIcon: this.$store.state.categorys.icon,
      // // 불러온 카테고리 id
      // showCategoryId: this.$store.state.categorys.id,
      // 카테고리 클릭 여부 확인용
      categoryCardClick: false,
      currentUid: this.$store.state.uid, // 현재 로그인한 유저의 uid
      // logMessage: '',
      getCategory: [],
    };
  },
  created() {
    this.categoryNum = this.$store.state.categorys.name.length;

    // firestore에 저장된 category DB 가져오기

    this.settingListRef()
      .doc('categories')
      .get()
      .then(docSnapshot => {
        // document가 존재하면
        if (docSnapshot.exists) {
          const categories = docSnapshot.data().categories;

          // setCategory 데이터가 있으면
          if (categories) {
            categories.forEach(data => {
              this.getCategory.push(data);
            });

            // setCategory 데이터가 없으면
          } else {
            this.logMessage = '카테고리 값을 입력해주세요!';
          }

          // document가 없으면
        } else {
          this.logMessage = '셋팅 값을 입력해주세요!';
        }
      })
      .catch(err => {
        console.log('에러 발생한 위치 setCategory.vue created부분', err);
      });

    this.getFirebase();
  },
  methods: {
    // 머니부 참조값
    mbooRef() {
      return moneybooRef(this.currentUid);
    },
    settingListRef() {
      return this.mbooRef()
        .doc('settings')
        .collection('settingList');
    },
    clickAddCategory() {
      // cookie에 저장할 때 함께 저장할 각각의 id생성.
      this.inputCategory.id = makeID('category');
      // cookies.js에 있는 saveCategory()함수 실행.
      let newCategory = `${this.inputCategory.name}|${this.inputCategory.icon}|${this.inputCategory.id}`;
      console.log(newCategory);

      // console.log('newCategory', newCategory);
      // // firestore에 category DB 저장
      // this.mbooRef()
      //   .doc('settings')
      //   .get()
      //   .then(docSnapshot => {
      //     // 만약 document에 데이터가 없으면 초기값 셋팅
      //     if (!docSnapshot.exists) {
      //       this.mbooRef()
      //         .doc('settings')
      //         .set({ setCategory: [this.inputCategory] }); // 배열로 넘겨줌
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


      //       this.logMessage = '';

      //       // 만약 document에 데이터가 있다면 배열을 업데이트
      //     } else {
      //       this.mbooRef()
      //         .doc('settings')
      //         .update({
      //           setCategory: firebase.firestore.FieldValue.arrayUnion(
      //             this.inputCategory,
      //           ),
      //         });
      //     }

      //     //this.resetInputCategory(); // category input창 리셋.
      //   });
      // saveCategory(newCategory); // cookie에 category 저장.

      // --------0826 setting 구조 바꿈 (확인하시고 삭제부탁드립니다!) 😀
      // categories doc에 저장
      this.settingListRef()
        .doc('categories')
        .get()
        .then(doc => {
          console.log(doc);
          // categories doc이 있으면? => update
          if (doc.exists) {
            // 만약 document에 데이터가 있다면 배열을 업데이트
          } else {

            this.settingListRef()
              .doc('categories')
              .update({
                categories: firebase.firestore.FieldValue.arrayUnion(
                  this.inputCategory,
                ),
              });
            // categories doc이 없으면? => set
          } else {
            this.settingListRef()
              .doc('categories')
              .set({
                categories: [this.inputCategory],
              });
          }

          this.resetInputCategory();
        })
        .catch(err => {
          console.log(
            'setCategory.vue에 있는 clickAddCategory함수에서 나온 에러!!',
            err,
          );
        });
    },
    // [추가]버튼 클릭 시 category 입력 창 비워줌.
    resetInputCategory() {
      this.inputCategory.name = '';
      this.inputCategory.icon = '';
      this.inputCategory.id = '';
    },
    mbooRef() {
      return moneybooRef(this.currentUid);
    },
    // --------0826 setting 구조 바꿈 (확인하시고 삭제부탁드립니다!) 😀
    // settings document > settingList collection 참조값
    settingListRef() {
      return settingColRef(this.currentUid);
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
      // 클릭한 카테고리의 id를 구해서 이 함수로 보내줄 수 있으면 편할 것 같은데...!
      console.log(this.getCategory);
    },
    clickCategoryEdit() {
      console.log('이 카테고리 수정하자!!!!');
    },
  },
};
</script>

<style></style>
