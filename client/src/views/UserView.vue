<template>
    <div>User page</div>
</template>

<script>
import { mapState } from 'vuex';

export default {

    computed: {
        ...mapState('user', {
            user: state => state.user,
        })
    },

    created() {
        console.log(this.user);
    }

}
</script>

<style>

</style>