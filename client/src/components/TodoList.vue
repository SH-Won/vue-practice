<template>
    <ul class="list">
        <li class="list__item" v-for="(el,index) in todos" :key="index">{{el.todo}}
            <button @click="click(index)">삭제</button>
        </li>
    </ul>


</template>

<script>
export default {
    props: {
        todos: Array,
        click: Function
    }
}
</script>

<style>
.list {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
    font-size: 1.2rem;
    width: 75%;

}

.list__item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid greenyellow;
    padding:.5rem;
    border-radius: 1rem;
    margin:.4rem;
}

.list__item>button {
    border-radius: 4px;
    outline: none;
    border: transparent;
    color: black;
    background-color: rgb(244, 148, 146);
    font-size:inherit;
    cursor: pointer;
}
</style>