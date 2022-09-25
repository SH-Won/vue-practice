import * as articleAPI from "@/services/article";
// initialState
const state = () => ({
  articles: [],
  article: {},
  articleSize: 0,
  userFavoriteArticles: [],
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
  setUserFavoriteArticles(state, payload) {
    const { articles, hasMore } = payload;
    state.userFavoriteArticles = [...state.userFavoriteArticles, ...articles];
    state.hasMore = hasMore;
  },
  resetUserFavoriteArticles(state) {
    state.userFavoriteArticles = [];
    state.hasMore = true;
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
  deleteArticle: async ({ commit, state }) => {
    try {
      const confirm = window.confirm("정말 삭제 하시겠어요?");
      if (!confirm) return;
      const params = {
        _id: state.article._id,
        imageIds: state.article.imageIds,
      };
      const response = await articleAPI.deleteArticle(params);
      if (response.success) {
        alert("성공적으로 삭제 했습니다");
      }
    } catch (e) {}
  },
  getUserFavoriteArticles: async ({ commit, state }, params) => {
    try {
      commit("setLoading", true);
      const { articles, articleSize } =
        await articleAPI.getUserFavoriteArticles(params.articleIds);
      console.log(articles);
      const payload = {
        articles,
        hasMore: articleSize >= params.limit,
      };
      commit("setUserFavoriteArticles", payload);
      commit("setLoading", false);
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
