import * as articleAPI from "@/services/article";
// initialState
const state = () => ({
  articles: [],
  article: {},
  articleSize: 0,
  hasMore: true,
  loading: true,
});

//getters

const getters = {
  calcTime(state) {
    const createdAt = state.article.createdAt;
    const date = new Date(createdAt).toLocaleString("ko-KR").split(". ");
    return `${date[0]}년 ${date[1]}월 ${date[2]}일 ${date[3]}`;
  },
};
// mutations
const mutations = {
  setPath(state, path) {
    this.path = path;
  },
  setArticle(state, article) {
    state.article = article;
  },
  setArticles(state, payload) {
    const { articles, hasMore } = payload;
    state.articles = [...state.articles, ...articles];
    state.hasMore = hasMore;
  },
  reset(state) {
    state.articles = [];
    state.hasMore = true;
  },
};
// actions
const actions = {
  async moveTab({ commit, state, dispatch }, params) {
    commit("reset");
    await dispatch("getArticles", params);
  },
  getArticles: async ({ commit, state }, params) => {
    state.loading = true;
    const response = await articleAPI.getArticles(params);
    const payload = {
      articles: response.posts,
      hasMore: response.postSize >= params.limit,
    };
    commit("setArticles", payload);
    state.loading = false;
  },
  getDetailArticle: async ({ commit, state }, articleId) => {
    try {
      const article = await articleAPI.getDetailArticle(articleId);
      commit("setArticle", article[0]);
    } catch (e) {}
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
