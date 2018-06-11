<template>
    <div id="signed" class="clearfix">
        <div class="dynamic">
            <div class="dy-title clearfix">
                <h1 class="fl">动态</h1>
                <button class="fr"><label class="iconfont icon-refresh"></label></button>
            </div>
        </div>
        <div class="userinfo">
            <div class="userinfo-header">
                <div class="userinfo-header-main">
                    <img :src="user.icon" :alt="user.name">
                    <div class="userinfo-header-main-right">
                        <h2>{{user.name}} <span class="iconfont" :class="user.profile.gender === 1?'icon-male blue':'icon-female pink'"></span></h2>
                        <p>{{user.profile.signature}}</p>
                    </div>
                </div>
                <div class="userinfo-header-sub clearfix">
                    <div class="userinfo-header-item">
                        <label class="num">{{user.events}}</label>
                        动态
                    </div>
                    <div class="userinfo-header-item">
                        <label class="num">{{user.follows}}</label>
                        关注
                    </div>
                    <div class="userinfo-header-item">
                        <label class="num">{{user.followeds}}</label>
                        粉丝
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import apiPath from "../../../utils/api";

export default {
  name: "Signed",
  data() {
    return {
      user: this.$store.state.User.user
    };
  },
  mounted() {
    
  },
  methods: {
    setUser() {
      this.user = this.$store.state.User.user;
    }
  },
  watch: {
    "$store.state.User.user": "setUser"
  }
};
</script>
<style scoped>
.dynamic {
  border-right: 1px solid #ddd;
  padding: 20px 30px;
}
.dy-title {
  border-bottom: 1px solid #ddd;
}
.dy-title h1 {
  font-size: 20px;
  font-weight: normal;
  color: #000;
  border-bottom: 3px solid #ddd;
  padding: 0 2px;
}
.dy-title button {
  width: 28px;
  height: 24px;
  border: none;
  background-color: #fafafa;
  box-shadow: 0 0 2px #555;
  border-radius: 2px;
  outline: none;
}
.dy-title button .iconfont {
  font-size: 14px;
  color: #777;
  font-weight: bold;
}
.dy-title button:active {
  background-color: rgb(240, 240, 240);
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
#signed {
  width: 100%;
  position: relative;
  padding-right: 245px;
}
.userinfo {
  position: absolute;
  right: 0;
  top: 0;
  width: 245px;
  overflow: hidden;
}
.userinfo-header {
  background-color: rgb(240, 240, 240);
  padding: 20px;
  font-size: 12px;
}
.userinfo-header-main {
  position: relative;
  height: 54px;
  margin-bottom: 10px;
}
.userinfo-header-main img {
  width: 54px;
  height: 54px;
  border-radius: 100%;
}
.userinfo-header-main-right {
  position: absolute;
  right: 0;
  left: 64px;
  top: 50%;
  transform: translateY(-50%);
}
.userinfo-header-main-right h2 {
  font-size: 14px;
  font-weight: normal;
  color: #000;
}
.userinfo-header-main-right h2 .iconfont {
  font-size: 14px;
  font-weight: bold;
}
.userinfo-header-main-right h2 .iconfont.blue {
  color: rgb(45, 160, 236);
}
.userinfo-header-main-right h2 .iconfont.pink {
  color: rgb(216, 66, 180);
}
.userinfo-header-main-right p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 8px;
}
.userinfo-header-item {
  float: left;
  width: 33.33%;
  padding-left: 10px;
  border-left: 1px solid #ccc;
  line-height: 1.2;
}
.userinfo-header-item:first-of-type {
  border: none;
  padding-left: 0;
}
.userinfo-header-item label {
  display: block;
  font-size: 18px;
  font-weight: bold;
}
</style>
