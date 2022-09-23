<template>
    <section class="detail-article">
        <template v-if="!pageLoading">
            <div class="detail-article__info">
                <h1>{{article.title}}</h1>
                <time>{{calcTime}}</time>
            </div>
            <UserFavoriteCountButton :initialCount="article.favoriteCount" :user="getUserState" :article="article" />
            <StyledButton v-if="getIsUserArticle" name="수정" :styles="buttonStyle" :onClick="handleEditArticle" />
            <StyledButton v-if="getIsUserArticle" name="삭제" :styles="buttonStyle" :onClick="handleDeleteArticle" />
            <div class="ql-content" v-html="article.data">
            </div>
        </template>
        <template v-else>
            <PageLoading />
        </template>
    </section>


</template>

<script>
import { deleteArticle, getDetailArticle } from '@/services/article';
import StyledButton from '@/components/Button.vue';
import UserFavoriteCountButton from '@/components/DetailArticle/UserFavoriteCountButton.vue';
import PageLoading from '@/components/Loading/PageLoading.vue';
import { loginBus } from '@/EventBus/EventBus';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

const DetailArticleView = {
    name: 'DetailArticleView',
    data() {
        return {
            pageLoading: false,
            articleId: this.$route.params.id,
            // article: {},
            isUserArticle: false,
            buttonStyle: {
                'alignSelf': 'flex-end',
            }
        }
    },
    // props: {
    //     user: {
    //         type: Object,
    //         default() {
    //             return {
    //                 isAuth: false,
    //             }
    //         }
    //     }
    // },
    components: {
        StyledButton,
        UserFavoriteCountButton,
        PageLoading
    },

    computed: {

        // calcTime() {
        //     const createdAt = this.article.createdAt;
        //     const date = new Date(createdAt).toLocaleString('ko-KR').split('. ');
        //     return `${date[0]}년 ${date[1]}월 ${date[2]}일 ${date[3]}`;
        // },
        ...mapState('articles', {
            article: state => state.article,
        }),
        ...mapGetters('articles', ['calcTime']),
        ...mapGetters('user', ['getUserState', 'getIsUserArticle']),

    },
    methods: {
        ...mapMutations('editArticle', ['setEditInfo']),
        handleEditArticle() {
            console.log(this.article);
            this.setEditInfo(true);
            this.$router.push('/edit');
            // this.$router.push({
            //     name: "edit",
            //     params,
            // })
        },
        async handleDeleteArticle() {
            const confirm = window.confirm('정말 삭제 하시겠어요?');
            if (!confirm) return;
            const params = {
                _id: this.article._id,
                imageIds: this.article.imageIds,
            }
            const response = await deleteArticle(params);
            if (response.success) {
                alert('성공적으로 삭제 했습니다');
                this.$router.push('/');
            }

        },
        ...mapActions('articles', ['getDetailArticle'])


    },

    async created() {
        loginBus.$on('login', isLogin => {
            if (!isLogin) {
                console.log(isLogin);
            }
        })


        this.pageLoading = true;
        await this.getDetailArticle(this.articleId);

        // console.log(this.article);
        // this.isUserArticle = this.article.writer._id === this.user._id;
        this.pageLoading = false;

    },

}
export default DetailArticleView;
</script>

<style>
@import '../styles/highlight.css';

.detail-article {
    max-width: 1100px;
    width: 92%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

.detail-article__info {
    display: inherit;
    flex-direction: inherit;
}

.detail-article__info>time {
    align-self: flex-end;
    font-size: .6rem;
}
</style>