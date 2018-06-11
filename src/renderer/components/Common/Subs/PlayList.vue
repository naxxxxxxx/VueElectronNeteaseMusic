<template>
    <div id="playList">
        <Loading v-if="!loaded" style="position:relative;height:40px;background-color:transparent;" />
        <div v-if="loaded" class="bordered">
          <div class="blockContentTitle">
            <div class="item-list-item">
              <label class="song-head"><span class="iconfont icon-play1"></span></label>
              <label class="song-content">播放全部</label>
              <button class="fr"><i class="iconfont icon-folder-add"></i>收藏全部</button>
            </div>
          </div>
          <div class="item-list-contain">
            <table class="table">
              <tbody>
                <tr v-for="(item,index) in list" :key="index" @click="changeClass(index)" :class="index===selectedIndex?'active':''" @dblclick="playSong(item)">
                  <td>{{(index+1+'').length > 1 ? index+1 : "0"+(index+1)}}</td>
                  <td>{{item.name}}<span class="sub">{{item.alias.length===0 ? "" : "("+item.alias[0]+")"}}</span></td>
                  <td>{{item.artists[0].name}}</td>
                  <td>{{item.album.name}}</td>
                  <td>{{computeTime(item)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import apiPath from "../../../utils/api";

export default {
  name: "PlayList",
  props: ["playlist"],
  data() {
    return {
      selectedIndex: -1,
      loaded: 0,
      list: []
    };
  },
  created() {
    const that = this;
    this.$options.methods.getListData(that);
  },
  methods: {
    getListData(that) {
      axios.get(apiPath.Newest + that.playlist.tag + "&limit=10").then(
        res => {
          axios
            .all([
              axios.get(apiPath.SongContent + res.data.playlists[0].id),
              axios.get(apiPath.SongContent + res.data.playlists[8].id),
              axios.get(apiPath.SongContent + res.data.playlists[9].id)
            ])
            .then(
              axios.spread(function(a, b, c) {
                let allArr = a.data.result.tracks.concat(
                  b.data.result.tracks,
                  c.data.result.tracks
                );
                that.list = allArr;
                that.loaded = 1;
              })
            );
        },
        error => {
          console.log(error);
        }
      );
    },
    listChanged() {
      const _that = this;
      _that.loaded = 0;
      this.selectedIndex = -1;
      this.getListData(_that);
    },
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
        singer: item.artists[0].name,
        pic: item.album.picUrl
      };

      this.$store.commit("CHANGE_SONG_ID", item.id);
      this.$store.commit("PLAY_STATE_TRUE");
      this.$store.commit("SET_TIMER_NUM", timer);
      this.$store.commit("SET_SONG", song);
    },
    computeTime(item) {
      return (
        ((parseInt(item.duration / 1000 / 60) + "").length > 1
          ? parseInt(item.duration / 1000 / 60)
          : "0" + parseInt(item.duration / 1000 / 60)) +
        ":" +
        ((parseInt(item.duration / 1000) % 60 + "").length > 1
          ? parseInt(item.duration / 1000) % 60
          : "0" + parseInt(item.duration / 1000) % 60)
      );
    }
  },
  watch: {
    playlist: "listChanged"
  }
};
</script>
<style scoped>
.bordered {
  border: 1px solid #ddd;
  background-color: #fafafa;
}
.item-list-item,
.clearfix {
  zoom: 1;
}
.item-list-item::after,
.item-list-item::before,
.clearfix::after,
.clearfix::before {
  content: "";
  display: table;
}
.item-list-item::after,
.clearfix::after {
  clear: both;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.item-list-item {
  padding: 0 8px;
  font-size: 12px;
  line-height: 30px;
}
.item-list-item .song-head {
  float: left;
  width: 24px;
  display: block;
  text-align: center;
  margin-right: 16px;
}
.item-list-item .song-head .iconfont {
  font-size: 20px;
  font-weight: bold;
  color: rgb(180, 0, 0);
}

.blockContentTitle .item-list-item {
  line-height: 50px;
  background-color: #fff;
}
.song-content {
  color: #333;
}
.blockContentTitle .song-content {
  font-size: 14px;
}
.blockContentTitle button {
  width: 86px;
  margin-top: 16px;
  height: 24px;
  border-radius: 2px;
  border: none;
  box-shadow: 0 0 2px #000;
  background-color: transparent;
  color: #222;
  font-weight: bold;
  font-size: 12px;
  outline: none;
}
.blockContentTitle button:active {
  background-color: rgb(240, 240, 240);
}
.blockContentTitle button .iconfont {
  font-weight: bold;
  color: #444;
  font-size: 15px;
  vertical-align: -1px;
  margin-right: 4px;
}
table {
  width: 100%;
  font-size: 12px;
  border-collapse: collapse;
  text-align: left;
  color: #888;
  table-layout: fixed;
  word-wrap: break-word;
}
table td {
  padding: 0 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #666;
  font-weight: bold;
}
table tr {
  line-height: 30px;
  background-color: rgb(244, 244, 244);
}
table tr td:first-of-type {
  width: 40px;
  text-align: center;
}
table tr:nth-child(even) {
  background-color: #fff;
}
table tr td:nth-child(3),
table tr td:nth-child(4) {
  width: 23%;
}
table tr td:nth-child(3),
table tr td:nth-child(4),
table tr td:nth-child(2) {
  color: #555;
}
table tr td:last-of-type {
  width: 60px;
}
table tr:active,
table tr.active {
  background-color: #e1e1e1;
}
</style>

