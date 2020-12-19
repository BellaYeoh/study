class ReadmeWebpackPlugin {
  constructor(options) {
    // console.log(options);
  }

  apply(compiler) {
    compiler.hooks.compile.tap('ReadmeWebpackPlugin', (complation) => {
      // console.log('sync', complation);
    });

    compiler.hooks.emit.tapAsync('ReadmeWebpackPlugin', (complation, callback) => {
      // console.log('async', complation.assets);
      complation.assets['readme.txt'] = {
        source: function () {
          return 'readme';
        },
        size: function () {
          return 6;
        }
      };
      callback();
    })
  }
}

module.exports = ReadmeWebpackPlugin;