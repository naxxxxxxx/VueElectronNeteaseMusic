<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "NetEaseMusic"
};
</script>

<style>
@import url("//at.alicdn.com/t/font_652602_6m8jxgv6346os9k9.css");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Source Sans Pro", sans-serif;
  -webkit-font-smoothing: antialiased;
  user-select: none;
}
ul,
li {
  list-style: none;
}
html,
body {
  width: 100%;
  height: 100%;
  background-color: rgb(250, 250, 250);
  color: rgb(100, 100, 100) !important;
}
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
#viewContent {
  position: absolute;
  left: 200px;
  top: 60px;
  right: 0;
  bottom: 64px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
