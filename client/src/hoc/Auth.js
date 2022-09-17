import { auth } from "@/services/user";
import Vue from "vue";
export default function Auth(Component, isNeedLogin) {
  return Vue.component("withAuth", {
    data() {
      return {
        user: {},
      };
    },

    async created() {
      try {
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
      } catch (e) {}
    },
    render(createElement) {
      return createElement(Component, {
        props: {
          user: this.user,
        },
      });
    },
  });
}
