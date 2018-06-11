<template>
    <div id="notSigned">
        <div class="panel">
            <img :src="img" alt="未登录">
            <p>关注喜欢的明星、好友、看Ta们在听什么<br>通过他们的动态发现更多精彩音乐</p>
            <button @click="login">立即登录</button>
        </div>
    </div>
</template>

<script>
const { ipcRenderer: ipc } = require("electron");

export default {
  name: "NotSigned",
  data() {
    return {
      img: require("../../../assets/map.jpg")
    };
  },
  methods: {
    login() {
      ipc.send("login");
    }
  }
};
</script>
<style scoped>
#notSigned {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
#notSigned .panel {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  transform: translate(-50%, -50%);
}
#notSigned .panel img,
#notSigned .panel p,
#notSigned .panel button {
  display: block;
  margin: 0 auto;
}
#notSigned .panel img {
  width: 100%;
  max-width: 600px;
}
#notSigned .panel p {
  font-size: 16px;
  color: #333;
  text-align: center;
  line-height: 1.6;
  margin: 20px 0;
}
#notSigned .panel button {
  border: 1px solid rgb(56, 122, 216);
  outline: none;
  width: 160px;
  height: 36px;
  border-radius: 4px;
  background-color: rgb(70, 149, 226);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}
</style>
