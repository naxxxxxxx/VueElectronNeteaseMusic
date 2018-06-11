<template>
  <div class="subItem" id="tuijian">
    <!-- <swiper :options="swiperOption" class="sliderCount">
      <swiper-slide v-for="item in sliders" :key="item.key">
        <router-link :to="'/main/songlist/'+item.targetId"><img :src="item.pic" :alt="item.targetId"></router-link>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination" ref="pagination"></div>
    </swiper> -->

    <div class="itemBlock">
      <div class="blockTitle">
        <label class="bTitle">热门精选</label>
      </div>
      <div class="blockContent hotJx">
        <router-link :to="'/main/songlist/'+item.id"  class="hotJx-item" v-for="item in gedan" v-bind:key="item.key">
          <div class="hotJx-item-img"><img v-bind:src="item.pic" v-bind:alt="item.content"></div>
          <div class="hotJx-item-content">{{item.content}}</div>
          <div class="hotJx-item-label"><span class="iconfont icon-listen"></span> {{item.playcount}}</div>
        </router-link>
      </div>
      <div class="blockContent hotJx">
        <router-link :to="'/main/songlist/'+item.id"  class="hotJx-item" v-for="item in gedan2" v-bind:key="item.key">
          <div class="hotJx-item-img"><img v-bind:src="item.pic" v-bind:alt="item.content"></div>
          <div class="hotJx-item-content">{{item.content}}</div>
          <div class="hotJx-item-label"><span class="iconfont icon-listen"></span> {{item.playcount}}</div>
        </router-link>
      </div>
    </div>
    <div class="itemBlock">
      <div class="blockTitle">
        <label class="bTitle">新歌速递</label>
        <router-link to="" class="more">更多<span class="iconfont icon-more"></span></router-link>
      </div>
      <div class="blockContent newSong">
        
        <div class="blockContentTitle">
          <div class="item-list-item">
            <label class="song-head"><span class="iconfont icon-play1"></span></label>
            <label class="song-content">播放全部</label>
          </div>
        </div>

        <div class="item-list-contain">
          <div class="item-list fl">
            <div class="item-list-item" v-for="item in newEven" :key="item.key" :class="item.listid == newSelected?'active':''" v-on:click="changeSelected(item.listid)" v-on:dblclick="play(item)">
              <label class="song-head">{{item.listid}}</label>
              <label class="song-content">{{item.name}}</label>
              <label class="song-artist">{{item.artist}}</label>
            </div>
          </div>
          <div class="item-list fl">
            <div class="item-list-item" v-for="item in newOdd" :key="item.key" :class="item.listid == newSelected?'active':''" v-on:click="changeSelected(item.listid)" v-on:dblclick="play(item)">
              <label class="song-head">{{item.listid}}</label>
              <label class="song-content">{{item.name}}</label>
              <label class="song-artist">{{item.artist}}</label>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import apiPath from "../../../utils/api";
import { swiper, swiperSlide } from "vue-awesome-swiper";
require("swiper/dist/css/swiper.min.css");

