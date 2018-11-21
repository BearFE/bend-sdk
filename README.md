#bEnd components
***



## 初次安装需要安装npm依赖包
```shell
npm install
```

##项目目录结构

```shell
	build
	 |----webpack.base.conf.js  // 项目示例入口配置&loader
	 |----webpack.dev.conf.js	// webpack开发环境配置
	 |----webpack.prod.conf.js  // webpack产出配置，注意入口配置成组件入口
	 |----...
	config
	 |----proxy.js // 代理服务配置
	 |----...
	dist
	 |----...    // 产物
	examples
	 |----router
	       |----index.js  // examples router
	 |----App.vue
	 |----index.html   // examples 入口
	 |----mainjs // js 入口
	 |----...
	mock   // 异步数据mock，支持js和json文件
	 |----example
	 	   |----proxy.js 
	 	   |----stat.json
	node_modules
	 |----...
	src // 组件开发目录
	 |----assets  // 静态资源目录，包括图片和css
	 |----components // 业务组件
	 |----views // 业务
	 |----indexjs // 插件入口
	package.json // 注意配置mian，组件入口
	build.sh // 编译脚本
``` 
	

## 启用本地mock服务及部署本地代码，开发模式，不进行压缩混淆md5标记等操作
```
npm run dev
```

## build for production with minification
```
npm run build
```

## 发布到开发机
```
npm run deploy test  // 发布， test 开发机名
config/proxy.js // 配置map
```
server端配置 https://github.com/fex-team/receiver 或 receiver.php

##mock接口
mock接口配置在 /mock/api下 url与接口对应格式为 test.bend.com/api/test => mock/api/test模块(如： mock/api/test.js 或 mock/api/test.json ) json后缀为简单数据；js后缀可用于模拟简单数据的node.js 模块，模拟复杂数据，支持函数和对象，函数参数参见express中间件

##联调
当后端完成开发后，前端需要将接口转发至后端接口 ?此时需要将为接口数据添加fallback字段，并将其值设置为true 例如： 本地mock

```
// test.js 接口将使用本地mock模块
module.export = {
    code: 0,
    msg: 'success',
    data: {
        list: [],
        count: 0
    }
}

// 使用serve转发
module.export = {
    fallback: true,
    code: 0,
    msg: 'success',
    data: {
        list: [],
        count: 0
    }
}
```