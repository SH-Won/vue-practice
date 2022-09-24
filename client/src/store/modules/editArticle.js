const state = () => ({
  isModify: false,
  article: null,
});

const getters = {
  getEditInfo(state, getters, rootState) {
    return {
      isModify: state.isModify,
      article: rootState.articles.article,
    };
  },
};

const mutations = {
  resetEditState(state) {
    state.isModify = false;
    state.article = null;
  },
  setEditInfo(state, isModify) {
    state.isModify = isModify;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
