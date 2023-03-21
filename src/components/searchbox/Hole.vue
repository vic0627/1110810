<script setup>
import { computed } from 'vue'
import userStore from '../../stores/user';
const user = userStore();
const inputs = computed(() => [
    {
        label: '行政區',
        type: 'option',
        store: user.getDis,
        placeholder: '請選擇行政區'
    },
    {
        label: '巡查時間',
        type: 'date',
    },
    {
        label: '嚴重程度',
        type: 'option',
        store: user.getLevel,
        placeholder: '請選擇嚴重程度'
    },
])
</script>

<template>
    <div class="hole">
        <div class="inputWrap" v-for="(e, index) in inputs" :key="index">
            <label :for="e.type">{{ e.label }}</label>
            <select v-if="e.type === 'option'" :id="e.type">
                <option value="" disabled selected>{{ `請選擇${e.label}` }}</option>
                <option :value="item" v-for="item in e.store" :key="item">{{ item }}</option>
            </select>
            <input v-else :type="e.type" :id="e.type">
        </div>
        <button class="confirmSearch">查詢</button>
    </div>
</template>

<style scoped lang="scss">
.hole {
    width: 352px;
    height: 448px;
    border: 1px solid #707070;

    >button {
        width: 320px;
        height: 48px;
        background: #02318E;
        border-radius: 4px;
        border: none;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
    }
}
</style>
