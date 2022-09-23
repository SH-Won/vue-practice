import * as userAPI from '@/services/user';
const state = () => ({
    isLogin : null,
    user:{
        isAuth : false
    },
    prevRoutePath:null,
    token : localStorage.getItem('token'),
    refreshToken : localStorage.getItem('refreshToken'),
})

const getters = {
    getUserState(state){
        return state.user;
    }
};

const mutations = {
    setTokenAndUser(state,payload){
        const {user,token,refreshToken} = payload;
        state.user = user;
        state.token = token;
        state.refreshToken = refreshToken;  
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
    },
    setUser(state,user){
        state.user = user;
    },
    setPrevRoutePath(state,prevRoutePath){
        state.prevRoutePath = prevRoutePath;
    }
}

const actions = {
    async auth({commit,state}){
        try{
        const response = await userAPI.auth();
        commit('setTokenAndUser',response);
        }catch(e){

        }  
    },
    async loginUser({commit,state},params){
        try{
            const response = await userAPI.loginUser(params);
            

        }catch(e){

        }
    }

}

export default {
    namespaced : true,
    state,
    getters,
    mutations,
    actions,
}