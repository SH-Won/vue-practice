<template>
    <section class="landing-section">
        <Observer v-if="!pageLoading" :hasMore="hasMore" :loading="loading" @intersecting="loadArticles">
            <template v-slot:observerList="ob">
                <ArticleList :articles="articles" :lastRef="ob.lastRef" />
            </template>
            <template v-slot:loadingComponent>
                <PageLoading />
            </template>
        </Observer>
        <PageLoading v-else />
    </section>
</template>

<script>

import ArticleList from '@/components/Article/ArticleList.vue'
import PageLoading from "@/components/Loading/PageLoading.vue";
import Observer from "@/utils/Observer.vue";
import { mapActions, mapState } from "vuex";



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
        },
    },
    data() {
        return {
            path: null,
            pageLoading: false,
            skip: 0,
            limit: 4,
        }
    },
    computed: {
        ...mapState('articles', {
            articles: state => state.articles,
            loading: state => state.loading,
            hasMore: state => state.hasMore,
        })
    },

    methods: {
 
        goEditPage() {
            this.$router.push('/edit');
        },

        ...mapActions('articles', [
            'getArticles',
            'moveTab',
        ]),
        async loadArticles() {
            
            const params = {
                skip: this.skip,
                limit: this.limit,
                category: this.path === '/' ? 'popular' : '',
            }
            this.getArticles(params);
            this.skip = this.skip + this.limit;
        }

    },

    watch: {
        '$route.path'(to, from) {
            if (to !== from) {
                console.log('route change')
                this.path = to;
                
                const params = {
                    skip: 0,
                    limit: this.limit,
                    category: this.path === '/' ? 'popular' : '',
                }
                this.skip = this.limit;
                this.moveTab(params);
            }



        }
    },

    async created() {

        this.path = this.$route.path;
        this.pageLoading = true;
        this.loadArticles();
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