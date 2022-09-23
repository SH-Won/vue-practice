<template>
    <div class="ob">
        <slot name="observerList" :lastRef="lastRef"></slot>
        <slot v-if="loading" name="loadingComponent"></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            observer: null,
        }
    },
    props: {
        eventName: String,
        hasMore: {
            type: Boolean,
            default: true,
        },
        loading: {
            type: Boolean,
            default: false,
        }
    },
    // computed : {
    //     lastRef(el){
    //         // 왜 computed 로 해결이 됐을까?
    //         return this.last(el);
    //     }
    // },
    methods: {
        handleScroll(entries, ob) {
            if (entries[0].isIntersecting) {
                console.log(entries[0].target, '타겟');
                this.$emit('intersecting', entries[0].target);
                ob.unobserve(entries[0].target);
            }
        },
        lastRef(el) {

            console.log(this.loading);

            if (!el || this.loading) return;
            if (!this.loading && this.hasMore) {
                // console.log(el.$el || el );
                console.log(el.$el, 'target');
                this.observer = new IntersectionObserver(this.handleScroll, { threshold: 0, rootMargin: '0px' });
                this.observer.observe(el.$el);
            }
        }
    },
    updated() {
        // console.log(this.loading, this.hasMore);
    },
    mounted() {
        // console.log(this.loading, this.hasMore);
    }
    // updated() {
    //     if (!this.hasMore || this.loading) return;
    //     this.$nextTick(() => {

    //         console.log(this.$children[0].$refs.lastArticleElement[0].$el, '1');
    //         this.observer.observe(this.$children[0].$refs.lastArticleElement[0].$el)

    //     })
    // },
    // mounted() {
    //     this.observer = new IntersectionObserver(this.handleScroll, { threshold: 0.5 });
    //     console.log(this.$children[0].$refs.lastArticleElement[0].$el)
    //     // this.observer.observe(this.$parent.$refs.trigger[0]);
    //     this.observer.observe(this.$children[0].$refs.lastArticleElement[0].$el)
    // }

}
</script>

<style>

</style>