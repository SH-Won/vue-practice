<template>
    <div class="article-container">
        <SingleArticle v-for="(article,index) in articles" :key="article.id" :article="article"
            :ref="articles.length - 1 === index && lastRef" />
    </div>
</template>

<script>
import SingleArticle from '@/components/Article/SingleArticle.vue'

export default {
    name: 'ArticleList',
    props: {
        articles: {
            type: Array,
            default: [],
        },
        articleSize: Number,
        lastRef: Function,

    },
    components: {
        SingleArticle,

    },
    mounted() {
        console.log(this.lastRef)
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