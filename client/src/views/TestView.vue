<template>
    <Observer @loadmore="loadMore">
        {{arr.join('')}}
        <div v-for="(num,index) in arr" :key="num" :ref="arr.length -1 === index && 'trigger'">{{num}}</div>
    </Observer>
</template>

<script>
import Observer from '@/utils/Observer.vue';
export default {
    components: { Observer },
    data() {
        return {
            arr: Array(20).fill(0).map((v, i) => i + 1),

        }
    },
    methods: {
        lastIndex(index) {
            if (index === this.arr.length - 1) console.log(index);
            return index === this.arr.length - 1 ? 'trigger' : ''
        },
        loadMore() {
            const length = this.arr.length;
            const add = Array(20).fill(length).map((v, i) => v + i + 1);
            this.arr = [...this.arr, ...add];
        }
    },

}
</script>

<style>

</style>