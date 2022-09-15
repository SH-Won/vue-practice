<template>
    <section>
        <ArticleList v-if="!loading" :articles="articles"/>
        <div v-else>로딩중입니다</div>
    </section>
</template>

<script>

import { getArticles } from "@/services/article";
import ArticleList from '@/components/Article/ArticleList.vue'

const LandingView = {
    name:'LandingView',
    data() {
        return {
            articles: [],
            articleSize: 0,
            loading : true,

        }
    },
    mounted: async function () {
        this.loading = true;
        const response = await getArticles();
        this.articles = response.posts;
        this.articleSize = response.postSize;
        this.loading = false;
    },
    components : {
        ArticleList,
    }


}
export default LandingView;
</script>

<style>

</style>