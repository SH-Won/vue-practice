<template>
    <div class="editor-container">
        <quill-editor ref="myQuillEditor" :options="options" />
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import { options, uploadMulter } from './useQuillOptions';

export default {
    name: 'quilleditor',
    components: {
        quillEditor,

    },
    props: {
        content: {
            type: String,
            default: '',
        }
    },
    data() {
        return {
            options,
        }
    },
    mounted() {
        const quill = this.$refs.myQuillEditor.quill;

        if (this.content) {
            const delta = quill.clipboard.convert(this.content);
            quill.setContents(delta);
        }
        quill.getModule('toolbar').addHandler('image', () => {
            uploadMulter(quill);
        });

    }

}
</script>

<style>
@import 'quill/dist/quill.snow.css';
@import '../../styles/quill.css';

.editor-container {
    width: 100%;
    margin: 0 auto;
}
</style>