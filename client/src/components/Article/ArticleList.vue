<template>
    <div class="article-container">
        <SingleArticle v-for="article in articles" :key="article.id" :article="article" />
    </div>
</template>

<script>
import SingleArticle from '@/components/Article/SingleArticle.vue'

export default {
    name:'ArticleList',
    props: {
        articles: {
            type: Array,
            default: [],
        },
        articleSize: Number
    },
    components: {
        SingleArticle,

    }


}
</script>

<style>
.article-container {
    display: flex;
    flex-wrap: wrap;
    width: 95%;
    margin: 0 auto;
}
</style>