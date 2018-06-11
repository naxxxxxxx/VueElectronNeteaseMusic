const state = {
  musicId: 0,
  playState: false,
  timer: '00:00',
  song: {
    name: '',
    singer: '',
    pic: ''
  }
};

const mutations = {
  CHANGE_SONG_ID(state, id) {
    state.musicId = id;
  },
  PLAY_STATE_TRUE(state) {
    state.playState = true;
  },
  PLAY_STATE_FALSE(state) {
    state.playState = false;
  },
  SET_TIMER_NUM(state, timer) {
    state.timer = timer;
  },
  SET_SONG(state, song) {
    state.song = song;
  },
  PLAYMUSIC(state, item) {
    let timer =
      ((parseInt(item.duration / 1000 / 60) + "").length > 1 ?
        parseInt(item.duration / 1000 / 60) :
        "0" + parseInt(item.duration / 1000 / 60)) +
      ":" +
      ((parseInt(item.duration / 1000) % 60 + "").length > 1 ?
        parseInt(item.duration / 1000) % 60 :
        "0" + parseInt(item.duration / 1000) % 60);
    let song = {
      name: item.name,
      singer: item.singer || item.artist || item.artists[0].name,
      pic: item.pic || item.album.picUrl
    };
    state.musicId = item.id;
    state.timer = timer;
    state.song = song;
    state.playState = true;
  },
  PLAYMUTIMUSIC(state, playlist) {

  }
};

const actions = {
  changeSongId(context) {
    context.commit('CHANGE_SONG_ID', id)
  },
  playMusic(context) {
    context.commit('PLAY_STATE_TRUE')
  },
  pauseMusic(context) {
    context.commit('PLAY_STATE_FALSE')
  },
  setTimer(context) {
    context.commit('SET_TIMER_NUM')
  },
  setSong(context) {
    context.commit('SET_SONG')
  },
  playMusic(context) {
    context.commit('PLAYMUSIC')
  }
};

export default {
  state,
  mutations,
  actions
}