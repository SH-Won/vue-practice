<template>
    <article class="article" @click="goDetailArticleView(article._id)">
        <figure class="article__img-container">
            <img v-lazyload :data-url="article.thumbnail" class="article__img" />
        </figure>

        <div class="article__info">
            <h2>{{article.title}}</h2>
        </div>
        <slot></slot>

    </article>

</template>

<script>
export default {
    name: 'SingleArticle',
    props: {
        article: Object,
    },
    methods: {
        goDetailArticleView(articleId) {
            this.$router.push(`/article/${articleId}`);
        }
    },

}
</script>

<style>
a {
    text-decoration: none;
    width: 100%;
    color: black;
}

.article {
    background-color: #fff;
    margin: 0.8rem;
    flex: 0 0 calc((100% - (0.8rem * 8)) / 4);
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    cursor: pointer;
    align-items: center;
    z-index: 5;
    /* box-shadow: .2rem .2rem .3rem #aaebcb; */
    box-shadow: rgb(0 0 0 / 7%) 0px 4px 16px 0px;
    box-sizing: border-box;
    overflow: hidden;
    transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
}

.article:hover {
    cursor: pointer;
    box-shadow: rgb(0 0 0 / 20%) 0px 4px 16px 0px;
}

.article__img-container {
    position: relative;
    padding-top: 70%;
    width: 100%;
    margin: 0;
}

.article__img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.article__info {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.article__info>h2 {
    width: 200px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    -ms-text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
}

@media screen and (max-width: 500px) {
    .article {
        margin: 1rem;
        flex: 0 0 calc((100% - (1rem * 2)));
    }
}

@media screen and (max-width: 680px) and (min-width: 501px) {
    .article {

        flex: 0 0 calc((100% - (0.8rem * 4)) / 2);
    }
}

@media screen and (max-width: 850px) and (min-width: 681px) {
    .article {
        flex: 0 0 calc((100% - (0.8rem * 6)) / 3);
    }
}
</style>