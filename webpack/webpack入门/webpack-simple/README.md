# 实现一个简易版本的webpack

webpack通过入口文件逐层遍历到模块依赖，进行代码分析、代码转换，最终生成可在浏览器运行的打包后的代码

本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

参考：[https://juejin.cn/post/6844904036710219789](https://juejin.cn/post/6844904036710219789)


