<template>
    <div class="app">
        <Menu></Menu>
        <router-view></router-view>
    </div>
</template>

<script>
import Menu from './components/Menu'
export default {
    name: 'app',
    components: {
        Menu
    }
};

</script>

<style scoped lang="stylus">
.app
    width auto

</style>
