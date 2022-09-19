<template>
    <div>
        <div v-for="(num,index) in arr" :key="num" :ref="arr.length -1 === index && last">{{num}}</div>
    </div>
</template>

<script>
import useScroll from '../utils/useInfiniteScroll';

export default {

    data() {
        return {
            arr: Array(20).fill(0).map((v, i) => i + 1),
            loading: false,
            hasMore: true,
            last: null,

        }
    },
    methods: {
        lastIndex(index) {
            if (index === this.arr.length - 1) console.log(index);
            return index === this.arr.length - 1 ? 'trigger' : ''
        },
        loadMore() {
            this.loading = true;
            const length = this.arr.length;
            const add = Array(20).fill(length).map((v, i) => v + i + 1);
            this.arr = [...this.arr, ...add];
            this.loading = false;
        }
    },
    mounted() {
        console.log(this.last);
        this.last = useScroll(this.loading, this.hasMore, this.loadMore);
    }

}
</script>

<style>

</style>