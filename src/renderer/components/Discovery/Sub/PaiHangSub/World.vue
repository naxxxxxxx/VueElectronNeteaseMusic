<template>
    <div class="songItems" id="offical">
        <div class="itemBlock">
          <div class="blockContent hotJx">
            <WordList v-for="item in gedan1" :key="item.key" :music="item"/>
          </div>
        </div>
        <div class="itemBlock">
          <div class="blockContent hotJx">
            <WordList v-for="item in gedan2" :key="item.key" :music="item"/>
          </div>
        </div>
        <div class="itemBlock">
          <div class="blockContent hotJx">
            <WordList v-for="item in gedan3" :key="item.key" :music="item"/>
          </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import apiPath from "../../../../utils/api";
import moment from "moment";
import WordList from "./List_World";

export default {
  name: "offical",
  components: { WordList },
  data() {
    return {
      gedan1: [18, 22, 4, 21, 10, 5],
      gedan2: [6, 19, 8, 9, 7, 20],
      gedan3: [14, 15, 16, 19, 17, 23]
    };
  },
  created() {}
};
</script>
<style scoped>
.songItems {
  zoom: 1;
}
.songItems::after,
.songItems::before {
  content: "";
  display: table;
}
.songItems::after {
  clear: both;
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
</style>
