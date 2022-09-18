<template>
    <div class="article-info">
        <input :value="title" @change="handleChangeTitle($event)" />
        <select :value="category" @change="handleSelectLanguage($event)">
            <option value="0">선택</option>
            <option v-for="language in languages" :key="language._id" :value="language._id">{{language.name}}</option>

        </select>
    </div>


</template>

<script>

export default {
    name: 'titleCategoryForm',
    props: {
        title: String,
        category: Number,
        languages: Array,
        handleChangeTitle: Function,
        handleSelectLanguage: Function,
    }
}
</script>

<style>
.article-info {
    display: flex;
    justify-content: space-between;

}

.article-info>input {
    width: 70%;
    font-size: 1.1rem;
    padding: 0.3rem;

}

.article-info>option {
    width: 10%;

}
</style>