/*公共函数*/

const _ = require('../lib/lodash.min.js');
export function shoppingCartAdd(item, productList) {
  //购物车是否已经存在该商品
  let index = _.findIndex(productList, one => { return one.id === item.id });
  let countNum = 0;
  let count;
  if (index < 0) {
    //商品不存在
    item['count'] = 1;
    count = 1;
    productList.push(item);
  } else {
    productList[index]['count'] = productList[index]['count'] + 1;
    count = productList[index]['count']
  }
  _.forEach(productList, one => {
  	one['checked'] = true
    countNum = countNum + one.count
  })
  return { products: productList, countNum: countNum, count: count };
}

//减购物车
export function shoppingCartMinus(item, categoryIndex, index) {
  let countNum = 0;
  let cartList = JSON.parse(JSON.stringify(getApp().globalData.shoppingCart));
  let shoppIndex = _.findIndex(cartList, one => { return one.id === item.id });
  if (cartList[shoppIndex]['count'] === 1) {
    //去除购物车该产品
    _.remove(getApp().globalData.shoppingCart, el => { return el.id === item.id })
    getApp().globalData.categoryItem[categoryIndex].products.data[index]['count'] = undefined;
  } else {
    //大于1
    getApp().globalData.shoppingCart[shoppIndex]['count'] = cartList[shoppIndex]['count'] - 1;
    getApp().globalData.categoryItem[categoryIndex].products.data[index]['count'] = cartList[shoppIndex]['count'] - 1;
  }
  _.forEach(getApp().globalData.shoppingCart, one => {
    countNum = countNum + one.count
  })
  return countNum
}