<template>
  <div id="main">
      <headerBar />
      <siderBar />
      <div id="viewContent">
        <router-view></router-view>
      </div>
      <transition name="bounce">
        <lyrics v-if="showLyrics" />
      </transition>
      <footerBar />
  </div>
</template>

<script>
import headerBar from "@/components/Common/HeaderBar";
import siderBar from "@/components/Common/SiderBar";
import footerBar from "@/components/Common/FooterBar";
import lyrics from "@/components/Common/Lyrics";
export default {
  name: "mainui",
  components: {
    headerBar,
    siderBar,
    footerBar,
    lyrics
  },
  data() {
    return {
      showLyrics: this.$store.state.Common.showLyric
    };
  },
  methods: {
    toggleLyric() {
      this.showLyrics = this.$store.state.Common.showLyric;
    }
  },
  watch: {
    "$store.state.Common.showLyric": "toggleLyric"
  }
};
</script>

<style scoped>
#main {
  width: 100%;
  height: 100%;
}
.bounce-enter-active {
  transform-origin: 0 100% 0;
  animation: bounce-in 0.4s;
}
.bounce-leave-active {
  transform-origin: 0 100% 0;
  animation: bounce-in 0.4s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>

