<script setup>
import Nav from './components/Nav.vue';
import Map from './components/Map.vue';
import SearchBox from './components/SearchBox.vue';
import SearchResult from './components/SearchResult.vue';
import DetailResult from './components/DetailResult.vue';
import Alert from './components/Alert.vue';
import { onMounted } from 'vue';
import axios from 'axios';
import userStore from './stores/user';

const user = userStore();

onMounted(() => {
  API();
})

// 要 select 的 options 存入 pinia
const API = () => {
  axios.get("http://211.72.231.157/Kcg_Wrb_SP/api/v1/getDis")
    .then(res => user.dis = res.data.data.dis)
    .catch(error => console.log('error', error));
  axios.get("http://211.72.231.157/Kcg_Wrb_SP/api/v1/getLevel")
    .then(res => user.level = res.data.data.level)
    .catch(error => console.log('error', error));
}

</script>

<template>
  <Nav />
  <Map />
  <SearchBox />
  <SearchResult />
  <DetailResult />
  <Alert />
</template>

