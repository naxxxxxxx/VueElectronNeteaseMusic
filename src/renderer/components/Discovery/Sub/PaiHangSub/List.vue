<template>
  <div class="topList">
      <div class="toplist-title" :style="heads.style">
          <div class="title-first">{{heads.n1}}</div>
          <div class="title-info">
              <p>{{heads.n2}}</p>
              <label>({{updateTime}}更新)</label>
          </div>
          <label class="play iconfont icon-play1"></label>
      </div>
      <div class="toplist-list">
          <div class="toplist-list-item" v-for="item in musics" :key="item.key" v-on:click="changeClass(item.index)" :class="item.index===selectedIndex?'active':''"  v-on:dblclick="playSong(item)">
              <label class="index" :class="(item.index === 1 || item.index === 2 || item.index === 3)?'red':''">{{item.index}}</label>
              <!-- <label class="status"><i> - </i></label> -->
              <label class="name">{{item.name}}</label>
              <label class="artist">{{item.artist}}</label>
          </div>
          <div class="toplist-list-item tr">
              <router-link :to="moreLink" class="fr" tag="label">查看全部 <i class="iconfont icon-more"></i></router-link>
          </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import apiPath from "../../../../utils/api";
import moment from "moment";

const headStyle = [
  {
    n1: "新",
    n2: "歌榜",
    style: "background-color:#4fc5c7;"
  },
  {
    n1: "热",
    n2: "歌榜",
    style: "background-color:#e0b18c"
  },
  {
    n1: "原",
    n2: "创榜",
    style: "background-color:#d94086"
  },
  {
    n1: "飙",
    n2: "升榜",
    style: "background-color:#e9434b"
  },
  {
    n1: "电",
    n2: "音榜",
    style: "background-color:#383838"
  }
];

export default {
  name: "toplist",
  props: ["music"],
  data() {
    return {
      listId: 0,
      name: "",
      updateTime: "",
      musics: [],
      moreLink: "",
      selectedIndex: -1,
      heads: ""
    };
  },
  created() {
    this.heads = headStyle[this.music];
    axios.get(apiPath.PaiHang + this.music).then(
      res => {
        let result = res.data.playlist;
        this.listId = result.id;
        this.name = result.name;
        this.updateTime = moment(result.updateTime).format("MM-DD") + "更新";
        let tracks = result.tracks;
        this.moreLink = "/main/songlist/" + result.id;
        let musicList = [];
        for (let i = 0; i < 8; i++) {
          musicList.push({
            index: i + 1,
            id: tracks[i].id,
            name: tracks[i].name,
            artist: tracks[i].ar[0].name,
            duration: tracks[i].dt,
            pic: tracks[i].al.picUrl
          });
        }
        this.musics = musicList;
      },
      error => {
        console.error();
      }
    );
  },
  methods: {
    changeClass(index) {
      this.selectedIndex = index;
    },
    playSong(item) {
      let timer =
        ((parseInt(item.duration / 1000 / 60) + "").length > 1
          ? parseInt(item.duration / 1000 / 60)
          : "0" + parseInt(item.duration / 1000 / 60)) +
        ":" +
        ((parseInt(item.duration / 1000) % 60 + "").length > 1
          ? parseInt(item.duration / 1000) % 60
          : "0" + parseInt(item.duration / 1000) % 60);
      let song = {
        name: item.name,
        singer: item.artist,
        pic: item.pic
      };
      this.$store.commit("CHANGE_SONG_ID", item.id);
      this.$store.commit("PLAY_STATE_TRUE");
      this.$store.commit("SET_TIMER_NUM", timer);
      this.$store.commit("SET_SONG", song);
    }
  }
};
</script>

<style scoped>
.toplist-title {
  height: 78px;
  position: relative;
  color: #fff;
  zoom: 1;
  cursor: pointer;
  padding: 0 10px;
}
.toplist-title::after,
.toplist-title::before {
  content: "";
  display: table;
}
.toplist-title::after {
  clear: both;
}
.toplist-title .title-first {
  left: 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.toplist-title .title-info {
  font-size: 12px;
  left: 80px;
  position: absolute;
  top: 50%;
  transform: translateY(-40%);
}
.toplist-title .title-info p {
  font-size: 28px;
  line-height: 1;
  margin: 0;
}
.toplist-title .title-info label {
  color: rgba(250, 250, 250, 0.5);
  font-size: 11px;
}
.toplist-title .play {
  position: absolute;
  font-size: 54px;
  opacity: 0.6;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.toplist-title .play:hover {
  opacity: 1;
}
.title-first {
  font-size: 50px;
}
.topList {
  float: left;
  width: 32%;
  margin-right: 2%;
  border: 1px solid #e3e3e3;
  margin-bottom: 20px;
}
.topList:nth-child(3n) {
  margin-right: 0;
  float: right;
}
.toplist-list .toplist-list-item {
  background-color: #fff;
  line-height: 30px;
  font-size: 12px;
  padding: 0 8px;
  position: relative;
  zoom: 1;
}
.toplist-list .toplist-list-item::after,
.toplist-list .toplist-list-item::before {
  content: "";
  display: table;
}
.toplist-list .toplist-list-item::after {
  clear: both;
}
.toplist-list .toplist-list-item:nth-child(even) {
  background-color: #fbfbfb;
}
.toplist-list .toplist-list-item .index {
  font-weight: bold;
  font-size: 13px;
  float: left;
}
.toplist-list .toplist-list-item .status {
  float: left;
  width: 30px;
  text-align: center;
  font-size: 7px;
}
.toplist-list .toplist-list-item .name {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 24px;
  right: 78px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
}
.toplist-list .toplist-list-item .artist {
  float: right;
  width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
  color: #444;
}
.red {
  color: #da0000;
}
.toplist-list .toplist-list-item.active {
  background-color: #e6e6e6;
}
.toplist-list .toplist-list-item.tr {
  text-align: right;
  color: #555;
  padding: 4px 8px;
}
.toplist-list .toplist-list-item.tr .iconfont {
  line-height: 30px;
}
.toplist-list .toplist-list-item i {
  font-style: normal;
}
</style>
