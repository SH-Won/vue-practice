import * as userAPI from "@/services/user";

const state = () => ({
  isLogin: localStorage.getItem("loginSuccess"),
  user: {
    isAuth: false,
  },
  prevRoutePath: null,
  currentViewArticle: {},
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
});

const getters = {
  getUserState(state) {
    return state.user;
  },
  getIsUserArticle(state, getters, rootState) {
    return state.user._id === rootState.articles.article.writer._id;
  },
  getUserEditInfo(state) {},
};

const mutations = {
  setIsLogin(state, isLogin) {
    localStorage.setItem("loginSuccess", isLogin);
    state.isLogin = isLogin;
  },
  setUser(state, user) {
    state.user = user;
  },
  setToken(state, { token, refreshToken }) {
    state.token = token;
    state.refreshToken = refreshToken;
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
  },
  setPrevRoutePath(state, prevRoutePath) {
    state.prevRoutePath = prevRoutePath;
  },
  setEditInfo(state, payload) {
    const { isModify, article } = payload;
    state.currentViewArticle = article;
    state.isModify = isModify;
  },
};

const actions = {
  async auth({ commit, state }) {
    try {
      const response = await userAPI.auth();
      const { user, token, refreshToken } = response;
      commit("setToken", { token, refreshToken });
      commit("setUser", user);
    } catch (e) {}
  },
  async loginUser({ commit, state }, params) {
    try {
      const response = await userAPI.loginUser(params);
      const { loginSuccess, token, refreshToken } = response;
      commit("setToken", { token, refreshToken });
      commit("setIsLogin", loginSuccess);
    } catch (e) {}
  },
  async logoutUser({ commit, state }) {
    try {
      const response = await userAPI.logOutUser();
      commit("setToken", { token: "", refreshToken: "" });
      commit("setIsLogin", false);
      commit("setUser", {});
    } catch (e) {}
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
