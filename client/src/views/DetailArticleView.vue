<template>
    <section class="detail-article">
        <div class="detail-article__info">
            <h1>{{article.title}}</h1>
            <time>{{calcTime}}</time>
        </div>
        <StyledButton name="좋아요" :styles="buttonStyle" />
        <StyledButton v-if="isUserArticle" name="수정" :styles="buttonStyle" :onClick="editArticle" />
        <StyledButton v-if="isUserArticle" name="삭제" :styles="buttonStyle" />
        <div class="ql-content" v-html="article.data">
        </div>
    </section>


</template>

<script>
import { getDetailArticle } from '@/services/article';
import StyledButton from '@/components/Button.vue';

const DetailArticleView = {
    name: 'DetailArticleView',
    data() {
        return {
            articleId: this.$route.params.id,
            article: {},
            isUserArticle: false,
            buttonStyle: {
                'alignSelf': 'flex-end',
            },
        }
    },
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
    components: {
        StyledButton
    },

    computed: {
        calcTime() {
            const createdAt = this.article.createdAt;
            const date = new Date(createdAt).toLocaleString('ko-KR').split('. ');
            return `${date[0]}년 ${date[1]}월 ${date[2]}일 ${date[3]}`;
        },
        //     isUserArticle(){
        //      console.log('article',this.article);
        //      console.log('user',this.user)
        //      return this.article.writer._id === this.user._id;
        //    },

    },
    methods: {
        editArticle() {
            const params = {
                isModify: true,
                article: this.article,
            };
            this.$router.push({
                name: "edit",
                params,
            })
        },

    },

    async created() {
        const article = await getDetailArticle(this.articleId);
        this.article = article[0];
        this.isUserArticle = this.article.writer._id === this.user._id;

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