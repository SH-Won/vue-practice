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
// import { getArticles } from "@/services/article";
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
            // articles: [],
            // hasMore: true,
            pageLoading: false,
            // loading: false,
            skip: 0,
            limit: 4,
        }
    },
    computed: {
        ...mapState('articles', {
            articles: state => state.articles,
            loading: state => state.loading,
            hasMore: state => state.hasMore,
            // articlesAlias : 'articles',
            // loadingAlias : 'loading',
            // hasMoreAlias : 'hasMore',

        })
        // ...mapState('articles',['articles','loading','hasMore'])

    },

    methods: {
        // reset(path) {
        //     this.path = path,
        //         this.articles = [];
        //     this.hasMore = true,
        //         this.pageLoading = false;
        //     this.loading = false;
        //     this.skip = 0;
        //     this.limit = 4;
        //     this.loadArticles();
        // },
        // reset(path) {
        //     this.path = path,
        //     this.hasMore = true,
        //     this.pageLoading = false;
        //     this.loading = false;
        //     this.skip = 0;
        //     this.limit = 4;

        //     this.getArticles()
        // },
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


        // async loadArticles() {
        //     this.loading = true;
        //     const params = {
        //         skip: this.skip,
        //         limit: this.limit,
        //         category: this.path === '/' ? 'popular' : '',
        //     }
        //     const response = await getArticles(params);
        //     this.articles = [...this.articles, ...response.posts];
        //     this.hasMore = response.postSize >= this.limit;
        //     this.skip = this.skip + this.limit;
        //     this.loading = false;

        // }
    },

    watch: {
        '$route.path'(to, from) {
            if (to !== from) {
                console.log('route change')
                // this.reset();
                // this.loadArticles();
                // this.getArticles();
                this.path = to;
                this.skip = 0;
                // console.log(this.skip, this.path);
                const params = {
                    skip: this.skip,
                    limit: this.limit,
                    category: this.path === '/' ? 'popular' : '',
                }
                this.moveTab(params);
            }



        }
    },


    async created() {
        console.log('created');
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