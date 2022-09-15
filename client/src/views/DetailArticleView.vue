<template>
    <section class="detail-article">
        <div class="detail-article__info">
            <h1>{{article.title}}</h1>
            <time>{{calcTime()}}</time>
        </div>
        <StyledButton :onClick="handleClick" name="좋아요" :styles="buttonStyle" />
        <StyledButton name="수정" />
        <StyledButton name="삭제" />
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
            buttonStyle: {
                'alignSelf': 'flex-end',
            },
        }
    },
    methods: {
        calcTime() {
            const createdAt = this.article.createdAt;
            const date = new Date(createdAt).toLocaleString('ko-KR').split('. ');
            return `${date[0]}년 ${date[1]}월 ${date[2]}일 ${date[3]}`;
        },
        handleClick() {
            console.log(this.article);
        }
    },
    mounted: async function () {
        const article = await getDetailArticle(this.articleId);
        this.article = article[0];
    },
    components: {
        StyledButton
    }

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