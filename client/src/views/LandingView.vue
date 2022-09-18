<template>
    <section class="landing-section">
        <ArticleList v-if="!loading" :articles="articles" />
        <PageLoading v-else />
    </section>
</template>

<script>
import { getArticles } from "@/services/article";
import ArticleList from '@/components/Article/ArticleList.vue'
import PageLoading from "@/components/Loading/PageLoading.vue";

const LandingView = {
    name: 'LandingView',
    props: {
        user: {
            type: Object,
            default() {
                return {
                    isAuth: false,
                }
            }
        }
    },
    data() {
        return {
            articles: [],
            articleSize: 0,
            loading: true,

        }
    },
    methods: {
        goEditPage() {
            this.$router.push('/edit');
        }

    },
    mounted: async function () {
        this.loading = true;
        const response = await getArticles();
        this.articles = response.posts;
        this.articleSize = response.postSize;
        this.loading = false;
    },
    components: {
        ArticleList,
        PageLoading
    }


}
export default LandingView;
</script>

<style>
.landing-section {

    background-color: #f5f5f5;
}
</style>