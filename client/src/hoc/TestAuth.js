
import Vue from "vue";
import PageLoading from '@/components/Loading/PageLoading';
import { mapActions, mapGetters } from "vuex";
export default function Auth(Component, isNeedLogin) {
  return Vue.component("withAuth", {
    data() {
      return {
        isLoading : true,
      };
    },
    
    methods : {
        ...mapActions('user',['auth']),
        ...mapGetters('user',['getUserState']),
    },

    async created() {
      try {
        this.isLoading  = true;
        await this.auth();
        const user = this.getUserState();

        if (!user.isAuth) {
          if (isNeedLogin) {
            this.$router.push("/login");
          } else {

          }
        } else {
          
        }
        this.isLoading = false;
      } catch (e) {}
    },
    render(createElement) {
      const {isLoading}  = this;
      return !isLoading ? createElement(Component) : createElement(PageLoading);
    },
  });
}
