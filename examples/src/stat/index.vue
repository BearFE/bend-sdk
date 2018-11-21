<template>
    <div class="stat">
        <h2>使用前，请先配置'src/modules/stat.js'文件prefix的value，即日志服务器api</h2>
        <a href="javascript:void(0)" data-log="{a: 1}">设置data-log属性，点击查看Network，一般用于设置a标签点击log</a>
        <p @click="sendStat">主动点击事件，点击查看Network</p>
        <span>什么效果都没有</span>
    </div>
</template>

<script>
import sdk from '../../../src/index';
export default {
    name: 'log',
    mounted() {
    },
    methods: {
        sendStat() {
            sdk.addStat({test: 'aaa'});
        }
    }
};
</script>

<style scoped lang="stylus">
.stat
    margin 40px
    line-height 3
    font-size 16px
</style>
