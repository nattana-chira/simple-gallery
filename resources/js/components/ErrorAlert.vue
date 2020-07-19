<template>
    <div>
        <p v-for="(error, i) in errors" :key="i" class="alert alert-danger">
            {{ error }}
        </p>
    </div>
</template>

<script>
    export default {
        props: {
            errors: Array
        }
    }
</script>
