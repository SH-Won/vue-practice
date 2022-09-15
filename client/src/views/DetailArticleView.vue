<template>
    <section class="detail-article">

        <div class="ql-content" v-html="article.data">
        </div>
    </section>


</template>

<script>
import { getDetailArticle } from '@/services/article';

const DetailArticleView = {
    name: 'DetailArticleView',
    data() {
        return {
            articleId: this.$route.params.id,
            article: {},
        }
    },
    mounted: async function () {
        const article = await getDetailArticle(this.articleId);
        this.article = article[0];
    }

}
export default DetailArticleView;
</script>

<style>
@import '../styles/highlight.css';
.detail-article{
    width:92%;
    margin:0 auto;
}
</style>