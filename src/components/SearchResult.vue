<script setup>
import { onUpdated, computed } from "vue";
import Arrow from "./Arrow.vue";
import userStore from '../stores/user';
import { storeToRefs } from "pinia";
import { flyTo } from './js/map'

// DOM 陣列選取
const $all = (e) => document.querySelectorAll(e);

// 全域變數
const user = userStore();

// 取查詢結果
const { holeSearchValue } = storeToRefs(user)

// 無資料時自動返回
onUpdated(() => {
    if (!user.resultObj) { returnSearchBox() } else {
        user.searchBoxShow = false;
        user.searchResultShow = true;
    };
})

// 頁面總數轉陣列
const nums = () => {
    let arr = [];
    for (let i = 1; i <= user.totalPages; i++) {
        arr[i] = i;
    }
    return arr;
};

// 頁面選項
const selectPage = computed(() => {
    let temp = nums();
    if (holeSearchValue.value.page <= 3) {
        return temp.filter((val) => val <= 5);
    } else if (holeSearchValue.value.page > nums().length - 3) {
        return temp.filter((val) => val >= nums().length - 5);
    } else {
        return temp.filter((val) => val <= holeSearchValue.value.page + 2 && val >= holeSearchValue.value.page - 2);
    }
});

// 當前頁面_樣式
const currentPage = (cur) => {
    if (holeSearchValue.value.page === cur) {
        return `color: #01238e; font-weight: bold`;
    } else {
        return `color: #000000; font-weight: normal`;
    }
};

// 破壞程度_樣式
const warn = (dt) => {
    if (dt === "S1" || dt === "S2") {
        return `color: #df0000;`;
    } else {
        return `color: #000000;`;
    }
};

// 破壞程度_資料重構
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

// 頁面選擇函式_事件代理
const changePage = (e) => {
    const target = e.target;

    // 數字區
    const text = target.innerText;

    // 上一頁 & 下一頁
    const type = target.dataset.type;

    // target 是否為當前頁面
    let notCurrent = false;

    // 是數字區
    if (text) {
        const targetNum = +text;
        const count = target.dataset.count;
        if (!count) return; // data 屬性不存在時返回
        const isNum = +$all('.pages')[count].innerText;
        const isPage = targetNum === isNum;
        notCurrent = holeSearchValue.value.page === targetNum; // target 是當前頁面
        if (isPage) holeSearchValue.value.page = targetNum;
    }
    // 是 上一頁 & 下一頁
    else if (type) {
        switch (type) {
            case "+":
                if (holeSearchValue.value.page !== user.totalPages) holeSearchValue.value.page++;
                break;
            case "-":
                if (holeSearchValue.value.page !== 1) holeSearchValue.value.page--;
                break;
        }
    }

    // target 不是當前頁面就打 api
    if (!notCurrent) user.holeSearch();
};

// 返回 SearchBox
const returnSearchBox = () => {
    user.resultObj = undefined;
    user.searchBoxShow = true;
    user.searchResultShow = false;
    holeSearchValue.value.page = 1;
}

// 點選細項
const detailOnClick = (e) => {
    user.details.ID = e.ID;
    user.details.DTYPE = e.DTYPE;
    user.detailSearch();
    flyTo([e.LAT, e.LNG])
};
</script>

<template>
    <div class="searchResult" v-show="user.searchResultShow">
        <div class="resHead">
            <Arrow :color="`white`" :rotate="90" :size="32" :position="`absolute`" :left="8" @click="returnSearchBox" />
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
                <tr v-for="(el, i) in user.resultObj" :key="i" @click="detailOnClick(el)">
                    <td>{{ `${i + 1 + ((holeSearchValue.page - 1) * 15)}.` }}</td>
                    <td>{{ el.dis }}</td>
                    <td>{{ el.pipe_code }}</td>
                    <td :style="warn(el.DTYPE)">{{ `${dtypeRebuild(el.DTYPE)}級` }}</td>
                    <td>{{ el.DT_CREATE }}</td>
                </tr>
            </tbody>
        </table>
        <div class="pageRow" @click="changePage" v-if="user.totalPages > 1">
            <Arrow :color="`#b5b5b5`" :rotate="90" :size="24" :position="`static`" :left="0" :type="`-`" />
            <p v-for="(e, i) in selectPage" :key="i" :style="currentPage(e)" class="pages" :data-count="i">{{ e }}</p>
            <Arrow :color="`#b5b5b5`" :rotate="-90" :size="24" :position="`static`" :left="0" :type="`+`" />
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
        margin: 11px auto 20px;
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
        margin: 0 auto 40px;

        p {
            cursor: pointer;
        }
    }
}
</style>
