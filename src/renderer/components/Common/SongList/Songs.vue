<template>
  <div id="songs">
    <div class="playInfo">
      <div class="playInfo-avatar">
        <img :src="detail.coverImgUrl" alt="">
      </div>
      <div class="playInfo-detail">
        <div class="playInfo-header">
          <div class="playInfo-header-main">
            <div class="title">
              <span>歌单</span>
              <h1>{{detail.name}}</h1>
            </div>
            <div class="creator">
              <img :src="creator.avatarUrl" :id="creator.userId">
              <label>{{creator.nickname}}</label>
              <span>{{createTime}}创建</span>
            </div>
          </div>
          <div class="playInfo-header-sub">
            <div>
              歌曲数<br/>
              <b>{{detail.trackCount}}</b>
            </div>
            <div>
              收听数<br/>
              <b>{{playCount}}</b>
            </div>
          </div>
        </div>

        <div class="btnControl">
          <button><i class="iconfont icon-play"></i>播放全部</button>
          <button class="plus"></button>
          <button><i class="iconfont icon-favorites"></i>已收藏({{detail.subscribedCount}})</button>
          <button><i class="iconfont icon-share"></i>分享({{detail.shareCount}})</button>
          <button><i class="iconfont icon-download1"></i>下载全部</button>
        </div>

        <div class="subInfos" :class="spride?'active':''">
          <div><b>标签：</b><span v-html="tag"></span></div>
          <div v-if="description!==null"><b>简介：</b><pre>{{description}}</pre></div>
          <label v-if="description!==null" class="arrow iconfont" :class="spride?'icon-iconarrowup':'icon-iconarrowdown01'" @click="showHideInfo"></label>
        </div>
      </div>
    </div>
    <div class="info-list">
      <div class="info-list-title">
        <router-link v-for="tab in subTab" v-bind:key="tab.key" :to="tab.path">
          {{tab.name}} {{tab.name==='评论'?('('+detail.commentCount+')'):''}}
        </router-link>
      </div>
      <div class="info-list-content">
        <router-view :tracks="detail.tracks" :playlistid="listID"></router-view>
      </div>
    </div>
    <Loading v-if="!loaded" />
  </div>
</template>

<script>
import axios from "axios";
import apiPath from "../../../utils/api";
import moment from "moment";

export default {
  name: "songList",
  data() {
    return {
      listID: this.$route.params.id,
      detail: {},
      creator: {},
      playCount: 0,
      createTime: 0,
      tag: "",
      spride: 0,
      description: "",
      loaded: false,
      subTab: [
        {
          path: "/main/songlist/" + this.$route.params.id + "/list",
          name: "歌曲列表"
        },
        {
          path: "/main/songlist/" + this.$route.params.id + "/comment",
          name: "评论"
        },
        {
          path: "/main/songlist/" + this.$route.params.id + "/collector",
          name: "收藏者"
        }
      ]
    };
  },

  mounted() {
    const _this = this;
    //获取歌单列表
    axios.get(apiPath.SongContent + _this.$route.params.id).then(
      res => {
        let count = res.data.result.playCount + "";
        let des = res.data.result.description;
        _this.detail = res.data.result;
        _this.creator = res.data.result.creator;
        count = count.length > 4 ? parseInt(count / 10000) + "万" : count;
        _this.playCount = count;
        _this.createTime = moment(res.data.result.createTime).format(
          "YYYY-MM-DD"
        );
        _this.description = des;
        let tags = res.data.result.tags;
        let finalTags = "";
        for (let i = 0; i < tags.length; i++) {
          finalTags +=
            "<a href='/#/main/discovery/gedan/" +
            tags[i] +
            "'>" +
            tags[i] +
            "</a>" +
            " / ";
        }
        _this.tag = finalTags.substr(0, finalTags.length - 3);
        _this.loaded = true;
      },
      error => {
        console.log(error);
      }
    );
  },
  methods: {
    showHideInfo() {
      this.spride = !this.spride;
    }
  }
};
</script>

<style>
@import "layout";
</style>
