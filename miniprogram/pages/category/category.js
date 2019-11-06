// Pages/category/category.js
Page({

  /**
   * Page initial data
   */
  data: {
    categoryData: null,
    currentCategoryIndex: null,
    productList: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      categoryData: getApp().globalData.categoryItem,
      productList: getApp().globalData.categoryItem[0]['products'],
      currentCategoryIndex: 0
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  changecategory: function (event) {
    let index = event.currentTarget.dataset.index;
    console.log(this.data.categoryData[index])
    this.setData({
      productList: this.data.categoryData[index]['products'],
      currentCategoryIndex: index
    })
  }
})