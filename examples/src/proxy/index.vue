<template>
    <div class="proxy">
        <div>
            <span>转发url</span>
            <Input class="inp" v-model="url" placeholder="使用之前请配置'src/proxy/index.vue'文件20行，this.proxyApi的value"/>
        </div>
        <div class="log">
            <Button type="primary" @click="sendGet">发送get请求</Button>
            <Button type="primary" @click="sendPost">发送post请求</Button>
        </div>

         <Input v-model="response" type="textarea" :rows="4" placeholder="response" />
    </div>
</template>

<script>
/**
 * @file 测试页面
 * @author bEnd
 */
import sdk from '../../../src/index';
export default {
    name: 'http',
    data() {
        return {
            url: 'proxy',
            response: ''
        };
    },
    methods: {
        sendGet() {
            sdk.proxy.get(this.url,
                {
                    params: {
                        ext: 'extData'
                    }
                }
            ).then(res => {
                this.response = JSON.stringify(res);
            });
        },
        sendPost() {
            sdk.proxy.post(this.url,
                {
                    params: {
                        ext: 'extData'
                    }
                }
            ).then(res => {
                this.response = JSON.stringify(res);
            });
        }
    }
};
</script>
<style lang="stylus" scoped>
.proxy
    margin 40px
    font-size 16px

    .inp, .log
        margin 24px 0 
</style>
