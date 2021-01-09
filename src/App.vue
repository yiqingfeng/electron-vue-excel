<template>
    <div id="app" class="i-container">
        <nav-sections class="i-container_aside" />
        <div class="i-container_main">
            <router-view />
        </div>
    </div>
</template>

<script>
import NavSections from '@/views/navs.vue'

export default {
    name: 'App',
    components: {
        NavSections
    }
}
</script>
