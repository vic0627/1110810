<script setup>
import { computed, watchEffect } from "vue";
import userStore from "../stores/user";
import { storeToRefs } from "pinia";
// 全域變數
const user = userStore();
const { detailResult } = storeToRefs(user);
const table = [
  ["項次", "items"],
  ["孔洞代碼", "pipe_code"],
  ["行政區", "dis"],
  ["路名", "roadname"],
  ["緯度", "lat"],
  ["經度", "lng"],
  ["孔洞位置(M)", "AREA"],
  ["孔洞長度(M)", "length"],
  ["孔洞寬度(M)", "width"],
  ["危險程度", "DTYPE"],
  ["檢測日期", "DT_CREATE"],
  ["提送日期", "DT_RECORD"],
  ["是否已改善", "IS_IMPROVE"],
  ["破損原因", "Damaged_Reason"],
  ["改善日期", "IMPROVE_DATE"],
  ["初判權責單位", "first_manage"],
  ["維管科室", "manage"],
  ["調查報告", "File_url"],
];
const keys = table.map((val) => val[1]);
const build = computed(() =>
  table.map((val, idx) => [val[0], (val[1] = detailResult.value[keys[idx]])])
);
</script>

<template>
  <div class="detailResult" v-show="user.detailResultShow">
    <div class="detailHead">
      <p>詳細資料</p>
      <div class="close"></div>
    </div>
    <div class="detailWrap">
      <div class="detailItem" v-for="el in build" :key="el">
        <p v-if="!!el[1]">{{ el[0] }}</p>
        <p v-if="el[0] !== '調查報告'">{{ el[1] }}</p>
        <div class="download" v-else>
          <a :href="el[1]" target="_blank">查看</a>
          <a :href="el[1]" download="pdf">下載</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.detailResult {
  width: 392px;
  position: absolute;
  top: 103px;
  right: 56px;
  background: #fff;

  .detailWrap {
    .detailItem {
      display: flex;
      justify-content: center;
      p:nth-child(1) {
        text-align: right;
        width: 30%;
      }
      p:nth-child(2), .download {
        width: 70%;
      }
    }
  }
}
</style>
