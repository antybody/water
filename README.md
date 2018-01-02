# water

vue2 + webapp

# 安装依赖

 >npm install

# 测试

 >node config/dev-server.js

# 打包

 >npm run build

# 技术栈

  + 1 vue2  核心
  + 2 vue-router 路由
  + 3 vuex 管理状态
  + 4 vue-resource ajax获取数据
  + 5 vue-amazeui 界面框架
  + 6 

# 开发日志

### _2018-1-2 至 2018-1-5_ 

 + 1 搭建框架、梳理引用
 + 2 设计目录、页面关系


# 目录
 
 --config
   ----dev-server.js 开发测试
 --src
   ----components vue 组件
   ----libs 第三方的 js 依赖
   ----store 
     -- api 接口的前缀
     -- modules 每个页面的实际动作
   ----views 每个功能页面
 --statics 自己的css 或 下载css
   ---- css 
   ---- images
   ---- fonts
 ----index.html 用于注入的index模板
 ----package.json 依赖信息
 ----webpack.config.js 打包信息

# 待研究的内容
  + 1 拍照上传
  + 2 app 增量打包
