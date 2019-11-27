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
  switchChange: function(e) {
    let index = +e.target.dataset.index;
    getApp().globalData.shoppingCart[index]['checked'] = !e.target.dataset.item.checked;
    this.refreshData();
  },
  switchAllChange: function(e) {
    this.setData({
      isCheckAll: !this.data.isCheckAll
    })
    _.forEach(getApp().globalData.shoppingCart, one => {
      one.checked = this.data.isCheckAll
    })
    this.refreshData();
  },
  //计算合计
  calcAmountAll: function() {
    let amount = 0;
    let countNum = 0;
    let isAllChecked = true;
    _.forEach(this.data.cartList, one => {
      if (one.checked) {
        amount = amount + one.price * one.count;
        countNum = countNum + one.count;
      } else {
        isAllChecked = false;
      }
    })
    this.setData({
      amountAll: amount,
      isCheckAll: isAllChecked
    })
    //刷新购物车角标
    wx.setTabBarBadge({
      index: 2,
      text: countNum + ''
    })
  },
  toCart: function(e) {
    let index = +e.target.dataset.index;
    getApp().globalData.categoryItem[+e.target.dataset.item.categoryIndex].products.data[+e.target.dataset.item.index]['count'] = +e.target.dataset.item.count + 1
    getApp().globalData.shoppingCart[index]['count'] = +e.target.dataset.item.count + 1;
    this.refreshData();

  },
  minusCart: function(e) {
    let index = +e.target.dataset.index;
    if (getApp().globalData.shoppingCart[index]['count'] === 1) {
      //remove
      _.remove(getApp().globalData.shoppingCart, one => { return one['id'] === e.target.dataset.item['id'] })
      getApp().globalData.categoryItem[+e.target.dataset.item.categoryIndex].products.data[+e.target.dataset.item.index]['count'] = undefined;
    } else {
      getApp().globalData.shoppingCart[index]['count'] = +e.target.dataset.item.count - 1;
      getApp().globalData.categoryItem[+e.target.dataset.item.categoryIndex].products.data[+e.target.dataset.item.index]['count'] = +e.target.dataset.item.count - 1;
    }
    this.refreshData();
  }
})