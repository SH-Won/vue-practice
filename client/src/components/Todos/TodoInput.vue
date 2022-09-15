<template>
    <div class="todo__input">
        <input type="text" :value="value" @change="change($event)" />
        <button @click="click(value)">할일 추가</button>
    </div>
</template>

<script>
export default {
    props: {
        value: String,
        click: Function,
        change : Function
    }

}
</script>

<style>
    .todo__input {
        width:80%;
        max-width:400px;
        display:flex;
        justify-content: space-around;
    }
    .todo__input > input {
        width:75%;
        max-width: 300px;
        font-size:1.1rem;
        border-radius: 4px;
        border : .5px solid gray;
        padding:.4rem
    }
    .todo__input > button {
        border-radius: 4px;
        outline: none;
        border: transparent;
        color : green;
        background-color: rgb(213, 245, 218);

    }

</style>