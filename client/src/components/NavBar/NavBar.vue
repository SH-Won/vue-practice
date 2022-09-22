<template>
    <nav class="nav">
        <span class="nav__logo">
            <router-link to="/">{{navTitle}}</router-link>
        </span>
        <template v-if="!isLogin">
            <div class="nav__toggle">
                <UserSvg :width="20" :height="20" />
                <div class="nav__toggle-list">
                    <StyledButton name="로그인" :onClick="() => routeChange('/login')" />
                    <StyledButton name="회원가입" :onClick="() => routeChange('/register')" />
                </div>
            </div>

        </template>
        <template v-else>
            <div class="nav__toggle">
                <UserSvg :width="20" :height="20" />
                <div class="nav__toggle-list">
                    <StyledButton name="글쓰기" :onClick="() => this.$router.push('/edit')" />
                    <StyledButton name="로그아웃" :onClick="handleLogOut" />
                </div>
            </div>
        </template>
    </nav>

</template>

<script>
import StyledButton from '@/components/Button.vue'
import { loginBus } from '@/EventBus/EventBus';
import { logOutUser } from '@/services/user';
import UserSvg from './UserSvg.vue';

export default {
    name: 'NavBar',
    data() {
        const loginSuccess = localStorage.getItem('loginSuccess');
        return {
            navTitle: 'sh Blog',
            navItems: [

            ],
            isLogin: loginSuccess,
            isOpen: false,
        }
    },
    methods: {
        routeChange(path) {
            this.$router.push(path);
        },
        handleToggle() {
            this.isOpen = !this.isOpen;
        },
        async handleLogOut() {
            try {
                const response = await logOutUser();
                if (response.success) {
                    alert('안전하게 로그아웃 했습니다');
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('loginSuccess');
                    loginBus.$emit('login', false);
                }

            } catch (e) {

            }
        }
    },
    components: {
        StyledButton,
        UserSvg,
    },
    created() {
        loginBus.$on('login', payload => {
            this.isLogin = payload;
        })

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
    /* max-height: 0; */
    /* height:100%; */
    max-height: 200px;
    background-color: #fff;
    outline: none;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    z-index: 10;
    overflow: hidden;
    transform: scale(0);
    /* transition: max-height .5s; */
    transition: transform .5s;
}

.nav__toggle:hover>.nav__toggle-list {
    max-height: 100px;
    transform: scale(1);
}

.nav__toggle-list:hover {
    /* max-height: 100px; */
    transform: scale(1);
}

.nav__toggle-list.act {
    max-height: 100px;
}
</style>