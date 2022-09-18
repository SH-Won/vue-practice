import { auth } from "@/services/user";
import Vue from "vue";
import PageLoading from '@/components/Loading/PageLoading';
export default function Auth(Component, isNeedLogin) {
  return Vue.component("withAuth", {
    data() {
      return {
        user: {},
        isLoading : true,
      };
    },

    async created() {
      try {
        this.isLoading  = true;
        const response = await auth();
        const { user, token, refreshToken } = response;
        if (!user.isAuth) {
          if (isNeedLogin) {
            this.$router.push("/login");
          } else {
            this.user = user;
          }
        } else {
          localStorage.setItem("token", token);
          localStorage.setItem("refreshToken", refreshToken);
          this.user = user;
        }
        this.isLoading = false;
      } catch (e) {}
    },
    render(createElement) {
      const {isLoading}  = this;
      return !isLoading ? createElement(Component, {
        props: {
          user: this.user,
        },
      }) : createElement(PageLoading);
    },
  });
}
