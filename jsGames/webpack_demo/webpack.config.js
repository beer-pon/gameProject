// output.pathに絶対パスを指定する必要があるため、pathモジュールを読み込んでおく
const path = require('path');

module.exports = {
  // エントリーポイントの設定
  entry: './src/js/app.js',
  // 出力の設定
  output: {
    // 出力するファイル名
    filename: 'bundle.js',
    // 出力先のパス（v2系以降は絶対パスを指定する必要がある）
    path: path.join(__dirname, 'public/js')
  },
  module: {
    loaders: [
      { 
        test: path.join(__dirname, 'src/js/*'), 
        exclude: /node_modules/, 
        loader: "babel", 
        query:{
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
