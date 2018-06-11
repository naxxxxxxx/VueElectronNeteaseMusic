<template>
  <div id="infoList">
      <table class="table">
          <thead>
              <tr>
                  <th class="item"></th>
                  <th class="control">操作</th>
                  <th class="title">音乐标题</th>
                  <th>歌手</th>
                  <th>专辑</th>
                  <th class="time">时长</th>
              </tr>
          </thead>
          <tbody>
            <tr v-for="(item,key) in prTracks" :key="key" v-on:click="changeClass(key)" :class="key===selectedIndex?'active':''" v-on:dblclick="playSong(item)">
                <td>{{(key+1+'').length > 1 ? key+1 : "0"+(key+1)}}</td>
                <td><span class="iconfont icon-love"></span><span class="iconfont icon-download1"></span></td>
                <td>{{item.name}}<span class="sub">{{item.alias.length===0 ? "" : "("+item.alias[0]+")"}}</span></td>
                <td>{{item.artists[0].name}}</td>
                <td>{{item.album.name}}</td>
                <td>{{((parseInt(item.duration/1000/60)+"").length > 1 ? parseInt(item.duration/1000/60) : "0"+parseInt(item.duration/1000/60)) + ":" + ((parseInt(item.duration/1000)%60 + "").length > 1 ? parseInt(item.duration/1000)%60 : ("0" + parseInt(item.duration/1000)%60)) }}</td>
            </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
export default {
  name: "list",
  props: ["tracks"],
  data() {
    return {
      selectedIndex: -1
    };
  },
  computed: {
    prTracks() {
      return this.tracks;
    }
  },
  methods: {
    changeClass(index) {
      this.selectedIndex = index;
    },
    playSong(item) {
      this.$store.commit("PLAYMUSIC",item);
    }
  }
};
</script>

<style>
#infoList,
#infoList table {
  width: 100%;
  font-size: 12px;
  border-collapse: collapse;
  text-align: left;
  color: #888;
}
#infoList table {
  table-layout: fixed;
  word-wrap: break-word;
}
#infoList thead {
  border-bottom: 1px solid rgb(210, 210, 210);
}
#infoList thead th {
  border: 1px solid rgb(210, 210, 210);
}
#infoList thead th:first-of-type,
#infoList thead th:last-of-type {
  border-left: none;
}
#infoList thead th.item {
  width: 50px;
}
#infoList thead th.control {
  width: 58px;
}
#infoList thead th.title {
  width: 325px;
}
#infoList thead th.time {
  width: 88px;
}
#infoList td,
#infoList th {
  padding: 7px 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#infoList tbody tr td:first-of-type {
  text-align: right;
}
#infoList tbody tr:nth-child(odd) {
  background-color: #f3f3f3;
}

#infoList tbody tr td:nth-child(3),
#infoList tbody tr td:nth-child(4),
#infoList tbody tr td:nth-child(5) {
  color: rgb(51, 51, 51);
}
#infoList .sub {
  color: #888 !important;
}
#infoList tbody tr.active {
  background-color: #e1e1e1;
}
#infoList td span {
  margin: 0 4px;
  font-size: 12px;
}
</style>
