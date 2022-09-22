<template>
    <div class="landing">
        <ul class="tab">
            <li class="tab__item" @click="handleChangeTab('/')">인기</li>
            <li class="tab__item" @click="handleChangeTab('/recent')">최신</li>
            <div class="tab__underline" ref="underline" :style="handleTransitionUnderLine(currentPath)"></div>
        </ul>
        <router-view :user="user"></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentPath: this.$route.path,
        }

    },
    props: {
        user: {
            type: Object,
            default() {
                return {
                    isAuth: false,
                }
            }
        }
    },
    computed: {

    },
    methods: {
        handleTransitionUnderLine(path) {

            switch (path) {
                case '/': return {
                    transform: 'translate3d(0%,0,0)',
                }
                case '/recent': return {
                    transform: 'translate3d(100%,0,0)'
                }
            }
        },
        handleChangeTab(path) {
            if (this.currentPath === path) return;
            this.currentPath = path;
            this.$router.push(path);
        }

    },
    created() {
        console.log(this.$store);
    }

}
</script>

<style>
.landing {
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
}

.tab {
    width: 150px;
    position: relative;
    display: flex;
    list-style: none;
    margin: 1rem;
    padding: 0;
}

.tab__item {
    width: 50%;
    padding: .5rem;
    font-size: 1.2rem;
    text-align: center;
    cursor: pointer;
}

.tab__underline {
    width: 50%;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    background-color: #79e9ba;
    transition: transform .5s linear;

}
</style>