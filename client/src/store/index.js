import Vue from "vue";
import Vuex from "vuex";
import Articles from "./modules/articles";
import User from "./modules/user";
import EditArticle from "./modules/editArticle";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    articles: Articles,
    user: User,
    editArticle: EditArticle,
  },
});
