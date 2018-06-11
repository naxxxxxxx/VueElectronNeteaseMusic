<template>
    <div id="lyrics">
      <!-- <div class="blurImg">
        <img :src="music.al.picUrl" :alt="music.al.name">
      </div> -->
      <div class="songInfos clearfix">
        <div class="disk fl">
          <div class="pics" :class="playStatus?'rotating':''">
            <img :src="music.al.picUrl" alt="music.name" class="pic">
            <img src="../../assets/circle.png" alt="disk" class="mask">
          </div>
        </div>
        <div class="lyricCont fr">
          <h1>{{music.name}} <!--<label>128k</label>--></h1>
          <div class="clearfix">
            <div class="zj">专辑：{{music.al.name}}</div>
            <div class="gs">歌手：{{music.ar[0].name}}</div>
            <div class="src">来源：啊科技三等奖啊</div>
          </div>
        </div>
      </div>
      <div class="song-subInfos clearfix">
        <div class="comments">
          <div class="item-title clearfix">
            <h2 class="fl">听友评论</h2>
            <label class="fl">(已有13323条评论)</label>
          </div>
          <Comments style="padding:0;margin-top:20px;"  :songid="musicID" />
        </div>
        <div class="simulate">
          <div class="subItems" v-if="SimiPlaylist.length>0">
            <div class="item-title clearfix">
              <h2>包含这首歌的歌单</h2>
            </div>
          </div>
          <div class="subItems" v-if="SimiSong.length>0">
            <div class="item-title clearfix">
              <h2>相似歌曲</h2>
            </div>
            <ul class="songlist">
                <li v-for="item in SimiSong" :key="item.id" class="clearfix" @click="playSong(item)">
                  <label class="fl iconfont icon-musicnote"></label>
                  <label class="name fl">{{item.name}} <span>{{item.alias.length===0 ? "" : "("+item.alias[0]+")"}}</span> </label>
                  <label class="singer fr">{{item.singer}}</label>
                </li>
              </ul>
          </div>
          <div class="subItems" v-if="SimiUser.length>0">
            <div class="item-title clearfix">
              <h2>喜欢这首歌的人</h2>
            </div>
          </div>
        </div>
      </div>
      <button @click="zoomIn" class="zoomIn"><i class="iconfont icon-zoom-out-o"></i></button>
    </div>
</template>

<script>
import axios from "axios";
import apiPath from "../../utils/api";
import Comments from "./SongList/Sub/Comment";

export default {
  name: "Lyrics",
  components: {
    Comments
  },
  data() {
    return {
      music: {
        al: {
          picUrl: "",
          name: ""
        }
      },
      musicID: this.$store.state.Player.musicId,
      SimiPlaylist: [],
      SimiSong: [],
      SimiUser: [],
      playStatus: this.$store.state.Player.playState
    };
  },
  created() {
    this.$options.methods.getSong(this);
  },
  methods: {
    zoomIn() {
      this.$store.commit("HIDE_LYRIC");
    },
    reset() {
      this.musicID = this.$store.state.Player.musicId;
      this.getSong(this);
    },
    getSong(_this) {
      let musicID = _this.$store.state.Player.musicId;
      axios.get(apiPath.SongLyricDetail + musicID).then(
        res => {
          _this.music = res.data.songs[0];
          console.log(_this.music);
        },
        error => {
          console.log(error);
        }
      );
      axios
        .all([
          axios.get(apiPath.SimiSong + musicID),
          axios.get(apiPath.SimiUser + musicID)
        ])
        .then(
          axios.spread((sRes, user, playlist) => {
            let songs = sRes.data.songs;
            let allSongs = [];
            for (let i = 0; i < songs.length; i++) {
              allSongs.push({
                id: songs[i].id,
                name: songs[i].name,
                singer: songs[i].artists[0].name,
                pic: songs[i].album.picUrl,
                alias: songs[i].alias,
                duration: songs[i].duration
              });
            }
            _this.SimiSong = allSongs;
          })
        );
    },
    playSong(item) {
      this.$store.commit("PLAYMUSIC", item);
    },
    setStatus() {
      this.playStatus = this.$store.state.Player.playState;
    }
  },
  watch: {
    "$store.state.Player.musicId": "reset",
    "$store.state.Player.playState": "setStatus"
  }
};
</script>

<style scoped>
#lyrics {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 64px;
  background-color: rgb(246, 246, 246);
  z-index: 10;
  overflow-x: hidden;
  overflow-y: auto;
}
.songInfos {
  width: 100%;
  height: 510px;
}
.blurImg {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 525px;
  text-align: center;
  overflow: hidden;
}
.blurImg img {
  width: auto;
  height: 100%;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  -webkit-filter: blur(100px) opacity(40%);
  filter: blur(100px) opacity(40%);
}
button.zoomIn {
  width: 35px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  outline: none;
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 4px;
  border: none;
  box-shadow: 0 0 1px #666;
  background-color: #fafafa;
  cursor: pointer;
  z-index: 12;
}
button.zoomIn .iconfont {
  font-weight: bold;
  color: #666;
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
.songInfos {
  width: 980px;
  margin: 0 auto;
}
.song-subInfos {
  width: 980px;
  margin: 30px auto 0;
  padding: 0 46px;
  position: relative;
  z-index: 1;
}
.song-subInfos .comments {
  float: left;
  width: 510px;
}
.song-subInfos .simulate {
  float: right;
  width: 320px;
}
.song-subInfos .item-title {
  line-height: 36px;
  border-bottom: 1px solid #ddd;
}
.song-subInfos .item-title h2 {
  font-size: 20px;
  font-weight: normal;
  color: #333;
  border-bottom: 3px solid #ddd;
  float: left;
}
.song-subInfos .item-title label {
  font-size: 12px;
  color: #999;
  line-height: 36px;
  margin-left: 10px;
}
.songlist {
  padding: 10px 0;
  color: #777;
}
.songlist li {
  line-height: 30px;
  font-size: 12px;
}

.songlist li:hover {
  background-color: #f0f0f0;
}

.songlist li .iconfont {
  width: 20px;
  font-size: 12px;
  color: #888;
}
.songlist li .name {
  width: 220px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.songlist li .name span {
  color: #777;
}
.songlist li .singer {
  width: 70px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
}
.disk {
  height: 462px;
  width: 510px;
  position: relative;
  padding: 0 46px;
}
.lyricCont {
  width: 460px;
  padding: 30px 46px 0 0;
}
.disk .pics {
  width: 314px;
  height: 314px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 100%;
  box-shadow: 0 0 40px #333;
}
.disk .pics .mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: block;
}
.disk .pics .pic {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 100%;
  width: 210px;
  height: 210px;
}
.rotating {
  -webkit-animation: rotates linear 20s infinite;
  animation: rotates linear 20s infinite;
}

@-webkit-keyframes rotates {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(360deg);
  }
}
@keyframes rotates {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
