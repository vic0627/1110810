<script setup>
import { computed } from "vue";
import userStore from "../stores/user";
import { storeToRefs } from "pinia";

// 全域變數
const user = userStore();
const { detailResult } = storeToRefs(user);

// 資料表架構
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

// 取 index
const keys = table.map((val) => val[1]);

// 資料物件
const build = computed(() =>
    table.map((val, idx) => [val[0], (val[1] = detailResult.value[keys[idx]])])
);

// 圖片下載
const url = (url) => {
    if (url) return url.replace("https://www.srgeo.com.tw/", "/srgeo")
};
</script>

<template>
    <div class="detailResult" v-show="user.detailResultShow">
        <div class="detailHead">
            <p>詳細資料</p>
            <div class="close" @click="user.detailResultShow = false"></div>
        </div>
        <div class="detailWrap">
            <div class="detailItem" v-for="el in build" :key="el" v-show="!!el[1]">
                <p v-if="!!el[1]">{{ el[0] }}</p>
                <p v-if="el[0] !== '調查報告'">{{ el[1] }}</p>
                <div class="download" v-else>
                    <a :href="el[1]" target="_blank">查看</a>
                    <a :href="url(el[1])" download="">下載</a>
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
    box-shadow: 0px 3px 6px #00000029;

    .detailHead {
        width: 100%;
        height: 56px;
        background: #E9E9E9;
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
                top: calc(50% - .5px);
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

            .download>a {
                text-decoration: none;
                color: #3852F2;
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
