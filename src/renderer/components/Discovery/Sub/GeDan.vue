<template>
  <div class="subItem" id="geDan">
      <div class="selector">
        <button class="selectBtn" @click="toggleSub">{{tagName}} <i class="iconfont selectBtn icon-down1"></i></button>
        <div class="selectPanel" v-if="showSub">
          <div class="selectPanelTitle selectBtn">
            <button @click="changeList('全部歌单',1)">全部歌单 <span v-if="tagName==='全部歌单'" class="activeAll iconfont icon-cc-yes-crude"></span></button>
          </div>
          <div class="selectTypes selectBtn">
            <div class="selectTypeItem selectBtn clearfix" v-for="(item,index) in categories" :key="index">
              <div class="type selectBtn fl">
                <label class="iconfont" :class="tagIcon[index]"></label> {{item}}
              </div>
              <div class="subs selectBtn fr">
                <label v-for="label in sub[index]" :key="label.key" @click="changeList(label.name,1)">{{label.name}}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hotTags clearfix">
        <label>热门标签：</label>
        <span v-for="item in tagList" @click="changeList(item.name,0)" :key="item.key">{{item.name}}</span>
      </div>
      <div class="gedanList songItems">
        <Loading v-if="!loaded" style="background-color:#fafafa;height:300px;" />
        <div class="itemBlock" v-if="loaded">
          <div class="blockContent hotJx">
            <div  class="hotJx-item" v-for="item in gedan1" :key="item.key">
              <div class="hotJx-item-img">
                <router-link tag="img" :src="item.pic" :alt="item.name" :to="item.link"></router-link>
                <label class="iconfont icon-play1" @click="playList(item.id)"></label>
              </div>
              <router-link tag="div" class="hotJx-item-content" :to="item.link">{{item.name}}</router-link>
              <div class="hotJx-item-label"><span class="iconfont icon-listen"></span> {{item.count}}</div>
            </div>
          </div>
        </div>
        <div class="itemBlock" v-if="loaded">
          <div class="blockContent hotJx">
            <div  class="hotJx-item" v-for="item in gedan2" :key="item.key">
              <div class="hotJx-item-img">
                <router-link tag="img" :src="item.pic" :alt="item.name" :to="item.link"></router-link>
                <label class="iconfont icon-play1" @click="playList(item.id)"></label>
              </div>
              <router-link tag="div" class="hotJx-item-content" :to="item.link">{{item.name}}</router-link>
              <div class="hotJx-item-label"><span class="iconfont icon-listen"></span> {{item.count}}</div>
            </div>
          </div>
        </div>
        <div class="itemBlock" v-if="loaded">
          <div class="blockContent hotJx">
            <div  class="hotJx-item" v-for="item in gedan3" :key="item.key">
              <div class="hotJx-item-img">
                <router-link tag="img" :src="item.pic" :alt="item.name" :to="item.link"></router-link>
                <label class="iconfont icon-play1" @click="playList(item.id)"></label>
              </div>
              <router-link tag="div" class="hotJx-item-content" :to="item.link">{{item.name}}</router-link>
              <div class="hotJx-item-label"><span class="iconfont icon-listen"></span> {{item.count}}</div>
            </div>
          </div>
        </div>
        <div class="itemBlock" v-if="loaded">
          <div class="blockContent hotJx">
            <div  class="hotJx-item" v-for="item in gedan4" :key="item.key" >
              <div class="hotJx-item-img">
                <router-link tag="img" :src="item.pic" :alt="item.name" :to="item.link"></router-link>
                <label class="iconfont icon-play1" @click="playList(item.id)"></label>
              </div>
              <router-link tag="div" class="hotJx-item-content" :to="item.link">{{item.name}}</router-link>
              <div class="hotJx-item-label"><span class="iconfont icon-listen"></span> {{item.count}}</div>
            </div>
          </div>
        </div>
        <div class="itemBlock" v-if="loaded">
          <div class="blockContent hotJx">
            <div  class="hotJx-item" v-for="item in gedan5" :key="item.key" >
              <div class="hotJx-item-img">
                <router-link tag="img" :src="item.pic" :alt="item.name" :to="item.link"></router-link>
                <label class="iconfont icon-play1" @click="playList(item.id)"></label>
              </div>
              <router-link tag="div" class="hotJx-item-content" :to="item.link">{{item.name}}</router-link>
              <div class="hotJx-item-label"><span class="iconfont icon-listen"></span> {{item.count}}</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import apiPath from "../../../utils/api";
