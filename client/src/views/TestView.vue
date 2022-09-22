<template>
    <div v-if="!loading">
        <!-- <Observer @intersecting="lazyImgLoad" :loading="loading" :hasMore="hasMore">
            <template v-slot:observerList="ob">
                <img v-for="(post) in posts" :key="post._id" :ref="ob.lastRef" :data-src="post.imageUrls[0]" />
            </template>
        </Observer> -->
        <img v-lazyload v-for="(post) in posts" :key="post._id"  :data-url="post.imageUrls[0]" />
    </div>
</template>

<script>
// import useScroll from '../utils/useInfiniteScroll';
import Observer from '@/utils/Observer.vue';
import axios from 'axios';

export default {
    data() {
        return {
            arr: Array(20).fill(0).map((v, i) => i + 1),
            posts: [],
            loading: false,
            hasMore: true,
            last: null,
        };
    },
    components: {
        Observer,
    },
    methods: {
        // lastIndex(index) {
        //     if (index === this.arr.length - 1)
        //         console.log(index);
        //     return index === this.arr.length - 1 ? "trigger" : "";
        // },
        // loadMore() {
        //     this.loading = true;
        //     const length = this.arr.length;
        //     const add = Array(20).fill(length).map((v, i) => v + i + 1);
        //     this.arr = [...this.arr, ...add];
        //     this.loading = false;
        // }
        async getPosts() {
            this.loading = true;
            const response = await axios.get('http://localhost:5000/api/posts');
            this.posts = response.data.posts;
            // this.hasMore = false;
            this.loading = false;
        },
        lazyImgLoad(target) {
            const { src } = target.dataset;
            target.src = src;

        }
    },
    async created() {
        this.getPosts();
    },
    components: { Observer }
}
</script>

<style>
div {
    height: 300px;
}

img {
    width: 300px;
    height: 300px;
    margin: 1rem;
}
</style>