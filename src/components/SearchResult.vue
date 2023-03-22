<script setup>
import { ref, onMounted, computed } from "vue";
import Arrow from "./Arrow.vue";
import axios from "axios";

onMounted(() => {
  api();
});
const resultObj = ref([]);
const totalPages = ref(0);
let current = ref(1);
const nums = () => {
  let arr = [];
  for (let i = 1; i <= totalPages.value; i++) {
    arr[i] = i;
  }
  return arr;
};
// 頁面選項-ERR_往前不會更新
const selectPage = computed(() => {
  let temp = nums();
  if (current.value <= 3) {
    return temp.filter((val) => val <= 5);
  } else if (current.value > totalPages.value.length - 3) {
    return temp.filter((val) => val > totalPages.value.length - 5);
  } else {
    return temp.filter((val) => val <= current.value + 2 && val >= current.value - 2);
  }
});
const currentPage = (cur) => {
  if (current.value === cur) {
    return `color: #01238e; font-weight: bold`;
  } else {
    return `color: #000000; font-weight: normal`;
  }
};
const api = () => {
  let data = new FormData();
  data.append("page", current.value);
  axios
    .post("http://211.72.231.157/Kcg_Wrb_SP/api/v1/search_SP_List", data)
    .then((res) => {
      resultObj.value = res.data.data.data;
      totalPages.value = res.data.data.total_page;
      log(totalPages.value);
    })
    .catch((error) => console.log("error", error));
};
const log = (e) => console.log(e);
const warn = (dt) => {
  if (dt === "S1" || dt === "S2") {
    return `color: #df0000;`;
  } else {
    return `color: #000000;`;
  }
};
const dtypeRebuild = (dt) => {
  let output = "";
  switch (dt) {
    case "S1":
      output = "S";
      break;
    case "S2":
      output = "S";
      break;
    case "A":
      output = "A";
      break;
    case "B":
      output = "B";
      break;
    case "C":
      output = "C";
      break;
    default:
      output = "-";
      break;
  }
  return output;
};
const changePage = (calc) => {
  switch (calc) {
    case "+":
      if (current.value !== totalPages.value) current.value++;
      break;
    case "+":
      if (current.value !== 1) current.value--;
      break;
  }
  api();
};
</script>

<template>
  <div class="searchResult">
    <div class="resHead">
      <Arrow
        :color="`white`"
        :rotate="90"
        :size="32"
        :position="`absolute`"
        :left="8"
      />
      <p>查詢結果</p>
    </div>
    <table>
      <thead>
        <tr>
          <th colspan="2"></th>
          <th>孔洞代碼</th>
          <th>嚴重程度</th>
          <th>巡查時間</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(el, i) in resultObj" :key="i" @click="log(el)">
          <td>{{ `${i + 1}.` }}</td>
          <td>{{ el.dis }}</td>
          <td>{{ el.pipe_code }}</td>
          <td :style="warn(el.DTYPE)">{{ `${dtypeRebuild(el.DTYPE)}級` }}</td>
          <td>{{ el.DT_CREATE }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pageRow">
      <Arrow
        :color="`#b5b5b5`"
        :rotate="90"
        :size="24"
        :position="`static`"
        :left="0"
        @click="changePage('-')"
      />
      <p v-for="e in selectPage" :key="e" :style="currentPage(e)">{{ e }}</p>
      <Arrow
        :color="`#b5b5b5`"
        :rotate="-90"
        :size="24"
        :position="`static`"
        :left="0"
        @click="changePage('+')"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.searchResult {
  width: 538px;
  position: absolute;
  top: 79px;
  left: 0;
  background: #f8f8f8;
  box-shadow: 3px 3px 6px #00000080;

  .resHead {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #02318e;
    position: relative;

    p {
      font-size: 24px;
      font-weight: 600;
      color: #fff;
    }
  }

  table {
    width: 474px;
    margin: 11px auto 0;
    text-align: center;

    thead {
      tr {
        line-height: 3.5;
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid #707070;
        height: 38px;
        width: 100%;
        cursor: pointer;

        td {
          line-height: 38px;
        }
      }
    }
  }

  .pageRow {
    display: flex;
    width: 150px;
    justify-content: space-between;
    align-items: center;
    margin: 20px auto 40px;
    p {
      cursor: pointer;
    }
  }
}
</style>
