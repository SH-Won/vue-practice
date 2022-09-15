import { auth } from "@/services/user";
import LoginView from "@/views/LoginView";
import Vue from "vue";
export default function Auth(Component,name,isNeedLogin) {
    return async () => {
        console.log('render');
            try{
                const response = await auth();
                const {user,token,refreshToken} = response;
                console.log(user);
                console.log(h);
                if(!user.isAuth){
                    console.log('true')
                    console.log('isNeedLogin',isNeedLogin);
                    if(isNeedLogin){
                        return Component;
                    }
                    else {
                        console.log('need not login')
                        return Component;
                    }
                }else{
                    console.log('true')
                    localStorage.setItem('token',token);
                    localStorage.setItem('refreshToken',refreshToken);
                    return Component;

                }
                
            }catch(e){

            } 

    } 

}