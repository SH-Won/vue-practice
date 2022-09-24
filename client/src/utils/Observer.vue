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

    methods: {
        handleScroll(entries, ob) {
            if (entries[0].isIntersecting) {
                this.$emit('intersecting', entries[0].target);
                ob.unobserve(entries[0].target);
            }
        },
        lastRef(el) {
            if (!el || this.loading) return;
            if (!this.loading && this.hasMore) {
                this.observer = new IntersectionObserver(this.handleScroll, { threshold: 0, rootMargin: '0px' });
                this.observer.observe(el.$el);
            }
        }
    },


}
</script>

<style>

</style>