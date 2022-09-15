<template>
    <div class="login">
        <form class="login__form" @submit.prevent>
            <label for="email">이메일</label>
            <input type="text" name="email" v-model="email" />
            <label for="password">비밀번호</label>
            <input type="password" name="password" v-model="password" />
            <StyledButton name="로그인" :onClick="($event) => login($event)" :styles="buttonStyles" />
        </form>
    </div>
</template>

<script>
import StyledButton from '@/components/Button.vue';
import { loginUser } from '@/services/user';
import { loginBus } from '@/EventBus/EventBus';
export default {
    name: 'loginView',
    data() {
        return {
            email: '',
            password: '',
            buttonStyles: {
                'backgroundColor': 'blue',
                'color': 'white',
                'fontWeight': 500,
                'width': '85%',
                'marginTop': '1rem',
                'fontSize': '1rem',
            }
        }
    },
    methods: {
        login: async function (e) {
            e.preventDefault();
            try {
                const { email, password } = this.$data;
                const params = {
                    email,
                    password,
                }
                const response = await loginUser(params);
                const { loginSuccess, token, refreshToken } = response;
                const storage = localStorage;
                storage.setItem('token', token);
                storage.setItem('refreshToken', refreshToken);
                storage.setItem('loginSuccess', loginSuccess);
                loginBus.$emit('login',loginSuccess);
                this.$router.push('/');
                
            } catch (e) {

            }
        },
        isValidForm() {

        }
    },
    components: {
        StyledButton,
    }

}
</script>

<style>
.login {
    width: 70%;
    max-width: 600px;
    height: 80vh;
    margin: auto;

}


.login__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 350px;
}

.login__form>input {
    padding: .4rem;
    width: 85%;
    font-size: 1rem;
    box-sizing: border-box;
    border-radius: 6px;
    border: .5px solid gray
}

.login__form>label {
    align-self: flex-start;
    margin-left: 1.8em;
    margin-top: .8rem;
}
</style>