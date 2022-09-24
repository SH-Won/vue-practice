import Vue from "vue";
import PageLoading from "@/components/Loading/PageLoading";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default function Auth(Component, isNeedLogin) {
  return Vue.component("withAuth", {
    data() {
      return {
        isLoading: true,
      };
    },
    computed: {
      ...mapState("user", {
        user: (state) => state.user,
      }),
    },

    methods: {
      ...mapActions("user", ["auth"]),
      ...mapMutations("user", ["setPrevRoutePath"]),
      // ...mapGetters("user", ["getUserState"]),
    },

    async created() {
      try {
        this.isLoading = true;
        await this.auth();

        if (!this.user.isAuth && isNeedLogin) {
          this.setPrevRoutePath(this.$route.path);
          this.$router.push("/login");
        }
        this.isLoading = false;
      } catch (e) {}
    },
    render(createElement) {
      const { isLoading } = this;
      return !isLoading ? createElement(Component) : createElement(PageLoading);
    },
  });
}
