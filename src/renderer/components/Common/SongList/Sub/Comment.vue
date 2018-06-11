<template>
  <div id="comment">
      <div class="comment-header">
          <div class="textarea" name="comment" contenteditable="true" ref="comment"></div>
          <div class="header-content clearfix">
              <label class="fl iconfont icon-emoji"></label> 
              <label class="fl">@</label>
              <label class="fr">评论</label>
          </div>
      </div>
      <h5 class="comment-list-title" v-if="hotComments.length>0">精彩评论</h5>
      <div class="comment-list" v-if="hotComments.length>0">
          <div class="comment-list-item" v-for="item in hotComments" :key="item.key" :id="item.commentId">
              <img :src="item.user.avatarUrl===''?nullImg:item.user.avatarUrl" :alt="item.user.nickname">
              <div class="comment-list-item-comment">
                <div class="comment-main"><router-link to="/" :data-uid="item.user.userId" class="link">{{item.user.nickname}}:</router-link>{{item.content}}</div>
                <div class="clearfix sub">
                    <div class="fl time">{{formatTime(item.time)}}</div>
                    <div class="fr">
                      <label><span class="iconfont icon-zan" :class="item.liked?'active':''" v-on:click="zan(item)"></span>({{item.likedCount}})</label> | <label>回复</label>
                    </div>
                </div>
              </div>
          </div>
      </div>
      <h5 class="comment-list-title">最新评论({{total}})</h5>
      <div class="comment-list">
          <div class="comment-list-item" v-for="item in comments" :key="item.key" :id="item.commentId">
              <img :src="item.user.avatarUrl===''?nullImg:item.user.avatarUrl" :alt="item.user.nickname">
              <div class="comment-list-item-comment">
                <div class="comment-main"><router-link to="/" :data-uid="item.user.userId" class="link">{{item.user.nickname}}:</router-link>{{item.content}}</div>
                <div class="clearfix sub">
                  <div class="fl time">{{formatTime(item.time)}}</div>
                    <div class="fr">
                      <label><span class="iconfont icon-zan" :class="item.liked?'active':''" v-on:click="zan(item)"></span>({{item.likedCount}})</label> | <label>回复</label>
                    </div>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import apiPath from "../../../../utils/api";
import moment from "moment";

export default {
  name: "comment",
  props: ["playlistid", "songid"],
  data() {
    return {
      hotComments: [],
      comments: [],
      total: 0,
      nullImg: require("../../../../assets/icon-user.png")
    };
  },
  created() {
    if (this.playlistid) {
      axios.get(apiPath.CommentsList + this.playlistid).then(
        res => {
          this.hotComments = res.data.hotComments;
          this.comments = res.data.comments;
          this.total = res.data.total;
        },
        error => {
          console.log(error);
        }
      );
    }

    this.$options.methods.songComment(this);
  },
  methods: {
    getSong() {
      this.songComment(this);
    },
    songComment(_this) {
      if (_this.songid !== undefined && _this.songid !== null) {
        axios.get(apiPath.SongComment + _this.songid).then(
          res => {
            _this.hotComments = res.data.hotComments;
            _this.comments = res.data.comments;
            _this.total = res.data.total;
          },
          error => {
            console.log(error);
          }
        );
      }
    },
    zan(item) {
      let cid = item.commentId;
      let id = this.playlistid;
      let type = 2;

      axios
        .get(
          "http://localhost:3000/comment/like?id=186016&cid=4956438&t=1&type=0"
        )
        .then(
          res => {
            console.log(res.data);
          },
          error => {
            console.log(error);
          }
        );
    },
    formatTime(time) {
      moment.locale("zh-cn");
      let now = moment(time).format("YYYYMMDD");
      return moment(now)
        .startOf("hour")
        .fromNow();
    }
  },
  watch: {
    "$store.state.Player.musicId": "getSong"
  }
};
</script>

<style scoped>
#comment {
  padding: 20px 30px;
  width: 100%;
}

.comment-header {
  border: 1px solid #c8c8c8;
  padding: 10px;
  width: 100%;
}
.comment-header .textarea {
  min-height: 40px;
  max-height: 80px;
  overflow: auto;
  display: block;
  padding: 6px;
  border: 1px solid #c8c8c8;
  width: 100%;
  border-radius: 6px;
  margin-bottom: 10px;
  outline: none;
  font-size: 12px;
  line-height: 14px;
  background-color: #fff;
  word-wrap: break-word;
  word-break: break-all;
}

.header-content {
  line-height: 24px;
  font-size: 16px;
}
.header-content .fr {
  font-size: 12px;
  width: 44px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  border: 1px solid #c8c8c8;
  background-color: #fff;
  color: #333;
  font-weight: bold;
  border-radius: 4px;
}

.header-content .fl {
  font-weight: bold;
  margin-right: 10px;
  cursor: pointer;
}

h5 {
  margin-top: 20px;
  line-height: 30px;
  color: #333;
}

.comment-list .comment-list-item {
  border-top: 1px solid #e8e8e8;
  padding: 14px 0 14px 40px;
  position: relative;
  font-size: 13px;
  line-height: 20px;
  color: #222;
}
.comment-list .comment-list-item img {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  border: 1px solid #ddd;
  background-color: #ddd;
  position: absolute;
  left: 0;
  top: 14px;
}
.comment-list .comment-list-item .link {
  text-decoration: none;
  color: #1b8ee3;
  font-weight: bold;
}

.comment-list .comment-list-item .sub {
  color: #777;
}
.comment-list .comment-list-item .sub .iconfont {
  font-size: 13px;
  margin-right: 4px;
}
.comment-list .comment-list-item .sub .iconfont.active {
  color: #cb0000;
}

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
</style>
