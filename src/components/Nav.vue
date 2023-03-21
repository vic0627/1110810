<script setup>
import logo from "/images/header-logo.svg"

</script>

<template>
    <header>
        <div class="logo">
            <img :src="logo" alt="logo">
        </div>
        <h1>地下孔洞檢測系統</h1>
    </header>
</template>

<style scoped lang="scss">
header{
    width: 100%;
    display: flex;
    align-items: center;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3000;
    .logo{
        margin: 4px 16px 4px 10px;
    }
    h1{
        font-size: 40px;
        height: 53px;
        line-height: 53px;
        font-weight: bold;
        margin: 13px 0;
    }
}
</style>