export default {
  name: "tuiJian",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      sliders: [],
      swiper: null,
      gedan: [],
      gedan2: [],
      newSelected: null,
      newEven: [],
      newOdd: [],
      swiperOption: {
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        loop: true,
        mousewheelControl: true,
        observeParents: true,
        // effect: "coverflow",
        // slidesPerView: 1.5,
        initialSlide: 1,
        coverflowEffect: {
          rotate: 30,
          stretch: 30,
          depth: 60,
          modifier: 2,
          slideShadows: true
        }
      }
    };
  },
  mounted() {
    //获取歌单列表
    let _this = this;
    axios.get(apiPath.TJSongLists).then(
      res => {
        let data = res.data.result;
        if (data && data.length > 0) {
          for (let i = 0; i < 12; i++) {
            let count = data[i].playCount + "";
            count = count.length > 5 ? parseInt(count / 10000) + "万" : count;
            let songData = {
              id: data[i].id,
              type: data[i].type,
              content: data[i].name,
              copywriter: data[i].copywriter,
              pic: data[i].picUrl,
              playcount: count
            };
            if (i < 6) {
              _this.gedan.push(songData);
            } else {
              _this.gedan2.push(songData);
            }
          }
        }
      },
      error => {
        console.log(error);
      }
    );

    axios.get(apiPath.Banner).then(
      res => {
        let data = res.data.banners;
        if (data && data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            _this.sliders.push({
              url: data[i].url,
              pic: data[i].picUrl,
              targetId: data[i].targetId
            });
          }
        }
      },
      error => {
        console.log(error);
      }
    );

    axios.get(apiPath.TJNewSongList + "?limit=20").then(
      res => {
        let data = res.data.result;
        for (let i = 0; i < data.length; i++) {
          let singleData = {
            listid: (i + 1 + "").length > 1 ? i + 1 : "0" + (i + 1),
            id: data[i].id,
            name: data[i].name,
            artist: data[i].song.album.artists[0].name,
            pic: data[i].song.album.picUrl,
            duration: data[i].song.duration
          };
          if ((i + 1) % 2 != 0) {
            this.newEven.push(singleData);
          } else {
            this.newOdd.push(singleData);
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  },
  methods: {
    changeSelected(id) {
      this.newSelected = id;
    },
    play(item) {
      this.$store.commit("PLAYMUSIC", item);
    }
  }
};
</script>

<style scoped>
.newSong {
  border: 1px solid #eee;
  margin-top: 20px;
  line-height: 32px;
}

.item-list-contain {
  zoom: 1;
  font-size: 12px;
  font-weight: bold;
  color: rgb(100, 100, 100);
}
.item-list-contain::after,
.item-list-contain::before,
.item-list-item::after,
.item-list-item::before {
  content: "";
  display: table;
}
.item-list-contain::after,
.item-list-item::after {
  clear: both;
}

.item-list-item {
  zoom: 1;
  position: relative;
}
.item-list-item:active,
.item-list-item.active {
  background-color: #d8d8d8 !important;
}
.item-list-item label {
  float: left;
  display: block;
}
.item-list-item label.song-head {
  width: 40px;
  text-align: center;
}
.item-list-item label .iconfont {
  font-size: 20px;
  font-weight: bold;
  color: rgb(180, 0, 0);
}
.item-list:first-of-type {
  border-right: 1px solid #eee;
}
.item-list-item label.song-artist {
  float: right;
  width: 70px;
  padding: 0 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fl {
  float: left;
  width: 50%;
}

.song-content {
  font-size: 12px;
  position: absolute;
  top: 0;
  left: 44px;
  right: 74px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.blockContentTitle .item-list-item {
  background-color: #f5f5f5;
}
.item-list-contain .item-list-item:nth-child(even) {
  background-color: #f5f5f5;
}

.sliderCount {
  margin-bottom: 30px;
}
.swiper-slide {
  width: 100%;
  position: relative;
  padding-bottom: 30px;
}
.swiper-slide img {
  width: 100%;
  display: block;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
  -webkit-box-reflect: below 0 -webkit-linear-gradient(transparent 90%, rgba(250, 250, 250, 0.2));
  box-reflect: below 0
    linear-gradient(transparent 90%, rgba(250, 250, 250, 0.2));
}
.swiper-pagination-bullet.swiper-pagination-bullet-active {
  background-color: #d70000;
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
.itemBlock .hotJx .hotJx-item {
  width: 150px;
  margin-bottom: 20px;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  color: rgb(100, 100, 100);
}
.itemBlock .hotJx .hotJx-item-img {
  width: 150px;
  height: 150px;
  display: block;
  background-color: #000;
  border-radius: 4px;
  border: 1px solid #ddd;
}
.itemBlock .hotJx .hotJx-item-img img {
  width: 100%;
  height: 100%;
  display: block;
}
.itemBlock .hotJx .hotJx-item-content {
  margin-top: 4px;
  font-size: 14px;
  line-height: 18px;
}
.itemBlock .hotJx .hotJx-item-label {
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
.itemBlock .hotJx .hotJx-item-label span {
  font-weight: bold;
  font-size: 14px;
}

@media screen and (max-width: 1100px) {
  .itemBlock .hotJx .hotJx-item:nth-child(5) {
    display: none;
  }
}
@media screen and (max-width: 1300px) {
  .itemBlock .hotJx .hotJx-item:last-of-type {
    display: none;
  }
}
</style>