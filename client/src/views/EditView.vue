<template>
    <div class="edit-container">
        <PageLoading v-show="isLoading" explain="업로드 중이예요!"
            :styles="{position : 'absolute', height:'100%', opacity:0.7, zIndex : 100}" />
        <TitleCategoryForm>
            <input v-model="title" />
            <select v-model="category">
                <option value="0">선택</option>
                <option v-for="language in languages" :key="language._id" :value="language._id">{{language.name}}
                </option>
            </select>
        </TitleCategoryForm>
        <QuillEditor ref="quill" :content="article.data" />

        <div class="user-buttons">
            <StyledButton :name="isModify ? '수정' : '확인'" :onClick="handleUpload" />
            <StyledButton name="취소" :onClick="handleCancle" />

        </div>
    </div>

</template>

<script>
import { languages, upload } from '@/components/Edit/useQuillUpload';
import TitleCategoryForm from '@/components/Edit/TitleCategoryForm.vue';
import QuillEditor from '@/components/Edit/QuillEditor.vue';
import StyledButton from '@/components/Button.vue';
import PageLoading from '@/components/Loading/PageLoading.vue'
import { mapGetters, mapMutations, mapState } from 'vuex';



export default {
    name: 'editView',

    // props: {
    //     user: {
    //         type: Object,
    //         default() {
    //             return {
    //                 isAuth: false,
    //             }
    //         }
    //     }
    // },
    data() {
        return {
            article: {
                imageIds: [],
            },
            // isModify: false,
            title: '',
            category: 0,
            languages,
            isLoading: false,
        }
    },
    components: {
        TitleCategoryForm,
        QuillEditor,
        StyledButton,
        PageLoading,
    },
    computed: {
        ...mapState('user', {
            user: state => state.user,
        }),
        ...mapState('editArticle', {
            isModify: state => state.isModify,
        })
    },
    methods: {
        // ...mapGetters('user',['getUserState']),
        ...mapGetters('editArticle', ['getEditInfo']),
        ...mapMutations('editArticle', ['resetEditState']),

        async handleUpload() {
            const quill = this.$refs.quill.$refs.myQuillEditor.quill;
            const { title, category, user, isModify, article } = this;

            this.isLoading = true;
            const response = await upload(quill, isModify, title, category, user._id, article);
            if (response.success) {
                this.isLoading = false;
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
        // const { article, isModify } = this.$route.params;
        const { article, isModify } = this.getEditInfo();
        console.log(this.user);
        if (isModify) {
            this.article = article;
            this.title = article.title,
                this.category = article.category;
            // this.isModify = isModify;
        }
    },
    destroyed() {
        this.resetEditState();
    }


}
</script>

<style>
.edit-container {
    position: relative;
    width: 95%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
}

.user-buttons {
    align-self: flex-end;
}
</style>