<script setup>
import { computed, ref } from 'vue'
import userStore from '../../stores/user';
import axios from 'axios';
import { mapPath } from '../js/map';

// 全域變數
const user = userStore();

// 表單建立
const inputs = computed(() => [
    {
        label: '行政區',
        type: 'option',
        store: user.getDis,
        value: 'dis',
        limit: 1
    },
    {
        label: '巡查時間',
        type: 'date',
        store: [],
        value: 'date',
    },
])

// v-model
const value = ref({ dis: [], date: null })

// 查詢功能
const confirmSearch = () => {

    // 未選擇條件
    const unChoose = value.value.dis.length === 0 && value.value.date === null;

    // 只選 dis or date
    const notN = value.value.date === null;

    // 建立 body
    const body = () => {
        if (unChoose) return {};
        if (notN) {
            return {
                dis: value.value.dis,
            }
        } else {
            return {
                dis: value.value.dis,
                dts: value.value.date[0],
                dte: value.value.date[1],
            }
        }
    };

    // axios
    axios.post("http://211.72.231.157/Kcg_Wrb_SP/api/v1/search_TRACE_List", body())
        .then(res => {
            let exist = [];
            res.data.data.count === 0 ? console.log("找不到資料") : exist = res.data.data.data;
            return exist;
        })
        .then(pol => mapPath(pol.map(e => polTolatlngs(e.pol))))
        .catch(error => console.log('error', error));
}

// 軌跡資料格式轉換
const polTolatlngs = (str) => str.slice(12, -1).split(', ').map(e => e.split(' ').reverse());

</script>

<template>
    <div class="range">
        <div class="inputWrap" v-for="(e, index) in inputs" :key="index">
            <label :for="e.type">{{ e.label }}</label>
            <el-select v-if="e.type === 'option'" v-model="value[e.value]" multiple filterable allow-create
                :multiple-limit="e.limit" :placeholder="`請選擇${e.label}`" size="large" style="width: 100%;">
                <el-option v-for="item in e.store" :value="item.value" :label="item.label" :key="item.label" />
            </el-select>
            <el-date-picker v-else v-model="value.date" type="daterange" start-placeholder="請選擇日期區間" size="large"
                format="YYYY/MM/DD" value-format="YYYY-MM-DD" style="width: 300px;" />
        </div>
        <button class="confirmSearch" @click="confirmSearch">查詢</button>
    </div>
</template>

<style scoped lang="scss">
.range {
    box-sizing: border-box;
    width: 352px;
    height: 352px;
    border: 1px solid #707070;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    >button {
        width: 320px;
        height: 48px;
        background: #02318E;
        border-radius: 4px;
        border: none;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        display: block;
        margin: 0 auto 32px;
    }

    .inputWrap {
        width: 320px;
        margin: 0 auto;

        label {
            height: 24px;
            line-height: 1.1;
            font-size: 24px;
            font-weight: bold;
            border-left: 4px solid #02318E;
            padding-left: 4px;
            margin-bottom: 12px;
            display: block;
        }
    }
}
</style>
