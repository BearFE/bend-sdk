<template>
    <Menu class="menu" mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem name="1">
            <router-link :to="{name: 'proxy'}">
                <Icon type="md-sync" />
                proxy
            </router-link>
        </MenuItem>
        <MenuItem name="2">
            <router-link :to="{name: 'stat'}">
                <Icon type="md-trending-up" />
                stat
            </router-link>
        </MenuItem>
    </Menu>
</template>
<script>
    export default {
        data() {
            return {
                theme1: 'light'
            };
        }
    };
</script>
<style lang="stylus">
.ivu-menu
    .ivu-menu-item-active,
    .ivu-menu-item:hover,
    .ivu-menu-submenu-active,
    .ivu-menu-submenu:hover
        border none!important

    .ivu-menu-item
        font-size 20px

    a
        line-height 3
        display inline-block

.router-link-exact-active
    color red

    &:hover
        color red
</style>
