<template>
    <div id="todoApp">
        <TodoInput :value="inputValue" :change="writeTodo" :click="createTodo"/>
        <TodoList :todos="todos" :click="deleteTodo" />
    </div>
</template>

<script>

import TodoList from "@/components/TodoList.vue";
import TodoInput from "@/components/TodoInput.vue";


const TodoApp = {
    data() {
        return {
            inputValue: '',
            todos: [],
            edit : false,
            
        }
    },
    methods: {
        writeTodo(e){
             this.inputValue = e.target.value;
             console.log(this.inputValue)
        },
        deleteTodo(index) {
            this.todos.splice(index, 1);
        },
        createTodo(todo) {
            const length = this.todos.length;
            this.todos.push({ id: length + 1, todo });
            this.inputValue = '';
        },
        editTodo(){

        }


    },
    components: {
        TodoList,
        TodoInput
    }
}
export default TodoApp;

</script>

<style >
    #todoApp{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

</style>

