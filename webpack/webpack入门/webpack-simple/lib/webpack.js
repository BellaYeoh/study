const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const path = require('path');
const { transformFromAst } = require('@babel/core');

module.exports = class Webpack {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.moduleArr = [];
  }
  run() {
    const info = this.anlysis(this.entry);
    this.moduleArr.push(info);
    for (let i = 0; i < this.moduleArr.length; i++) {
      const item = this.moduleArr[i];
      const { dependencies } = item;
      if (dependencies) {
        for (let j in dependencies) {
          this.moduleArr.push(this.anlysis(dependencies[j]));
        }
      }
    }
    // console.log(this.moduleArr);

    // 数据结构转换
    const obj = {};
    this.moduleArr.forEach(item => {
      obj[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code,
      };
    });
    this.file(obj);
  }
  anlysis(entryFile) {
    // 分析出依赖模块
    const conts = fs.readFileSync(entryFile, 'utf-8');
    // 抽象成语法树
    const ast = parser.parse(conts, {
      sourceType: 'module',
    });
    // console.log('ast', ast.program.body); // 看type分辨node是依赖模块还是表达式

    const dependencies = {};
    // 遍历更新@babel/parser生成的AST，可以对语法树中特定的节点进行操作(特殊节点的函数)
    traverse(ast, {
      ImportDeclaration({ node }) {
        const newPath = './' + path.join(
          path.dirname(entryFile),
          node.source.value
        );
        // 将依赖模块以对象的形式放到了dependenci里
        dependencies[node.source.value] = newPath;
      }
    });
    // console.log(dependencies);

    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    });
    // console.log(code);

    return {
      entryFile,
      dependencies,
      code,
    }
  }

  file(code) {
    // 输出浏览器可执行的js代码
    // 生成bundle.js => ./dist/main.js
    const filePath = path.join(this.output.path, this.output.filename);
    const newCode = JSON.stringify(code);
    const bundle = `(
      function(graph){
        function require(moduleId){
          function localRequire(relativePath){
            return require(graph[moduleId].dependencies[relativePath])
          }
          const exports={};
          (function(require,exports,code){
            eval(code)
          })(localRequire,exports,graph[moduleId].code)
          return exports;
        }
      require('${this.entry}')
    })(${newCode})`;

    fs.writeFileSync(filePath, bundle, 'utf-8');
  }
}