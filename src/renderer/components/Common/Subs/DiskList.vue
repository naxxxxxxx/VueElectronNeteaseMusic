<template>
    <div id="playList">
        新碟列表
    </div>
</template>
<script>
import axios from "axios";
import apiPath from "../../../utils/api";
import { error } from "util";

export default {
  name: "DiskList",
  props: ["disklist", "subType"],
  data() {
    return {
      list: []
    };
  },
  created() {
    this.$options.methods.getList(this);
  },
  methods: {
    changeType() {
      const _this = this;
      this.getList(_this);
    },
    getList(_this) {
      axios.get(apiPath.NewDisk + "offset=0&limit=100").then(
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  watch: {
    disklist: "changeType",
    subType: "changeType"
  }
};
</script>
<style scoped>
</style>

