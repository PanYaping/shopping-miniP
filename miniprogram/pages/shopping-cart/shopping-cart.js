// pages/shopping-cart/shopping-cart.js
const _ = require('../../lib/lodash.min.js');
Page({

  /**
   * Page initial data
   */
  data: {
    cartList: null,
    isCheckAll: true,
    amountAll: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {
    this.refreshData();
  },

  refreshData: function() {
    this.setData({
      cartList: getApp().globalData.shoppingCart,
    })
    this.calcAmountAll();
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  },
  //计算合计
  calcAmountAll: function() {
    let amount = 0
    _.forEach(this.data.cartList, one => {
      amount = amount + one.price * one.count;
    })
    this.setData({
      amountAll: amount
    })
  },
  toCart: function(e) {
    let index = +e.target.dataset.index;
    getApp().globalData.shoppingCart[index]['count'] = getApp().globalData.shoppingCart[index]['count'] + 1;
    this.refreshData();

  },
  minusCart: function(e) {
    let index = +e.target.dataset.index;
    if (getApp().globalData.shoppingCart[index]['count'] === 1) {
      //remove
      _.remove(getApp().globalData.shoppingCart, one => {return one['id'] === e.target.dataset.item['id']})
    } else {
      getApp().globalData.shoppingCart[index]['count'] = getApp().globalData.shoppingCart[index]['count'] - 1;
    }
    this.refreshData();
  }
})