<template>
    <div class="edit-container">
        <TitleCategoryForm :title="title" :category="category" :languages="languages"
            :handleChangeTitle=" (e)=> handleChangeTitle(e)" :handleSelectLanguage="(e) => handleSelectLanguage(e)" />
        <QuillEditor ref="quill" :content="article.data" />
        <button @click="checkRef"> ref 확인 </button>
        <div class="user-buttons">
            <StyledButton name="확인" :onClick="handleUpload" />
            <StyledButton name="취소" :onClick="handleCancle" />

        </div>
    </div>
</template>

<script>
import { languages, upload } from '@/components/Edit/useQuillUpload';
import TitleCategoryForm from '@/components/Edit/TitleCategoryForm.vue';
import QuillEditor from '@/components/Edit/QuillEditor.vue';
import StyledButton from '@/components/Button.vue';



export default {
    name: 'editView',

    props: {
        user: {
            type: Object,
            default() {
                return {
                    isAuth: false,
                }
            }
        }
    },
    data() {
        return {
            article: {
                imageIds: [],
            },
            isModify: false,
            title: '',
            category: 0,
            languages,
        }
    },
    components: {
        TitleCategoryForm,
        QuillEditor,
        StyledButton

    },
    methods: {
        checkRef() {
            const content = this.$refs.quill.$refs.myQuillEditor.quill.root.innerHTML;
            console.log(this.article);
        },
        handleChangeTitle(e) {
            this.title = e.target.value;
        },
        handleSelectLanguage(e) {
            this.category = parseInt(e.target.value);
        },

        async handleUpload() {
            const quill = this.$refs.quill.$refs.myQuillEditor.quill;
            const { title, category, user, isModify, article } = this;
            const response = await upload(quill, isModify, title, category, user._id, article);
            if (response.success) {
                alert('성공적으로 업로드 했습니다');
                this.$router.push('/')
            }


        },
        handleCancle() {
            const confirm = window.confirm('작성한 글이 사라집니다. 취소하시겠어요?');
            if (confirm) {
                this.$router.push('/');
            }
        }

    },
    created() {
        const { article, isModify } = this.$route.params;
        if (article) {
            this.article = article;
            this.title = article.title,
                this.category = article.category;
            this.isModify = isModify;
        }
    }

}
</script>

<style>
.edit-container {
    width: 95%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
}

.user-buttons {
    align-self: flex-end;
}
</style>