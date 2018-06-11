<template>
  <router-link :to="link"  class="hotJx-item">
    <div class="hotJx-item-img"><img :src="pic" :alt="name"><label class="iconfont icon-play1"></label></div>
    <div class="hotJx-item-content">{{name}}</div>
    <div class="hotJx-item-label"><span class="iconfont icon-listen"></span> {{count}}</div>
    
  </router-link>
</template>

<script>
import axios from "axios";
import apiPath from "../../../../utils/api";
import moment from "moment";

export default {
  name: "list_world",
  props: ["music"],
  data() {
    return {
      name: "",
      pic: "",
      count: 0,
      id: 0,
      link: ""
    };
  },
  created() {
    axios.get(apiPath.PaiHang + this.music).then(
      res => {
        let result = res.data.playlist;
        this.name = result.name;
        this.pic = result.coverImgUrl;
        this.id = result.id;
        let playCount = result.playCount + "";
        this.count =
          playCount.length > 4 ? parseInt(playCount / 10000) + "万" : playCount;
        this.link = "/main/songlist/" + result.id;
      },
      error => {
        console.error();
      }
    );
  }
};
</script>

<style scoped>
.hotJx-item {
  width: 150px;
  margin-bottom: 20px;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  color: rgb(100, 100, 100);
}
.hotJx-item-img {
  width: 150px;
  height: 150px;
  display: block;
  background-color: #000;
  border-radius: 4px;
  border: 1px solid #ddd;
  position: relative;
}
.hotJx-item-img img {
  width: 100%;
  height: 100%;
  display: block;
}
.hotJx-item-content {
  margin-top: 4px;
  font-size: 14px;
  line-height: 18px;
}
.hotJx-item-label {
  position: absolute;
  right: 0;
  top: 0;
  color: #fff;
  text-shadow: 0 1px #000;
  width: auto;
  padding: 0px 6px;
  font-size: 14px;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.2);
}
.hotJx-item-label span {
  font-weight: bold;
  font-size: 14px;
}
label.icon-play1 {
  position: absolute;
  right: 0;
}

@media screen and (max-width: 1100px) {
  .hotJx-item:nth-child(5) {
    display: none;
  }
}
@media screen and (max-width: 1300px) {
  .hotJx-item:last-of-type {
    display: none;
  }
}
</style>
