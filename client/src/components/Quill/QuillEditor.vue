<template>
    <quill-editor ref="myQuillEditor" :options="options" />
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import { options, ImageBlot, uploadMulter } from './useQuillOptions';

export default {
    name: 'quilleditor',
    components: {
        quillEditor,

    },

    data() {
        return {
            options,

        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        }
    },
    mounted() {
        console.log(this.$refs.myQuillEditor.quill);
        const quill = this.$refs.myQuillEditor.quill;
        quill.getModule('toolbar').addHandler('image', () => {
            uploadMulter(quill);
        })

    }


}
</script>

<style>
@import 'quill/dist/quill.snow.css';
</style>