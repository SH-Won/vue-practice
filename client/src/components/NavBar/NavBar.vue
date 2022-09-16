<template>
    <nav class="nav">

        <span class="nav__logo">
            <router-link to="/">{{navTitle}}</router-link>
        </span>

        <template>
            <div class="nav__toggle">
                <span class="tog">toggle</span>
                <div class="nav__toggle-list">
                    <StyledButton name="로그인" :onClick="() => routeChange('/login')" />
                    <StyledButton name="회원가입" :onClick="() => routeChange('/register')" />
                </div>
            </div>

        </template>

        <template v-if="!isLogin">
            <div>
                <StyledButton name="로그인" :onClick="() => routeChange('/login')" />
                <StyledButton name="회원가입" :onClick="() => routeChange('/register')" />
            </div>
        </template>
        <template v-else>
            <div>
                <StyledButton name="로그아웃" />
            </div>
        </template>
    </nav>

</template>

<script>
import StyledButton from '@/components/Button.vue'
import { loginBus } from '@/EventBus/EventBus';
export default {
    name: 'NavBar',
    data() {
        const loginSuccess = localStorage.getItem('loginSuccess');
        return {
            navTitle: 'sh Blog',
            navItems: [

            ],
            isLogin: loginSuccess,
            isOpen : false,
        }
    },
    methods: {
        routeChange(path) {
            console.log('navbar to landing')
            this.$router.push(path);
        },
        handleToggle(){
            console.log('toggle')
             this.isOpen = !this.isOpen;
        }
    },
    components: {
        StyledButton,
    },
    created() {
        loginBus.$on('login', payload => {
            this.isLogin = payload;
        })

    },
    mounted() {
        console.log('nav bar');
    }

}
</script>

<style>
.nav {
    display: flex;
    padding: .5rem 1rem;
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
.nav__toggle{
    position:relative;
}
.nav__toggle-list{
    position: absolute;
    top: 45px;
    width:100px;
    max-height:0;
    background-color: #fff;
    outline: none;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    z-index: 10;
    overflow: hidden;
    transition: max-height .5s;
}

.nav__toggle:hover > .nav__toggle-list{
    max-height:100px;
}
.nav__toggle-list:hover{
    max-height: 100px;
}
.nav__toggle-list.act {
    max-height:100px;
}
</style>