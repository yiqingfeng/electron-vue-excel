<template>
    <div id="app" class="i-container">
        <div class="i-container_aside">
            <nav-sections />
        </div>
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
