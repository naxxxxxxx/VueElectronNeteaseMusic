<template>
  <div id="headBar" @dblclick="zoom">

    <div class="btnController">
      <Titlebtn type="max" />
      <Titlebtn type="min" />
      <Titlebtn type="close" />
    </div>

    <div class="logo">
      <router-link to="/" tag="div"><span class="iconfont icon-CN_NetEasemusic"></span>网易云音乐</router-link>
    </div>

    <div class="pathControl">
      <label class="iconfont icon-back" v-on:click="back"></label>
      <label class="iconfont icon-more" v-on:click="forward"></label>
    </div>

    <div class="searchBar">
      <label class="iconfont icon-search"></label>
      <input type="text" placeholder="搜索音乐，歌手，歌词，用户">
    </div>
    <div class="userController">
      <div class="message fl">
        <label class="iconfont icon-message1"></label>
        <span>2</span>
      </div>
      <div class="setting fl"><label class="iconfont icon-setting1"></label></div>
      <div class="userInfo fl userAvatar" v-on:click="clickUIcon">
        <img :src="user.icon" alt="user icon" class="userAvatar">
        <label class="iconfont icon-down1 userAvatar"></label>
        <div class="userCont" v-if="visible">
          <div class="clearfix selfInfo">
            <img :src="user.icon" alt="user.name" class="fl">
            <h2>{{user.name}}</h2>
          </div>
          <div class="clearfix selfs">
            <div class="selfItem">
              <b>{{user.events}}</b>
              <label>动态</label>
            </div>
            <div class="selfItem">
              <b>{{user.follows}}</b>
              <label>关注</label>
            </div>
            <div class="selfItem">
              <b>{{user.followeds}}</b>
              <label>粉丝</label>
            </div>
          </div>
          <ul class="self-list">
            <li class="self-list-item clearfix">
              <label class="iconfont icon-vip fl"></label>
              <label class="self-list-item-content fl">VIP会员</label>
              <label class="status fl">未订购</label>
              <label class="iconfont fr icon-more"></label>
            </li>
            <li class="self-list-item clearfix">
              <label class="iconfont icon-setting1 fl"></label>
              <label class="self-list-item-content fl">个人信息设置</label>
              <label class="iconfont fr icon-more"></label>
            </li>
            <li class="self-list-item clearfix">
              <label class="iconfont icon-phone fl"></label>
              <label class="self-list-item-content fl">绑定社交账号</label>
              <label class="status fl"></label>
              <label class="iconfont fr icon-more"></label>
            </li>
          </ul>
          <ul class="self-list">
            <li class="self-list-item clearfix" v-on:click="logout">
              <label class="iconfont icon-Logout fl"></label>
              <label class="self-list-item-content fl">退出</label>
              <label class="iconfont fr icon-more"></label>
            </li>
          </ul>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
const { ipcRenderer: ipc } = require("electron");
import Titlebtn from "./Titlebtn";
export default {
  name: "headerBar",
  components: {
    Titlebtn
  },
  created() {
    window.addEventListener(
      "storage",
      () => {
        let user = localStorage.getItem("user");
        if (user !== null) {
          this.$store.commit("UPDATE_USER", JSON.parse(user));
        }
      },
      false
    );
  },
  data() {
    return {
      user: {
        id: 0,
        icon: require("../../assets/icon-user.png"),
        name: "",
        islogin: 0,
        events: 0,
        follows: 0,
        followeds: 0
      },
      visible: false
    };
  },
  beforeMount() {
    let user = window.localStorage.getItem("user");
    if (user !== null) {
      this.user = JSON.parse(window.localStorage.getItem("user"));
      this.$store.commit("UPDATE_USER", this.user);
    }
  },
  mounted() {
    const _this = this;
    document.body.addEventListener(
      "click",
      e => {
        if (e.target.className.indexOf("userAvatar") > -1) {
        } else {
          _this.visible = false;
        }
      },
      false
    );
  },

  watch: {
    "$store.state.User.user": "setUser"
  },

  methods: {
    setUser() {
      this.user = this.$store.state.User.user;
    },
    back() {
      window.history.back();
    },
    forward() {
      window.history.forward();
    },
    zoom() {
      ipc.send("max");
    },
    clickUIcon() {
      if (!this.user.islogin) {
        ipc.send("login");
      } else {
        //已经登录
        this.visible = !this.visible;
      }
    },
    logout() {
      this.$store.commit("UPDATE_USER", {
        id: 0,
        icon: require("../../assets/icon-user.png"),
        name: "",
        islogin: 0
      });
      localStorage.clear();
    }
  }
};
</script>

