<template>
    <nav class="nav">
        
        <span class="nav__logo"><router-link to="/">{{navTitle}}</router-link></span>
        
        <template v-if="!isLogin">
            <div>
                <StyledButton name="로그인" />
                <StyledButton name="회원가입" />
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
export default {
    name: 'NavBar',
    data() {
        return {
            navTitle: 'sh Blog',
            navItems: [

            ],
            isLogin: false,
        }
    },
    components: {
        StyledButton,
    }

}
</script>

<style>
    
.nav {
    display:flex;
    padding:.5rem 1rem;
    justify-content: space-between;
    align-items: center;
    
}

.nav__logo {
    font-weight: 600;
    font-size:1.5rem;
    transform:rotateZ(-5deg); 
}
.nav__logo > a{
    color:black;
    text-decoration: none;
}
</style>