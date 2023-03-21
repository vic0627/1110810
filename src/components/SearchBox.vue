<script setup>
import { ref, computed } from 'vue'
import Hole from './searchbox/Hole.vue';
import Range from './searchbox/Range.vue';

let tab = ref('hole');
const hole = ref(null);
const range = ref(null);
const changeSearchType = (type) => {
    switch (type) {
        case 'hole':
            tab.value = 'hole';
            hole.value.style.background = "#02318E";
            range.value.style.background = "#b5b5b5";
            break;
        case 'range':
            tab.value = 'range';
            range.value.style.background = "#02318E";
            hole.value.style.background = "#b5b5b5";
            break;
        default:
            tab.value = 'hole';
            break;
    }
}
const componentCache = computed(() => {
    let temp = Hole;
    tab.value === 'hole' ? temp = Hole : temp = Range;
    return temp;
});
</script>

<template>
    <div class="searchBox">
        <button @click="changeSearchType('hole')" style="background: #02318E;" ref="hole">地下孔洞查詢</button>
        <button @click="changeSearchType('range')" ref="range">巡查範圍查詢</button>
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
    z-index: 3000;

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

}
</style>