import moment from "moment";
import { setTimeout } from "timers";

export default {
  name: "geDan",
  data() {
    return {
      tagName: "",
      gedan1: [],
      gedan2: [],
      gedan3: [],
      gedan4: [],
      gedan5: [],
      tagList: [],
      playlists: [],
      loaded: false,
      tagIcon: [
        "icon-world",
        "icon-piano",
        "icon-coffee",
        "icon-emoji",
        "icon-music"
      ],
      categories: [],
      showSub: false
    };
  },
  mounted() {
    const _this = this;
    this.tagName =
      this.$route.params.tag === "0" ? "全部歌单" : this.$route.params.tag;
    axios.get(apiPath.GeDans + _this.tagName).then(
      res => {
        _this.$options.methods.getAllList(_this, res.data.playlists);
      },
      error => {
        console.log(error);
      }
    );
    this.$watch("tagName", (newValue, oldValue) => {
      _this.loaded = false;
      axios.get(apiPath.GeDans + _this.tagName).then(
        res => {
          _this.$options.methods.getAllList(_this, res.data.playlists);
        },
        error => {
          console.log(error);
        }
      );
    });
    axios.get(apiPath.HotPlaylist).then(
      res => {
        this.tagList = res.data.tags;
      },
      error => {
        console.log(error);
      }
    );
    axios.get(apiPath.PlaylistType).then(
      res => {
        let result = res.data;
        this.categories = result.categories;
        let subs = [[], [], [], [], []];
        let reSub = result.sub;
        for (let i = 0; i < reSub.length; i++) {
          let index = reSub[i].category;
          subs[index].push({
            name: reSub[i].name
          });
        }
        this.sub = subs;
      },
      error => {
        console.log(error);
      }
    );
    document.body.addEventListener(
      "click",
      e => {
        if (e.target.className.indexOf("selectBtn") > -1) {
        } else {
          _this.showSub = false;
        }
      },
      false
    );
  },
  methods: {
    getAllList(that, tPlaylists) {
      that.gedan1 = [];
      that.gedan2 = [];
      that.gedan3 = [];
      that.gedan4 = [];
      that.gedan5 = [];
      for (let i = 0; i < tPlaylists.length; i++) {
        let item = {
          name: tPlaylists[i].name,
          pic: tPlaylists[i].coverImgUrl,
          count: tPlaylists[i].playCount,
          id: tPlaylists[i].id,
          link: "/main/songlist/" + tPlaylists[i].id
        };
        if (i < 6) {
          that.gedan1.push(item);
        } else if (i >= 6 && i < 12) {
          that.gedan2.push(item);
        } else if (i >= 12 && i < 18) {
          that.gedan3.push(item);
        } else if (i >= 18 && i < 24) {
          that.gedan4.push(item);
        } else if (i >= 24 && i < 30) {
          that.gedan5.push(item);
        }
      }

      window.setTimeout(() => {
        that.loaded = true;
      }, 500);
    },
    changeList(item, type) {
      if (type === 1) {
        this.showSub = false;
      }
      this.tagName = item;
    },
    playList(id) {
      console.log(id);
    },
    toggleSub() {
      this.showSub = !this.showSub;
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
.selector {
  position: relative;
}
.selector button {
  border: none;
  background-color: #fafafa;
  line-height: 28px;
  padding: 0 8px;
  font-size: 14px;
  color: #333;
  box-shadow: 0 0px 1px #000;
  border-radius: 4px;
  outline: none;
}
.selector button .iconfont {
  vertical-align: middle;
}
.selector button:active {
  background-color: #efefef;
}
.selector .selectPanel {
  position: absolute;
  background-color: #fafafa;
  border-radius: 4px;
  box-shadow: 0 0 10px #666;
  top: 50px;
  z-index: 10;
}
.selector .selectPanel::before {
  width: 15px;
  border-radius: 4px;
  height: 15px;
  background-color: #fafafa;
  position: absolute;
  content: "";
  top: -7px;
  left: 40px;
  transform: rotate(45deg);
  border-right: 0;
  border-bottom: 0;
}
.selector .selectPanel .selectPanelTitle {
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
}
.selectPanelTitle .activeAll {
  font-size: 10px;
  background-color: rgb(38, 151, 216);
  color: #fff;
  width: 6px;
  height: 6px;
  padding: 1px;
  border-radius: 12px;
}
.selector .selectPanel .selectPanelTitle button {
  height: 24px;
  line-height: 24px;
  padding: 0 20px;
  font-size: 12px;
}
.selector .selectPanel .selectTypeItem {
  padding: 0 20px;
  width: 500px;
  line-height: 12px;
  font-size: 12px;
  color: #333;
}
.selector .selectPanel .selectTypeItem .type {
  font-weight: bold;
  padding: 14px 0 0;
}
.selector .selectPanel .selectTypeItem .iconfont {
  font-size: 18px;
  vertical-align: -2px;
}
.selector .selectPanel .selectTypeItem .subs {
  width: 400px;
  border-left: 1px solid #ddd;
  padding: 14px 8px;
}
.selector .selectPanel .selectTypeItem .subs label {
  padding: 0 8px;
  border-right: 1px solid #ddd;
  display: block;
  float: left;
  margin-bottom: 8px;
  cursor: pointer;
}
.hotTags {
  line-height: 36px;
  font-size: 12px;
  color: #333;
}
.hotTags label,
.hotTags spab {
  float: left;
}
.hotTags label {
  font-weight: bold;
}
.hotTags span {
  padding: 0 12px;
  cursor: pointer;
  border-right: 1px solid #ddd;
}

.songItems {
  zoom: 1;
  position: relative;
}
.songItems::after,
.songItems::before {
  content: "";
  display: table;
}
.songItems::after {
  clear: both;
}
.itemBlock {
  margin-bottom: 20px;
  color: rgb(51, 51, 51);
}
.itemBlock .blockTitle {
  border-bottom: 1px solid rgb(216, 216, 216);
  zoom: 1;
}
.itemBlock .blockTitle::after,
.itemBlock .blockTitle::before {
  content: "";
  display: table;
}
.itemBlock .blockTitle::after {
  clear: both;
}
.itemBlock .blockTitle .bTitle {
  font-size: 20px;
  vertical-align: bottom;
  line-height: 30px;
  border-bottom: 3px solid rgb(226, 226, 226);
  float: left;
  font-weight: bold;
}

.itemBlock .blockTitle .more {
  float: right;
  display: block;
  width: 48px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  border: 1px solid #ddd;
  font-weight: bold;
  border-radius: 4px;
  background-color: #fff;
  color: rgb(50, 50, 50);
  text-decoration: none;
}
.itemBlock .blockTitle .more .iconfont {
  font-size: 12px;
  font-weight: bold;
}

.itemBlock .hotJx {
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  margin-top: 20px;
}
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
  border-radius: 4px;
  border: 1px solid #ddd;
  position: relative;
}
.hotJx-item-img label {
  position: absolute;
  right: 14px;
  bottom: 5px;
  font-size: 40px;
  width: 40px;
  height: 40px;
  line-height: 40x;
  border-radius: 40px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  display: none;
  color: #fff;
}
.hotJx-item-img label::before {
  text-shadow: 0 2px 3px #444;
}
.hotJx-item-img:hover label {
  display: block;
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
