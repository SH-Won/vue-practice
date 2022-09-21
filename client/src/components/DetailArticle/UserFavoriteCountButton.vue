<template>
    <button :class="getClassName" @click="handleFavorite"> 좋아요 {{count}}</button>
</template>

<script>
import { updateFavorite } from '../../services/user';
export default {

    props: {
        initialCount: Number,
        article: Object,
        user: {
            type: Object,
            default() {
                return {
                    _id: null,
                    isAuth: false,
                }
            }
        }
    },
    data() {
        return {
            count: this.initialCount,
            isClicked: this.user.favorite.includes(this.article._id),
        }
    },
    computed: {
        getAsyncData() {
            this.count = this.initialCount;
            return {
                initialCount: this.count,
                article: this.article,
            }
        },
        getClassName() {
            console.log('class')
            return this.isClicked ? 'detail-article__favoriteBtn act' : 'detail-article__favoriteBtn'
        }

    },
    methods: {
        async handleFavorite() {
            if (!this.user._id) {
                alert('로그인이 필요해요');
                return;
            }
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
}
</script>

<style>
.detail-article__favoriteBtn {
    margin: 1rem;
    padding: .7rem .5rem;
    align-self: flex-end;
    background-color: #d8cbcb;
    border-radius: 1rem;
    color: #797777;
    border: transparent;
    transition: background .5s;
    cursor: pointer;

}

.detail-article__favoriteBtn:hover {
    transform: scale(1.1);
}

.detail-article__favoriteBtn.act {
    background-color: #8fe9a3;
    color: #173815;

}
</style>