<template>
    <nav class="nav">
        <span class="nav__logo">
            <router-link to="/">{{navTitle}}</router-link>
        </span>
        <template v-if="!user.isAuth">
            <div class="nav__toggle" @click="handleToggle">
                <UserSvg :width="20" :height="20" />
                <div :class="getToggleClassName">
                    <StyledButton name="로그인" :onClick="() => routeChange('/login')" />
                    <StyledButton name="회원가입" :onClick="() => routeChange('/register')" />
                </div>
            </div>

        </template>
        <template v-else>
            <div class="nav__toggle" @click="handleToggle">
                <UserSvg :width="20" :height="20" />
                <div :class="getToggleClassName">
                    <StyledButton name="마이페이지" :onClick="() => this.$router.push(`/user/${user._id}`)" />
                    <StyledButton name="글쓰기" :onClick="() => this.$router.push('/edit')" />
                    <StyledButton name="로그아웃" :onClick="logoutUser" />
                </div>
            </div>
        </template>
    </nav>

</template>

<script>
import StyledButton from '@/components/Button.vue'
import { mapActions, mapGetters, mapState } from 'vuex';
import UserSvg from './UserSvg.vue';

export default {
    name: 'NavBar',
    data() {

        return {
            navTitle: 'sh Blog',
            navItems: [

            ],
            isOpen: false,
        }
    },
    computed: {
        getToggleClassName() {
            return this.isOpen ? 'nav__toggle-list act' : 'nav__toggle-list';

        },
        ...mapState('user', {
            user: state => state.user,
        })

    },
    methods: {
        routeChange(path) {
            this.$router.push(path);
        },
        handleToggle() {
            this.isOpen = !this.isOpen;
            console.log('click')
        },
        ...mapActions('user', ['logoutUser']),
    },

    components: {
        StyledButton,
        UserSvg,
    },
}
</script>

<style>
.nav {
    display: flex;
    padding: 1rem 1rem;
    justify-content: space-between;
    align-items: center;


}

.nav__logo {
    font-weight: 600;
    font-size: 1.5rem;
    transform: rotateZ(-5deg);
}

.nav__logo>a {
    color: black;
    text-decoration: none;
}

.nav__toggle {
    position: relative;
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.nav__toggle-list {
    position: absolute;
    top: 30px;
    right: 0;
    width: 100px;
    /* max-height: 200px; */
    max-height: 0px;
    background-color: #fff;
    outline: none;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    z-index: 10;
    overflow: hidden;
    /* transform: scale(0); */
    /* transition: max-height .5s; */
    transition: max-height .5s;
}

.nav__toggle-list.act {
    /* transform : scale(1); */
    max-height: 200px;
}

/* .nav__toggle:active>.nav__toggle-list {
    max-height: 100px;
    height:100%;
    transform: scale(1);
} */

/* .nav__toggle-list:hover {
    max-height: 100px;
    transform: scale(1);
} */

/* .nav__toggle-list.act {
    max-height: 100px;
} */
</style>