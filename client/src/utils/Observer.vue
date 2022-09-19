<template>
    <div>
        <slot :lastRef="lastRef"></slot>
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
        hasMore: Boolean,
        loading: Boolean
    },
    methods: {
        handleScroll(entries, ob) {
            if (entries[0].isIntersecting) {
                console.log(entries[0].target);
                this.$emit('intersecting');
                ob.unobserve(entries[0].target);
            }
        },
        lastRef(el) {
            console.log(el);
            if (!el || this.loading) return;
            if (el && this.hasMore) {

                this.observer = new IntersectionObserver(this.handleScroll, { threshold: 0.8 });
                this.observer.observe(el.$el);
            }
        }
    },
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