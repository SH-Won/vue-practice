<template>
    <button :class="getClassName" @click="handleFavorite($event)"> 좋아요 {{count}}</button>
</template>

<script>
import { mapState } from 'vuex';
import { updateFavorite } from '../../services/user';
export default {

    props: {
        article: {
            type: Object,
        }

    },

    data() {
        return {
            count: this.article.favoriteCount,
            isClicked: null,
        }
    },
    computed: {
        ...mapState('user', {
            user: state => state.user,
        }),
        // ...mapState('article',{
        //    article : state => state.article, 
        // }),

        getClassName() {
            return this.isClicked ? 'detail-article__favoriteBtn act' : 'detail-article__favoriteBtn'
        }

    },
    methods: {
        async handleFavorite(e) {
            if (!this.user._id) {
                alert('로그인이 필요해요');
                return;
            }
            e.stopPropagation();
            const diffCount = this.isClicked ? -1 : 1;
            const params = {
                userId: this.user._id,
                articleId: this.article._id,
                count: diffCount,
            };
            const response = await updateFavorite(params);
            if (response.success) {
                this.count = this.count + diffCount;
                this.isClicked = !this.isClicked;
            }
        },
    },
    created() {
        this.isClicked = this.user.isAuth ? this.user.favorite.includes(this.article._id) : false;
        // this.count = this.article.favoriteCount;
    }
}
</script>

<style>
.detail-article__favoriteBtn {
    margin: 1rem;
    padding: .7rem .5rem;
    align-self: flex-end;
    background-color: #fff;
    border-radius: 1rem;
    color: #797777;
    border: .5px solid #797777;
    transition: background .5s;
    cursor: pointer;
    z-index: 100;

}

/* .detail-article__favoriteBtn:hover {
    transform: scale(1.1);
} */
.detail-article__favoriteBtn:active {
    transform: scale(0.8);
}

.detail-article__favoriteBtn.act {
    background-color: #2c8cda;
    border: transparent;
    color: #fff;

}
</style>