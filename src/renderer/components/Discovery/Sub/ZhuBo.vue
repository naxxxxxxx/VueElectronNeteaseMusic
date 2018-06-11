<template>
  <div class="subItem" id="zhuBo">
      4
  </div>
</template>

<script>
import axios from "axios";
import apiPath from "../../../utils/api";

export default {
  name: "zhuBo",
  created() {
    axios.get(apiPath.DianTai.Catelist).then(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }
};
</script>

<style>
</style>
