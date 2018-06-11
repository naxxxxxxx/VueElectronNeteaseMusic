<template>
  <div id="discovery">
      <div class="headerControl">
        <ul>
          <li v-for="title in subTitle" v-bind:key="title.key">
            <router-link :to="title.link">{{title.name}}</router-link>
          </li>
        </ul>
      </div>
      <div class="childItem">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      itemIndex: 1,
      subTitle: [
        {
          name: "推荐",
          key: 1,
          link: "/main/discovery/tuijian"
        },
        {
          name: "排行榜",
          key: 2,
          link: "/main/discovery/paihang"
        },
        {
          name: "歌单",
          key: 3,
          link: "/main/discovery/gedan/0"
        },
        {
          name: "主播电台",
          key: 4,
          link: "/main/discovery/zhubo"
        },
        {
          name: "最新音乐",
          key: 5,
          link: "/main/discovery/zuixin"
        }
      ]
    };
  }
};
</script>

<style>
#discovery .headerControl {
  height: 44px;
  line-height: 44px;
  text-align: center;
  border-bottom: 1px solid rgb(216, 216, 216);
}
#discovery .headerControl li {
  display: inline;
}
#discovery .headerControl li a {
  padding: 0 30px;
  font-size: 14px;
  color: rgb(69, 69, 69);
  cursor: default;
  text-decoration: none;
}
#discovery .headerControl li a:hover,
#discovery .headerControl li a.router-link-active {
  color: rgb(180, 47, 47);
}
#discovery .childItem {
  padding: 20px 30px;
}
</style>
