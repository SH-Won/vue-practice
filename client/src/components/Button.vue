<template>
    <button class="styled-button" :style="styles" @click="onClick">{{name}}</button>
</template>

<script>
export default {
    name: 'StyledButton',
    props: {
        name: String,
        onClick: {
            type: Function,
            default: () => {

            }
        },
        styles: {
            type: Object,
            default: () => {

            }
        }
    },
}
</script>

<style>
.styled-button {
    padding: 8px;
    margin: 8px;
    border-radius: 0.6rem;
    background-color: #d5f7e7;
    color: #015834;
    border: none;
    cursor: pointer;
}
</style>