<script setup>
import { onMounted } from 'vue'
import { mapInit } from '../js/map';
onMounted(() => {
    mapInit();
})
</script>

<template>
    <div id="myMap"></div>
</template>

<style scoped>
#myMap {
    width: 100%;
    height: calc(100vh);
    z-index: 0;
}
</style>
