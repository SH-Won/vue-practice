<template>
    <section class="user-container">
        <h1 :style="{marginLeft : '2rem'}">내가 좋아요 누른 게시글</h1>
        <Observer v-if="!pageLoading" :loading="loading" :hasMore="hasMore" @intersecting="loadFavoriteArticle">
            <template v-slot:observerList="ob">
                <div class="list__wrapper">
                    <SingleArticle v-for="(article,index) in userFavoriteArticles" :key="article._id + index"
                        :ref="index === userFavoriteArticles.length -1  && ob.lastRef" :article="article">
                        <UserFavoriteCountButton :article="article" />
                    </SingleArticle>
                </div>
            </template>
            <template v-slot:loadingComponent>
                <PageLoading />
            </template>
        </Observer>
        <PageLoading v-else />
    </section>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import Observer from '@/utils/Observer.vue';
import SingleArticle from '@/components/Article/SingleArticle.vue';
import UserFavoriteCountButton from '@/components/DetailArticle/UserFavoriteCountButton.vue';
import PageLoading from '@/components/Loading/PageLoading.vue';



export default {
    data() {
        return {
            pageLoading: true,
            skip: 0,
            limit: 4,
        };
    },
    computed: {
        ...mapState("user", {
            user: state => state.user,
        }),
        ...mapState("articles", {
            userFavoriteArticles: state => state.userFavoriteArticles,
            loading: state => state.loading,
            hasMore: state => state.hasMore,
        }),

    },
    methods: {
        ...mapMutations("articles", ["resetUserFavoriteArticles"]),
        ...mapActions("articles", ["getUserFavoriteArticles"]),
        async loadFavoriteArticle() {
            const params = {
                articleIds: this.user.favorite.slice(this.skip, this.skip + this.limit),
                limit: this.limit,
            };
            await this.getUserFavoriteArticles(params);
            this.skip = this.skip + this.limit;
        }
    },
    async created() {

        this.pageLoading = true;
        // if (this.userFavoriteArticles.length) {
        //     this.skip = this.userFavoriteArticles.length;
        // }
        // else {
        //     await this.loadFavoriteArticle();
        // }
        await this.loadFavoriteArticle();
        this.pageLoading = false;
    },
    destroyed() {
        this.resetUserFavoriteArticles();
    },
    components: { Observer, SingleArticle, UserFavoriteCountButton, PageLoading, PageLoading }
}
</script>

<style>
.user-container {}

.list__wrapper {
    display: flex;
    flex-wrap: wrap;

}
</style>