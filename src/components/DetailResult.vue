<script setup>
import { computed } from "vue";
import userStore from "../stores/user";
import { storeToRefs } from "pinia";

// 全域變數
const user = userStore();
const { detailResult } = storeToRefs(user);

// 資料表架構
const propText = {
  items: "項次",
  pipe_code: "孔洞代碼",
  dis: "行政區",
  roadname: "路名",
  lat: "緯度",
  lng: "經度",
  AREA: "孔洞位置(M)",
  length: "孔洞長度(M)",
  width: "孔洞寬度(M)",
  DTYPE: "危險程度",
  DT_CREATE: "檢測日期",
  DT_RECORD: "提送日期",
  IS_IMPROVE: "是否已改善",
  Damaged_Reason: "破損原因",
  IMPROVE_DATE: "改善日期",
  first_manage: "初判權責單位",
  manage: "維管科室",
  File_url: "調查報告",
};

// 資料物件
const build = computed(() =>
  Object.keys(propText).map((prop) => {
    const label = propText[prop];
    const value = detailResult.value[prop];
    return {
      label,
      value,
    };
  })
);

// 圖片下載
const url = (url) => {
  if (url) return url.replace("https://www.srgeo.com.tw/", "/srgeo");
};
</script>

<template>
  <div
    class="detailResult"
    v-show="user.detailResultShow">
    <div class="detailHead">
      <p>詳細資料</p>
      <div
        class="close"
        @click="user.detailResultShow = false"></div>
    </div>
    <div class="detailWrap">
      <template v-for="el in build">
        <div
          class="detailItem"
          v-if="el.value"
          :key="el.label">
          <p>{{ el.label }}</p>
          <p v-if="el.label !== '調查報告'">{{ el.value }}</p>
          <div
            class="download"
            v-else>
            <a
              :href="el.value"
              target="_blank"
              >查看</a
            >
            <a
              :href="url(el.value)"
              download=""
              >下載</a
            >
          </div>
        </div>
      </template>
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
  box-shadow: 0px 3px 6px #00000029;

  .detailHead {
    width: 100%;
    height: 56px;
    background: #e9e9e9;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 24px;
      font-weight: 600;
      margin-left: 16px;
    }

    .close {
      width: 22.63px;
      height: 22.63px;
      margin-right: 20px;
      position: relative;
      cursor: pointer;

      &::before,
      &::after {
        content: "";
        width: 100%;
        height: 1px;
        background: #000;
        position: absolute;
        top: calc(50% - 0.5px);
        left: 0;
        transform: rotate(45deg);
      }

      &::after {
        transform: rotate(-45deg);
      }
    }
  }

  .detailWrap {
    padding: 8px 0 16px;

    .detailItem {
      display: flex;
      justify-content: center;
      width: calc(100% - 50px);
      margin: 16px auto;

      p:nth-child(1) {
        text-align: right;
        padding-right: 16px;
        width: calc(100% - 213px);
        font-size: 20px;
        color: #6a6a6a;
      }

      p:nth-child(2),
      .download {
        width: 213px;
        font-size: 20px;
      }

      .download > a {
        text-decoration: none;
        color: #3852f2;
        display: inline-block;
        cursor: pointer;

        &:nth-child(1) {
          margin-right: 16px;
        }
      }
    }
  }
}
</style>
