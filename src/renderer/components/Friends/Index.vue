<template>
  <div id="friends">
      <NotSigned v-if="!isLogin" />
      <Signed v-if="isLogin" />
  </div>
</template>
<script>

import NotSigned from "./Sub/NotLoginYet";
import Signed from "./Sub/Signed";

export default {
  name: "friends",
  components: { NotSigned, Signed },
  data() {
    return {
      isLogin: this.$store.state.User.user.islogin
    };
  },
  watch: {
    "$store.state.User.user": "setLogin"
  },
  methods: {
    setLogin() {
      this.isLogin = this.$store.state.User.user.islogin;
    }
  }
};
</script>
<style scoped>
#friends {
  width: 100%;
  height: 100%;
}
</style>
