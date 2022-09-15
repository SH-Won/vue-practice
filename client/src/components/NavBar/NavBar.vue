<template>
    <nav class="nav">

        <span class="nav__logo">
            <router-link to="/">{{navTitle}}</router-link>
        </span>

        <template v-if="!isLogin">
            <div>
                <StyledButton name="로그인" :onClick="() => routeChange('/login')"/>
                <StyledButton name="회원가입" :onClick="() => routeChange('/register')"/>
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
        }
    },
    methods:{
        routeChange(path){
            console.log('navbar to landing')
            this.$router.push(path);
        }
    }, 
    components: {
        StyledButton,
    },
    created(){
        loginBus.$on('login', payload => {
            this.isLogin = payload;
        })

    },
    mounted(){
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
</style>