<template>
    <div id="app">
        <data-page msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
import DataPage from './pages/data.vue'

export default {
    name: 'App',
    components: {
        DataPage,
    },
}
</script>
