<script setup>
import { ref, onMounted } from 'vue'
import L from 'leaflet';
function Map() {
    const map = L.map("myMap", {
        center: [22.6489799, 120.33173],
        zoom: 17
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    const marker = L.marker([22.6489799, 120.33173]).addTo(map);
    const latlngs2 = [
        [120.33173, 22.6489799], [120.331901, 22.6489842], [120.3321283, 22.6489391], [120.3323362, 22.6488982], [120.3325749, 22.6488598], [120.3326943, 22.64884], [120.3327238, 22.6488487], [120.3328471, 22.6489861], [120.3331771, 22.6493698], [120.3335673, 22.6498413], [120.3337148, 22.6500307], [120.3338315, 22.650173], [120.3339578, 22.6503135]
    ];
    const latlngs = [
        [120.33173, 22.6489799], [120.331901, 22.6489842], [120.3321283, 22.6489391], [120.3323362, 22.6488982], 
    ];
    latlngs2.forEach(e => {
        e.reverse();
    })
    const path = L.polyline(latlngs2, {
        color: '#ff0000',
        weight: 5,
    }).addTo(map)
}
onMounted(() => {
    Map();
})
</script>

<template>
    <div id="myMap"></div>
</template>

<style scoped>
#myMap {
    width: 100%;
    height: calc(100vh);
}
</style>
