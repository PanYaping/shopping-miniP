// Pages/category/category.js
Page({

  /**
   * Page initial data
   */
  data: {
    categoryData: null,
    currentCategoryIndex: null,
    intoViewId: 'rightSide_id'
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.setData({
      categoryData: getApp().globalData.categoryItem,
      currentCategoryIndex: 0
    })
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

  changecategory: function(event) {
    let index = event.currentTarget.dataset.index;
    console.log('#category_' + index, )
    //获取
    this.setData({
      currentCategoryIndex: index,
      intoViewId: 'category_' + index
    })
  },
  // 监听滑动，控制左侧栏选中状态
  bindscroll: function(event) {
    const query = wx.createSelectorQuery();
    let containViewBottom;
    let categoryItem;
    let categoryLength = this.data.categoryData.length;
    if (categoryLength === 0 || categoryLength === 1) {
      return;
    }
    async function f(that) {
      let promise1 = new Promise((resolve, reject) => {
        query.select('#rightSide_id').boundingClientRect().exec(res => {
          resolve(res[0].bottom)
        })
      })
      containViewBottom = await promise1;
      let promise2 = new Promise((resolve, reject) => {
        let item = { index: undefined, isbreak: false };
        for (let i = 0; i < categoryLength; i++) {
          query.select('#category_' + i).boundingClientRect().exec(res => {
            if (!item.isbreak && res[i + 1].top < 50) {
              item = { index: i, isbreak: false };
            }
            if (res[i + 1].top < containViewBottom && res[i + 1].top > 50) {
              item = { index: i, isbreak: true };
            }
            if(item.isbreak || i === categoryLength -1) {
              resolve(item)
            }
          })
        }
      })
      categoryItem = await promise2;
      let index = categoryItem.index;
      if (index !== undefined && index !== that.data.currentCategoryIndex) {
        that.setData({
          currentCategoryIndex: index,
        })
      }
    }
    f(this);
  }
})