function getApi(str) {
  return 'http://localhost:3000' + str
}

const apiPath = {
  TJSongLists: getApi('/personalized'), //推荐-热门精选歌单列表
  TJNewSongList: getApi('/personalized/newsong'), //推荐新音乐
  SongContent: getApi('/playlist/detail?id='), //歌单内容
  SongDetail: getApi('/music/url?id='), //歌曲详情 id
  SongLyricDetail: getApi('/song/detail?ids='), //歌曲歌词详情
  SongComment: getApi('/comment/music?limit=30&id='), //歌曲评论
  SimiSong: getApi('/simi/song?id='), //获取相似音乐
  SimiUser: getApi('/simi/user?id='), //获取最近 5 个听了这首歌的用户
  Banner: getApi('/banner'), //推荐banner
  Login: getApi('/login/cellphone?'), //登录
  UserInfo: getApi('/user/detail?uid='), //获取用户信息
  CommentsList: getApi('/comment/playlist?id='), //获取歌单评论
  LikeComment: getApi('/comment/like?'), //给评论点赞
  PaiHang: getApi('/top/list?idx='), //排行榜
  GeDans: getApi('/top/playlist?limit=30&order=new&cat='), //歌单
  Newest: getApi('/top/playlist?order=new&cat='), //歌单,
  NewDisk: getApi('/top/album?'), //新碟推荐
  PlaylistType: getApi('/playlist/catlist'), //歌单分类
  HotPlaylist: getApi('/playlist/hot'), //热门歌单分类
  Dynamic: getApi('/user/event?uid='), //获取用户动态
  Follows: getApi('/user/follows?uid='), //获取用户关注列表
  Followed: getApi('/user/followeds?uid='), //获取用户粉丝数
  Events: getApi('/event'), //获取动态列表
  DianTai: {
    Catelist: getApi("/dj/recommend/"), //电台 - 分类
    Types: getApi("/dj/recommend/type?type"), //电台 - 分类推荐
  }
};

export default apiPath;