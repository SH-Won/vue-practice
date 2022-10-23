import { ref } from "vue"

const loading = ref(false);

export const useLoading = () => {

    const setLoading = () => {
        loading.value = !loading.value
    }
    const loadingStart = () => {
        loading.value = true;
    }
    const loadingDone = () => {
        loading.value = false;
    }
    

    return {
        loading,
        loadingStart,
        loadingDone,
    }

}