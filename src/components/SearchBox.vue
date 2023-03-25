<script setup>
import { ref, computed } from "vue";
import Hole from "./searchbox/Hole.vue";
import Range from "./searchbox/Range.vue";
import userStore from "../stores/user";
import { init } from "./js/map";

// 全域變數
const user = userStore();

// 動態組件
let tab = ref("hole");

// 切換查詢方式
const changeSearchType = (type) => {
  init();
  tab.value = type;
};

// 動態組件切換
const componentCache = computed(() => {
  let temp = Hole;
  tab.value === "hole" ? (temp = Hole) : (temp = Range);
  return temp;
});

// className 控制
const btnActive = (type = "hole") => {
  return type === tab.value ? "btn-active" : null;
};
</script>

<template>
  <div
    class="searchBox"
    v-show="user.searchBoxShow">
    <button
      @click="changeSearchType('hole')"
      :class="btnActive('hole')">
      地下孔洞查詢
    </button>
    <button
      @click="changeSearchType('range')"
      :class="btnActive('range')">
      巡查範圍查詢
    </button>
    <div class="searchForm">
      <keep-alive>
        <component :is="componentCache" />
      </keep-alive>
    </div>
  </div>
</template>

<style scoped lang="scss">
.searchBox {
  width: 416px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 16px 0 24px;
  position: absolute;
  top: 79px;
  left: 0;
  background: #f8f8f8;
  box-shadow: 3px 3px 6px #00000080;

  button {
    width: 176px;
    height: 49px;
    color: #fff;
    font-size: 24px;
    border-radius: 4px 4px 0px 0px;
    border: none;
    background: #b5b5b5;
    cursor: pointer;
  }
  .btn-active {
    background: #02318e;
  }
}
</style>
