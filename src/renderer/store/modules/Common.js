const state = {
  showLyric: false
};

const mutations = {
  SHOW_LYRIC(state) {
    state.showLyric = true;
  },
  HIDE_LYRIC(state) {
    state.showLyric = false;
  }
};

const actions = {
  showLyric(context) {
    context.commit('SHOW_LYRIC')
  },
  hideLyric(context) {
    context.commit('HIDE_LYRIC')
  }
};

export default {
  state,
  mutations,
  actions
}