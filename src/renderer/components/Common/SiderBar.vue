<template>
  <div id="menu">
      <h4>推荐</h4>
      <ul class="menu-item-list">
          <li v-for="item in menu.recommend" :key="item.key">
            <router-link :to="item.path">
              <span class="iconfont" :class="item.icon"></span>
              {{item.name}}
            </router-link>
          </li>
      </ul>
      <h4>我的音乐 <router-link to="/mine" class="pull-right iconfont icon-more"></router-link></h4>
      <ul class="menu-item-list">
          <li v-for="item in menu.mine" :key="item.key">
            <router-link :to="item.path">
              <span class="iconfont" :class="item.icon"></span>
              {{item.name}}
            </router-link>
          </li>
      </ul>
      <h4>创建的歌单 <router-link to="/addfavo" class="pull-right iconfont icon-plus1"></router-link></h4>
      <ul class="menu-item-list">
          <li v-for="item in menu.created" :key="item.key">
            <router-link :to="item.path">
              <span class="iconfont" :class="item.icon"></span>
              {{item.name}}
            </router-link>
          </li>
      </ul>
      <h4><router-link class="menu-item-link" to="/favos">收藏的歌单</router-link></h4>
      <ul class="menu-item-list">
          <li v-for="item in menu.favorite" :key="item.key">
            <router-link :to="item.path">
              <span class="iconfont" :class="item.icon"></span>
              {{item.name}}
            </router-link>
          </li>
      </ul>

      <div class="playSong" v-if="song.name!=''">
          <div class="song-img">
            <label>
              <img :src="song.pic" :alt="song.name">
              <span @click="showLyric"><i class="iconfont icon-zoom-in-o"></i></span>
            </label>
          </div>
          <div class="song-info">
              <h5>{{song.name}}</h5>
              <p>{{song.singer}}</p>
          </div>
          <div class="song-control">
              <label class="iconfont icon-share"></label>
              <label class="iconfont icon-love"></label>
          </div>
      </div>

  </div>
</template>

<script>
export default {
  name: "siderBar",
  mounted() {},
  data() {
    return {
      menu: {
        recommend: [
          {
            path: "/main/discovery",
            icon: "icon-music",
            name: "发现音乐"
          },
          {
            path: "/main/private",
            icon: "icon-broadcast",
            name: "私人音乐"
          },
          {
            path: "/main/movie",
            icon: "icon-television",
            name: "MV"
          },
          {
            path: "/main/friends",
            icon: "icon-friend",
            name: "朋友"
          }
        ],
        mine: [
          {
            path: "/main/itunes",
            icon: "icon-music",
            name: "iTunes音乐"
          },
          {
            path: "/main/download",
            icon: "icon-download1",
            name: "下载的音乐"
          }
        ],
        created: [
          {
            path: "/main/like",
            icon: "icon-love",
            name: "我喜欢的音乐"
          }
        ],
        favorite: []
      },
      song: {
        name: "",
        singer: "",
        picUrl: ""
      }
    };
  },
  watch: {
    "$store.state.Player.song": "setSong"
  },
  methods: {
    setSong() {
      this.song = this.$store.state.Player.song;
    },
    showLyric() {
      this.$store.commit("SHOW_LYRIC");
    }
  }
};
</script>

<style>
#menu {
  position: absolute;
  top: 60px;
  bottom: 64px;
  left: 0;
  width: 200px;
  background-color: rgb(246, 246, 246);
  border-right: 1px solid rgb(216, 216, 216);
}
#menu h4 {
  height: 24px;
  line-height: 24px;
  color: rgb(119, 119, 119);
  font-size: 12px;
  font-weight: normal;
  zoom: 1;
  padding: 0 10px;
}
#menu h4::after,
#menu h4::before {
  content: "";
  display: table;
}
#menu h4::after {
  clear: both;
}
#menu h4 .pull-right {
  float: right;
  font-weight: bold;
  text-decoration: none;
  color: rgb(168, 168, 168);
}
#menu h4 .menu-item-link {
  color: rgb(119, 119, 119);
  text-decoration: none;
}
#menu .menu-item-list {
  margin-bottom: 10px;
}
#menu .menu-item-list li a {
  display: block;
  text-indent: 20px;
  font-size: 13px;
  text-decoration: none;
  color: rgb(65, 65, 65);
  padding: 6px 0;
  position: relative;
  cursor: default;
  font-weight: bold;
}
#menu .menu-item-list li a span {
  margin-right: 8px;
  font-weight: bold;
  font-size: 12px;
}
#menu .menu-item-list li a.router-link-active {
  background-color: rgb(227, 227, 227);
}
#menu .menu-item-list li a.router-link-active::after {
  position: absolute;
  width: 3px;
  height: 66%;
  left: 0;
  background-color: rgb(238, 0, 0);
  content: "";
}
#menu .playSong {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid rgb(216, 216, 216);
  height: 82px;
}
#menu .playSong .song-img {
  width: 60px;
  height: 60px;
  text-align: center;
  position: absolute;
  left: 10px;
  top: 10px;
  background-color: rgb(216, 216, 216);
  border: 1px solid rgb(191, 191, 191);
  border-radius: 4px;
  overflow: hidden;
}
#menu .playSong .song-img label {
  width: 100%;
  height: 100%;
  display: block;
  background: url("../../assets/icon-music.png") no-repeat center center;
  background-size: 90% 90%;
  position: relative;
}
#menu .playSong .song-img label img {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
}
#menu .playSong .song-img label span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: block;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  line-height: 60px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s;
  cursor: pointer;
}
#menu .playSong .song-img label span i {
  font-size: 30px;
  color: #fff;
}
#menu .playSong .song-img label:hover span {
  opacity: 1;
}
#menu .playSong .song-info {
  position: absolute;
  left: 78px;
  width: 90px;
  top: 50%;
  transform: translateY(-50%);
}
#menu .playSong .song-info h5 {
  font-size: 14px;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#menu .playSong .song-info p {
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#menu .playSong .song-control {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
#menu .playSong .song-control label {
  font-size: 13px;
  display: block;
  height: 15px;
  margin-top: 6px;
  font-weight: bold;
  cursor: pointer;
}
</style>