<style scoped>
#headBar {
  position: absolute;
  width: 100%;
  height: 60px;
  background-color: rgb(180, 0, 0);
  -webkit-app-region: drag;
  top: 0;
  left: 0;
}
#headBar .logo {
  position: absolute;
  top: 18px;
  left: 19px;
  line-height: 40px;
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
}
#headBar .logo .iconfont {
  font-size: 24px;
  vertical-align: -1px;
  font-weight: normal;
  margin-right: 8px;
}
.pathControl {
  position: absolute;
  left: 231px;
  zoom: 1;
  top: 25px;
}
.pathControl::after,
.pathControl::before {
  display: table;
  content: "";
}
.pathControl::after {
  clear: both;
}
.pathControl label {
  height: 26px;
  width: 26px;
  display: block;
  float: left;
  color: azure;
  font-weight: 600;
  border: 1px solid rgb(150, 47, 47);
  text-align: center;
  line-height: 26px;
  font-size: 18px;
}
.pathControl label:first-of-type {
  border-right: 0 none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.pathControl label:nth-child(2) {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.pathControl label:active {
  background-color: rgb(100, 47, 47);
  color: #fff;
}
.searchBar {
  width: 234px;
  height: 24px;
  line-height: 24px;
  position: absolute;
  top: 26px;
  left: 292px;
  zoom: 1;
  background-color: #fff;
  padding: 0 8px;
  border-radius: 24px;
}
.searchBar::after,
ß .searchBar::before {
  display: table;
  content: "";
}
.searchBar::after {
  clear: both;
}
.searchBar label {
  float: left;
  color: #999;
  font-size: 12px;
  margin-top: 1px;
}
.searchBar input {
  display: block;
  width: 200px;
  height: 100%;
  float: left;
  border: none;
  padding: 0 6px;
  font-size: 12px;
  outline: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.searchBar input::-webkit-input-placeholder {
  color: #afafaf;
  font-weight: bold;
}
.userController {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
}
.userController .iconfont {
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}
.userController .fl {
  float: left;
}
.userController .userInfo {
  height: 100%;
  border-left: 1px solid #a10000;
  line-height: 70px;
  padding: 0 10px 0 17px;
  position: relative;
}
.userController .userInfo .iconfont {
  font-size: 10px;
}
.userController .userInfo img {
  width: 24px;
  height: 24px;
  border-radius: 24px;
  vertical-align: -7px;
  position: relative;
}
.userController .userInfo:active .iconfont.userAvatar {
  color: #330000;
}
.userController .userInfo img::after {
  content: "";
  background-color: #ddd;
}
.userController .setting,
.userController .message {
  position: relative;
  height: 100%;
  padding: 0 20px;
  line-height: 66px;
}
.userController .message {
  padding: 0 8px;
}
.userController .message span {
  color: rgb(180, 0, 0);
  background-color: #fff;
  position: absolute;
  height: 18px;
  width: 18px;
  line-height: 18px;
  border-radius: 18px;
  text-align: center;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(10%, -80%);
  border: 1px solid rgb(180, 0, 0);
  font-size: 13px;
}

.userCont {
  position: absolute;
  top: 100%;
  right: 25px;
  background-color: #fafafa;
  z-index: 1001;
  box-shadow: 0 1px 5px #666;
  border-radius: 4px;
  width: 250px;
}
.userCont .selfInfo {
  padding: 20px;
  line-height: 40px;
  font-size: 10px;
  color: #333;
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
.userCont .selfInfo img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.userCont .selfs {
  padding: 0 20px;
  margin-bottom: 16px;
}
.userCont .selfs .selfItem {
  float: left;
  line-height: 1;
  width: 33.33%;
  border-right: 1px solid #ddd;
  padding: 4px;
  font-size: 12px;
}
.userCont .selfs .selfItem label {
  display: block;
  color: #333;
}
.userCont .selfs .selfItem b {
  color: #111;
  font-size: 14px;
}
.userCont .selfs .selfItem:last-of-type {
  border: none;
}
.userCont::after {
  position: absolute;
  content: "";
  width: 16px;
  height: 16px;
  border-radius: 4px;
  transform: rotate(45deg);
  background-color: #fafafa;
  right: 5px;
  top: -4px;
}
.userCont .self-list {
  border-top: 1px solid #ddd;
  line-height: 32px;
  color: #111;
  font-size: 12px;
  padding: 4px 0;
}
.userCont .self-list .iconfont {
  color: #ddd;
  font-size: 14px;
  color: #777;
}
.userCont .self-list .iconfont.fl {
  font-size: 16px;
}

.userCont .self-list li {
  padding: 0 20px;
}
.userCont .self-list li .self-list-item-content {
  width: 100px;
  margin-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.userCont .self-list li .status {
  text-align: right;
  width: 72px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.userCont .self-list li:hover {
  background-color: #ebebeb;
  cursor: pointer;
}
.userCont .self-list li label {
  cursor: pointer;
}
.clearfix {
  zoom: 1;
}
.clearfix::after,
.clearfix::before {
  content: "";
  display: table;
}
.clearfix::after {
  clear: both;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
</style>
