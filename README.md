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
│ ├── /router/          # 路由
│ ├── /static/          # 静态资源文件
│ ├── /store/           # redux数据流
│ │   │── /actions/     # 行为
│ │   │── /middleware/  # redux中间件
│ │   │── /reducer/     # reducer
│ │   └── index.ts      # store入口
│ ├── /types/           # 类型
│ ├── /utils/           # 工具函数
│ ├── /views/           # 页面
│ ├── App.jsx           # React入口
│ ├── AppConfig.js      # 组件公共配置数据
│ └── index.js          # 项目入口文件
└── package.json        # 项目信息
```
## Build Setup

``` bash
# 安装依赖包
yarn

# 启动开发环境服务

yarn start

# 打包项目

yarn build

```

