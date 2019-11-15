// pages/home/home.js
import {shoppingCartAdd} from '../../service/common.js';
Page({

  /**
   * Page initial data
   */
  data: {
    categoryArray: [{ image: 'https://gw.alicdn.com/tfs/TB1Wxi2trsrBKNjSZFpXXcXhFXa-183-144.png_.webp', name: '天猫' }, { image: 'https://img.alicdn.com/tfs/TB10UHQaNjaK1RjSZKzXXXVwXXa-183-144.png?getAvatar=1_.webp', name: '聚划算' }, { image: 'https://gw.alicdn.com/tfs/TB11rTqtj7nBKNjSZLeXXbxCFXa-183-144.png?getAvatar=1_.webp', name: '天猫国际' }, { image: 'https://gw.alicdn.com/tps/TB1eXc7PFXXXXb4XpXXXXXXXXXX-183-144.png?getAvatar=1_.webp', name: '外卖' }, { image: 'https://gw.alicdn.com/tfs/TB1IKqDtpooBKNjSZFPXXXa2XXa-183-144.png_.webp', name: '天猫超市' }, { image: 'https://gw.alicdn.com/tfs/TB1o0FLtyMnBKNjSZFoXXbOSFXa-183-144.png_.webp', name: '充值中心' }, { image: 'https://gw.alicdn.com/tfs/TB15nKhtpkoBKNjSZFEXXbrEVXa-183-144.png?getAvatar=1_.webp', name: '飞猪旅行' }, { image: 'https://gw.alicdn.com/tfs/TB1BqystrZnBKNjSZFrXXaRLFXa-183-144.png?getAvatar=1_.webp', name: '领金币' }, { image: 'https://gw.alicdn.com/tfs/TB1CMf4tlnTBKNjSZPfXXbf1XXa-183-144.png?getAvatar=1_.webp', name: '拍卖' }, { image: 'https://gw.alicdn.com/tfs/TB18P98tyQnBKNjSZFmXXcApVXa-183-144.png?getAvatar=1_.webp', name: '分类' }],
    imagesArray: ['https://img.alicdn.com/imgextra/i4/118/O1CN01nuJfd71Ck5IrNQ8EO_!!118-0-luban.jpg', 'https://img.alicdn.com/tps/i4/TB1xbwljAY2gK0jSZFgSuw5OFXa.jpg', 'https://gw.alicdn.com/imgextra/i4/90/O1CN01huka4t1CXGDK5cWQZ_!!90-0-lubanu.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    value: '',
    products: [1, 2, 3, 4, 5],
    animationCart1: '',
    animationCart2: '',
    toCartShow: false,
    categoryData: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    wx.showLoading();
    wx.cloud.callFunction({
      name: 'category-data'
    }).then(res => {
      getApp().globalData.categoryItem = res.result.data;
      this.setData({
        categoryData: res.result.data
      })
      console.log(getApp().globalData.categoryItem)
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
      wx.hideLoading();
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
        let cartOptions = shoppingCartAdd(e.target.dataset.item, getApp().globalData.shoppingCart)
        let categoryIndex = +e.target.dataset.categoryindex;
        let index = +e.target.dataset.index;
        //全局数据刷新
        getApp().globalData.categoryItem[categoryIndex].products.data[index]['count'] = cartOptions.count;
        getApp().globalData.shoppingCart = cartOptions.products;
        this.setData({
          toCartShow: false,
          categoryData: getApp().globalData.categoryItem
        })
        wx.setTabBarBadge({
          index: 2,
          text: cartOptions.countNum + ''
        })
      }, 300)
    })
  }
})