// Pages/category/category.js
import { shoppingCartAdd, shoppingCartMinus } from '../../service/common.js';
Page({

  /**
   * Page initial data
   */
  data: {
    categoryData: null,
    currentCategoryIndex: null,
    intoViewId: 'rightSide_id',
    animationCart1: '',
    animationCart2: '',
    toCartShow: false,
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
    this.setData({
      currentCategoryIndex: 0
    })
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {
    this.setData({
      categoryData: getApp().globalData.categoryItem,
    })
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
  // 减购物车
  minusCart: function(e) {
    let countNum = shoppingCartMinus(e.target.dataset.item, e.target.dataset.categoryindex, e.target.dataset.index)
    this.setData({
      categoryData: getApp().globalData.categoryItem
    })
    if (countNum === 0) {
      wx.removeTabBarBadge({
        index: 2
      })
    } else {
      wx.setTabBarBadge({
        index: 2,
        text: countNum + ''
      })
    }
    console.log(getApp().globalData.shoppingCart)
  },

  // 加购物车： 动画
  toCart: function(e) {
    let startX = e.changedTouches[0].clientX
    let startY = e.changedTouches[0].clientY
    console.log(startX, startY)
    let that = this
    var animation3 = wx.createAnimation({
      duration: 1,
      timingFunction: "step-start",
      delay: 0
    })
    var animation4 = wx.createAnimation({
      duration: 1,
      timingFunction: "step-start",
      delay: 0
    })
    animation3.translateX(startX).opacity(1).step()
    animation4.translateY(startY).step()
    this.setData({
      toCartShow: true,
      animationCart1: animation3.export(),
      animationCart2: animation4.export(),
    }, () => {
      // 获取tabbar购物车位置
      let systemInfo = wx.getSystemInfoSync();
      let targetX = systemInfo.windowWidth * 5 / 8;
      let targetY = systemInfo.windowHeight
      console.log(targetX, targetY)
      // 显示遮罩层
      var animation1 = wx.createAnimation({
        duration: 300,
        timingFunction: "ease-out",
        delay: 0
      })
      var animation2 = wx.createAnimation({
        duration: 300,
        timingFunction: "ease-in",
        delay: 0
      })
      animation1.translateX(targetX).opacity(0.5).step()
      animation2.translateY(targetY).step()
      this.setData({
        animationCart1: animation1.export(),
        animationCart2: animation2.export(),
      })
      setTimeout(() => {
        //添加至购物车
        let categoryIndex = +e.target.dataset.categoryindex;
        let index = +e.target.dataset.index;
        let cartOptions = shoppingCartAdd(e.target.dataset.item, getApp().globalData.shoppingCart, categoryIndex, index)
        
        this.setData({
          toCartShow: false,
          categoryData: getApp().globalData.categoryItem
        })
        wx.setTabBarBadge({
          index: 2,
          text: cartOptions.countNum + ''
        })
        console.log(getApp().globalData.shoppingCart)
      }, 300)
    })
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
            if (item.isbreak || i === categoryLength - 1) {
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