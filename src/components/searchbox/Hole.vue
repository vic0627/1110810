<script setup>
import { computed } from 'vue';
import userStore from '../../stores/user';

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
    {
        label: '嚴重程度',
        type: 'option',
        store: user.getLevel,
        value: 'dtype',
        limit: user.getLevel.length
    },
]);

// 送出查詢
const confirmSearch = () => {
    user.holeSearch();
    user.searchBoxShow = false;
    user.searchResultShow = true;
}
</script>

<template>
    <div class="hole">
        <div class="inputWrap" v-for="(e, index) in inputs" :key="index">
            <label :for="e.type">{{ e.label }}</label>
            <el-select v-if="e.type === 'option'" v-model="user.holeSearchValue[e.value]" multiple filterable allow-create
                :multiple-limit="e.limit" :placeholder="`請選擇${e.label}`" size="large" style="width: 100%;">
                <el-option v-for="item in e.store" :value="item.value" :label="item.label" :key="item.label" />
            </el-select>
            <el-date-picker v-else v-model="user.holeSearchValue.date" type="daterange" start-placeholder="請選擇日期區間"
                size="large" format="YYYY/MM/DD" value-format="YYYY-MM-DD" style="width: 300px;" />
        </div>
        <button class="confirmSearch" @click="confirmSearch">查詢</button>
    </div>
</template>

<style scoped lang="scss">
.hole {
    box-sizing: border-box;
    width: 352px;
    height: 448px;
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
