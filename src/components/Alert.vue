<script setup>
import userStore from '../stores/user';
// 全域變數
const user = userStore();

</script>

<template>
    <p class="alert" v-show="user.alertShow.show">
        {{ user.alertShow.title }}
    <div class="closeAlert" @click="user.alertShow.show = false"></div>
    </p>
</template>

<style scoped lang="scss">
.alert {
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 500px;
    background: rgb(252, 62, 62);
    color: #fff;
    font-size: 24px;
    padding: 16px 0 16px 20px;
    border-radius: 4px;
    box-shadow: 3px 3px 6px #00000080;

    .closeAlert {
        width: 22.63px;
        height: 22.63px;
        position: absolute;
        top: calc(50% - 11.315px);
        right: 20px;
        cursor: pointer;

        &::before,
        &::after {
            content: "";
            width: 100%;
            height: 2px;
            background: #fff;
            position: absolute;
            top: calc(50% - 1px);
            left: 0;
            transform: rotate(45deg);
        }

        &::after {
            transform: rotate(-45deg);
        }
    }
}
</style>
