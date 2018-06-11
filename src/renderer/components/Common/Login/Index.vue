<template>
  <div id="login">
      <div class="login-header">
        <label class="iconfont icon-phone_done"></label>
      </div>
      <div class="form-control">
        <div class="form-item clearfix">
          <label class="iconfont icon-phone fl"> <strong>+86</strong></label>
          <div class="input-control phone">
            <input type="text" v-model="phone" placeholder="请输入手机号" maxlength="11" ref="phone">
          </div>
        </div>
        <div class="form-item clearfix">
          <label class="iconfont icon-lock fl"></label>
          <div class="input-control">
            <input type="password" v-model="password" placeholder="请输入密码" maxlength="20" ref="pwd">
          </div>
        </div>
      </div>
      <div class="clearfix btm-control">
        <div class="fl checkbox"><label><span v-if="checked" class="iconfont icon-cc-yes-crude"></span></label>自动登录</div>
        <div class="fr tip" v-if="errTip!=''">{{errTip}}</div>
      </div>
      <div class="controller">
        <label v-on:click="onSubmit">登录</label>
      </div>
      <div class="close" v-on:click="closeLogin"></div>
      <div class="message" ref="message" v-if="showMess">登录成功</div>
  </div>
</template>

<script>
import axios from "axios";
import apiPath from "../../../utils/api";
const { ipcRenderer: ipc } = require("electron");

export default {
  name: "login",
  data() {
    return {
      phone: "13560484390",
      password: "NaxWong920918",
      checked: true,
      errTip: "",
      showMess: false
    };
  },
  methods: {
    closeLogin() {
      window.close();
    },
    onSubmit() {
      let phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
      const _this = this;
      if (this.phone === "") {
        this.errTip = "请输入手机号";
        this.$refs.phone.focus();
      } else if (!phoneReg.test(this.phone)) {
        this.errTip = "请输入正确的手机号";
        this.$refs.phone.focus();
      } else if (this.password === "") {
        this.errTip = "请输入密码";
        this.$refs.pwd.focus();
      } else {
        this.errTip = "";
        axios
          .get(
            apiPath.Login + "phone=" + this.phone + "&password=" + this.password
          )
          .then(
            res => {
              if (res.data.code === 200) {
                let account = res.data.account;
                let profile = res.data.profile;
                let bindings = res.data.bindings;
                let user = {
                  id: account.id,
                  icon: profile.avatarUrl,
                  name: profile.nickname || account.userName,
                  islogin: 1,
                  account: account,
                  profile: profile,
                  bindings: bindings,
                  signature: profile.signature
                };
                axios
                  .all([
                    axios.get(apiPath.Dynamic + user.id),
                    axios.get(apiPath.Follows + user.id),
                    axios.get(apiPath.Followed + user.id)
                  ])
                  .then(
                    axios.spread(function(event, follows, followeds) {
                      user.events = event.data.events.length;
                      user.follows = follows.data.follow.length;
                      user.followeds = followeds.data.followeds.length;
                      _this.$store.commit("UPDATE_USER", user);
                      window.localStorage.setItem("user", JSON.stringify(user));
                      window.close();
                    })
                  );
              } else {
                this.$store.commit("UPDATE_USER", {
                  id: 0,
                  icon: require("../../../assets/icon-user.png"),
                  name: "",
                  islogin: 0
                });
              }
            },
            error => {
              console.log(error);
            }
          );
      }
    }
  }
};
</script>

<style scoped>
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

#login {
  padding: 40px;
  width: 100%;
  height: 100%;
  position: absolute;
  -webkit-app-region: drag;
  background-color: #fff;
  border-radius: 4px;
}
#login .login-header {
  text-align: center;
  height: 160px;
  line-height: 160px;
}
#login .login-header .iconfont {
  font-size: 100px;
  color: #ff949a;
}
#login .form-control {
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  margin: 0 auto;
}

#login .form-control .form-item {
  height: 38px;
  line-height: 38px;
  padding: 0 10px;
  overflow: hidden;
  position: relative;
}

#login .form-control .form-item label {
  display: block;
  font-weight: bold;
  color: #888;
  margin-right: 6px;
}

#login .form-control .form-item:first-of-type {
  border-bottom: 1px solid #ccc;
}

#login .form-control .form-item:first-of-type label::before {
  margin-right: 6px;
  color: #888;
}
#login .form-control .form-item label strong {
  color: #000;
  font-size: 12px;
  font-weight: normal;
}
#login .form-control .form-item .input-control {
  position: absolute;
  top: 4px;
  right: 10px;
  left: 32px;
}
#login .form-control .form-item .input-control input {
  width: 100%;
  display: block;
  height: 30px;
  line-height: 30px;
  outline: none;
  border: 0 none;
  font-size: 14px;
}
#login .form-control .form-item .input-control.phone {
  left: 60px;
}
::-webkit-input-placeholder {
  color: #a8a8a8;
}
.close {
  position: absolute;
  left: 14px;
  top: 14px;
  width: 13px;
  height: 13px;
  cursor: pointer;
}
.close::after,
.close::before {
  position: absolute;
  content: "";
  background-color: #999;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
}
.close::after {
  width: 1px;
  height: 100%;
}
.close::before {
  width: 100%;
  height: 1px;
}
.btm-control {
  margin: 10px auto;
}
.checkbox {
  font-size: 12px;
  width: 30%;
}
.checkbox label {
  position: relative;
  width: 14px;
  height: 14px;
  border: 1px solid #a8a8a8;
  border-radius: 2px;
  display: inline-block;
  vertical-align: -3px;
  margin-right: 4px;
}
.checkbox label span {
  position: absolute;
  font-size: 12px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(180, 0, 0);
}
.tip {
  font-size: 12px;
  color: rgb(180, 0, 0);
  width: 65%;
  text-align: right;
}
.controller {
  margin: 0 auto;
}
.controller label {
  width: 100%;
  height: 40px;
  display: block;
  background-color: rgb(210, 0, 0);
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
  line-height: 40px;
  letter-spacing: 4px;
}
.controller label:active {
  background-color: rgb(180, 0, 0);
}
#login .message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 20px 40px;
  border-radius: 7px;
  font-weight: bold;
}
</style>

