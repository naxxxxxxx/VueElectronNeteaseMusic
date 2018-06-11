<template>
 <div id="footer">
     <div class="f-control">
         <div class="prev f-control-item iconfont icon-skip-previous-circle"></div>
         <div class="main f-control-item">
           <div class="iconfont" :class="isPlaying?'icon-pause1':'icon-play'" v-on:click="changePlayStatus"></div>
         </div>
         <div class="next f-control-item iconfont icon-skip-next-circle"></div>
     </div>
     <div class="f-duration-line">
       <div class="f-duration-line-animation" ref="progressBar">
         <div class="red" :style="width"></div>
         <div class="label" :style="position"></div>
       </div>
       <div class="f-duration-line-timer">{{titok}}/{{timer}}</div>
     </div>
     <audio :src="audioSrc" autoplay ref="playAudio" id="PrivateAudio" class="hiddenAudio" loop></audio>
     <!-- <div class="f-other">
       <div class="f-o-item volumn-control"></div>
       <div class="f-o-item play-mode"></div>
       <div class="f-o-item s-rlt">词</div>
       <div class="f-o-item s-num">30</div>
     </div> -->
  </div> 
</template>

<script>
// import { mapState } from "vuex";
import axios from "axios";
import apiPath from "../../utils/api";

export default {
  name: "footerBar",
  data() {
    return {
      audioSrc: "",
      music: {},
      isPlaying: false,
      timer: "00:00",
      titok: "00:00",
      position: "left:0%",
      width: "width:0%",
      interVal: null
    };
  },

  watch: {
    "$store.state.Player.musicId": "playAudio",
    "$store.state.Player.playState": "setPlayStatus",
    "$store.state.Player.timer": "setTimer"
  },

  methods: {
    changePlayStatus() {
      //改变音乐播放状态
      let audio = this.$refs.playAudio;
      if (audio.getAttribute("src") === "") {
        return false;
      }

      if (audio.paused) {
        audio.play();
        // this.$store.commit("PLAY_STATE_TRUE");
        this.$store.dispatch("playMusic");
      } else {
        audio.pause();
        this.$store.dispatch("pauseMusic");
        // this.$store.commit("PLAY_STATE_FALSE");
      }
    },
    conversion(value) {
      let minute = Math.floor(value / 60);
      minute = minute.toString().length === 1 ? "0" + minute : minute;
      let second = Math.round(value % 60);
      second = second.toString().length === 1 ? "0" + second : second;
      return `${minute}:${second}`;
    },

    playAudio(id) {
      const _this = this;
      _this.titok = "00:00";
      if (this.interVal !== null) clearInterval(this.interVal);
      if (id !== 0) {
        axios.get(apiPath.SongDetail + id).then(
          res => {
            let returnData = res.data.data[0];
            let audio = _this.$refs.playAudio;

            _this.music = returnData;
            _this.audioSrc = returnData.url;

            audio.onloadedmetadata = () => {
              _this.titok = _this.$options.methods.conversion(
                audio.currentTime
              );
              _this.$refs.progressBar.addEventListener("click", function() {});
            };

            audio.onended = () => {
              clearInterval(this.interVal);
            };

            _this.interVal = setInterval(() => {
              _this.titok = _this.$options.methods.conversion(
                audio.currentTime
              );
              _this.position =
                "left:" +
                audio.currentTime / audio.duration.toFixed(3) * 100 +
                "%";
              _this.width =
                "width:" +
                audio.currentTime / audio.duration.toFixed(3) * 100 +
                "%";
            }, 300);
          },
          error => {
            console.log(error);
          }
        );
      }
    },
    setPlayStatus() {
      this.isPlaying = this.$store.state.Player.playState;
    },
    setTimer() {
      this.timer = this.$store.state.Player.timer;
    }
  }
};
</script>

<style>
#footer {
  height: 64px;
  position: absolute;
  line-height: 64px;
  bottom: 0;
  width: 100%;
  background-color: rgb(246, 246, 246);
  border-top: 1px solid rgb(216, 216, 216);
  display: flex;
  flex-direction: row;
  z-index: 11;
}
#footer .f-control {
  color: #d70000;
  text-align: center;
  position: relative;
  text-align: center;
  padding: 0 20px;
}
#footer .f-control .f-control-item {
  display: inline-block;
  margin: 0 7px;
}
#footer .f-control .f-control-item.prev {
}
#footer .f-control .f-control-item.main {
}
#footer .f-control .f-control-item.next {
}
#footer .f-control .iconfont {
  font-size: 38px;
}
#footer .f-control .icon-pause1 {
  font-size: 43px;
}

#footer .f-duration-line {
  position: relative;
  flex: 1;
}
#footer .f-duration-line .f-duration-line-animation {
  height: 14px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 15px;
  right: 105px;
}
#footer .f-duration-line .f-duration-line-animation::before,
#footer .f-duration-line .f-duration-line-animation .red {
  width: 100%;
  height: 4px;
  position: absolute;
  display: block;
  top: 5px;
  content: "";
  background-color: rgb(177, 177, 177);
  border-radius: 2px;
  z-index: 1;
}
#footer .f-duration-line .f-duration-line-animation .red {
  background-color: #d70000;
  z-index: 1;
  width: 0%;
  transition: width 0.4s;
}
#footer .f-duration-line .f-duration-line-animation .label {
  width: 14px;
  height: 14px;
  background-color: #d70000;
  border-radius: 14px;
  border: 5px solid #fff;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 1px #000;
  z-index: 2;
  left: 0%;
  transition: left 0.4s;
}
#footer .f-duration-line .f-duration-line-timer {
  width: 70px;
  top: 50%;
  position: absolute;
  right: 30px;
  text-align: right;
  font-size: 13px;
  transform: translateY(-50%);
  font-weight: bold;
  color: #aaa;
}
.f-other {
  width: 304px;
  padding: 0 30px;
}
.hiddenAudio {
  display: none;
}
</style>



