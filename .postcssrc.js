const pxToRem = require('postcss-pxtorem')
module.exports = {
  //插件
  plugins: [
    pxToRem({
    //根结点的字体大小
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      //如果file里面有vant就适配37.5没有则是75
    propList:['*'],//把所有的属性都转换成rem
  })]
}
