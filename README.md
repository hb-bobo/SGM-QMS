## SGM-QMS

> QMS build for React v15.5

## 目录结构

```bash
├── /build/             # 项目输出目录
├── /public/            # 公共文件
│ ├── index.html        # 模板文件
│ └── mainfest.json     # 模板文件配置
├── /simulate-data/     # nodejs模拟数据交互
├── /src/               # 项目源码目录
│ ├── /components/      # UI组件及UI相关方法
│ ├── /decorator/       # 装饰器
│ ├── /mixins/          # 需要混合的方法
│ ├── /plugins/         # 插件
│ ├── /router/          # 路由
│ ├── /static/          # 静态资源文件
│ ├── /store/           # redux数据流
│ │   │── /actions/     # 行为
│ │   │── /middleware/  # redux中间件
│ │   │── /reducer/     # reducer
│ │   └── index.ts      # store入口
│ ├── /types/           # 类型 d.ts
│ ├── /utils/           # 工具函数
│ ├── /views/           # 页面(大部分跟pc端一致)
│ ├── App.jsx           # React入口
│ ├── AppConfig.js      # App公共配置数据
│ └── index.js          # 项目入口文件
└── package.json        # 包信息
```
## Build Setup

``` bash
# 安装依赖包
npm install    == mvn install

# 启动开发环境服务

npm run start
npm run start:noOpen  不会自动打开浏览器

# 打包项目

npm run build　ＱＡ
npm run build:nomap　ＱＡ不生成souce-map文件(此文件只是方便上线后调试，文件很大，看需求)
npm run build:pd　ｐｄ上生产用这个
```

# 代理设置
package.json 的proxy


# 发布
打包后，index.html和manifest.json，放至java项目的src\main\webapp\WEB-INF\app
                        static目录放至java项目的src\main\webapp\WEB-INF\static

如果打包出很多很大的map(作用是方便上线debug)，请用npm run build:nomap打包

