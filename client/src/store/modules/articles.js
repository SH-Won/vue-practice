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
  setLoading(state, result) {
    state.loading = result;
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
    commit("setLoading", true);
    const response = await articleAPI.getArticles(params);
    const payload = {
      articles: response.posts,
      hasMore: response.postSize >= params.limit,
    };
    commit("setLoading", false);
    commit("setArticles", payload);
  },
  getDetailArticle: async ({ commit, state }, articleId) => {
    try {
      const article = await articleAPI.getDetailArticle(articleId);
      commit("setArticle", article[0]);
    } catch (e) {}
  },
  getUserFavoriteArticles: async ({ commit, state }, articleIds) => {
    try {
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
