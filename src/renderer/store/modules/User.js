const state = {
    show: false,
    user: {
        id: 0,
        icon: require('../../assets/icon-user.png'),
        name: '',
        islogin: 0
    }
};

const mutations = {
    UPDATE_USER(state, user) {
        state.user = user;
    },
    SHOW_LOGIN(state) {
        state.show = true;
    },
    HIDE_LOGIN(state) {
        state.show = false;
    }
};

const actions = {
    updateUser(context) {
        context.commit('UPDATE_USER', user)
    }
};

export default {
    state,
    mutations,
    actions
}