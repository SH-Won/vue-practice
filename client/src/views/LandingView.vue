<template>
    <section class="landing-section">
        <Observer v-if="!pageLoading" :hasMore="hasMore" :loading="loading" @intersecting="loadArticles">
            <ArticleList :articles="articles" />
            <PageLoading v-if="loading" />
        </Observer>
        <PageLoading v-else />
    </section>
</template>

<script>
import { getArticles } from "@/services/article";
import ArticleList from '@/components/Article/ArticleList.vue'
import PageLoading from "@/components/Loading/PageLoading.vue";
import Observer from "@/utils/Observer.vue";


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
            hasMore: true,
            pageLoading: true,
            loading: true,
            skip: 0,
            limit: 4,

        }
    },
    methods: {
        goEditPage() {
            this.$router.push('/edit');
        },

        async loadArticles() {
            this.loading = true;
            const params = {
                skip: this.skip,
                limit: this.limit,
            }
            const response = await getArticles(params);
            this.articles = [...this.articles, ...response.posts];
            this.hasMore = response.postSize >= this.limit;
            this.loading = false;
            this.skip = this.skip + this.limit;

        }


    },
    mounted: async function () {
        await this.loadArticles();
        this.pageLoading = false;
    },
    components: {
        ArticleList,
        PageLoading,
        Observer
    }


}
export default LandingView;
</script>

<style>
.landing-section {

    background-color: #f5f5f5;
}
</style>