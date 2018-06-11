<template>
  <div class="subItem" id="zuiXin">
      <div class="zx-title clearfix">
        <label v-for="item in tabs" :class="selectedIndex===item.key?'active':''" :key="item.key" @click="changeTitle(item.key)">{{item.name}}</label>
      </div>
      <div class="zx-tag-title clearfix">
        <label v-for="item in tags" :class="selectedTagId===item.key?'active':''" :key="item.key" @click="changeTag(item.key)">{{item.name}}</label>
        <div class="subTag fr" v-if="selectedIndex">
          <span v-for="item in subTag" :class="selectedSubTag===item.key?'active':''"  :key="item.key" @click="changeSubTag(item.key)">{{item.name}}</span>
        </div>
      </div> 
      <div class="subMain">
        <PlayList v-if="!selectedIndex" :playlist="tags[selectedTagId]" />
        <DiskList v-if="selectedIndex" :disklist="tags[selectedTagId]" :subType=subTag[selectedSubTag] />
      </div>
  </div>
</template>

<script>
import PlayList from "../../Common/Subs/PlayList";
import DiskList from "../../Common/Subs/DiskList";

export default {
  name: "zuiXin",
  components: {
    PlayList,
    DiskList
  },
  data() {
    return {
      selectedIndex: 0,
      selectedTagId: 0,
      selectedSubTag: 0,
      tabs: [
        {
          name: "新歌速递",
          key: 0
        },
        {
          name: "新碟上架",
          key: 1
        }
      ],
      tags: [
        {
          name: "全部",
          tag: "全部歌单",
          key: 0
        },
        {
          name: "粤语",
          tag: "粤语",
          key: 1
        },
        {
          name: "华语",
          tag: "华语",
          key: 2
        },
        {
          name: "欧美",
          tag: "欧美",
          key: 3
        },
        {
          name: "韩国",
          tag: "韩语",
          key: 4
        },
        {
          name: "日本",
          tag: "日语",
          key: 5
        }
      ],
      subTag: [
        {
          name: "推荐",
          key: 0
        },
        {
          name: "全部",
          key: 1
        }
      ]
    };
  },
  methods: {
    changeTitle(id) {
      this.selectedIndex = id;
      this.selectedTagId = 0;
    },
    changeTag(id) {
      this.selectedTagId = id;
    },
    changeSubTag(id) {
      this.selectedSubTag = id;
    }
  }
};
</script>

<style scoped>
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
.zx-title {
  border: 1px solid #999;
  width: 210px;
  margin: 0 auto 20px;
  line-height: 24px;
  height: 26px;
  border-radius: 4px;
  overflow: hidden;
}
.zx-title label {
  float: left;
  font-size: 12px;
  width: 50%;
  text-align: center;
  display: block;
  font-weight: bold;
  color: #555;
}
.zx-title label:active,
.zx-title label.active {
  background-color: rgb(110, 110, 110);
  color: #fff;
}
.zx-tag-title {
  border-bottom: 1px solid #ddd;
  line-height: 30px;
}
.zx-tag-title label {
  float: left;
  font-size: 16px;
  margin-right: 30px;
  color: #444;
}
.zx-tag-title label.active {
  border-bottom: 3px solid #ddd;
  font-size: 20px;
  color: #000;
}
.subTag {
  margin-top: 5px;
  width: 88px;
  border: 1px solid #999;
  font-size: 12px;
  height: 24px;
  line-height: 24px;
  border-radius: 4px;
  overflow: hidden;
  color: #222;
}
.subTag span {
  float: left;
  width: 50%;
  display: block;
  text-align: center;
}
.subTag span:first-of-type {
  border-right: 1px solid #999;
}
.subTag span:active,
.subTag span.active {
  background-color: rgb(217, 217, 217);
}
.subMain {
  margin-top: 20px;
}
</style>
