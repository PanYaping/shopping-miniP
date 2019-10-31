// pages/home/home.js
Page({

  /**
   * Page initial data
   */
  data: {
    categoryArray: [{ image: 'https://gw.alicdn.com/tfs/TB1Wxi2trsrBKNjSZFpXXcXhFXa-183-144.png_.webp', name: '天猫' }, { image: 'https://img.alicdn.com/tfs/TB10UHQaNjaK1RjSZKzXXXVwXXa-183-144.png?getAvatar=1_.webp', name: '聚划算' }, { image: 'https://gw.alicdn.com/tfs/TB11rTqtj7nBKNjSZLeXXbxCFXa-183-144.png?getAvatar=1_.webp', name: '天猫国际' }, { image: 'https://gw.alicdn.com/tps/TB1eXc7PFXXXXb4XpXXXXXXXXXX-183-144.png?getAvatar=1_.webp', name: '外卖' }, { image: 'https://gw.alicdn.com/tfs/TB1IKqDtpooBKNjSZFPXXXa2XXa-183-144.png_.webp', name: '天猫超市' }, { image: 'https://gw.alicdn.com/tfs/TB1o0FLtyMnBKNjSZFoXXbOSFXa-183-144.png_.webp', name: '充值中心' }, { image: 'https://gw.alicdn.com/tfs/TB15nKhtpkoBKNjSZFEXXbrEVXa-183-144.png?getAvatar=1_.webp', name: '飞猪旅行' }, { image: 'https://gw.alicdn.com/tfs/TB1BqystrZnBKNjSZFrXXaRLFXa-183-144.png?getAvatar=1_.webp', name: '领金币' }, { image: 'https://gw.alicdn.com/tfs/TB1CMf4tlnTBKNjSZPfXXbf1XXa-183-144.png?getAvatar=1_.webp', name: '拍卖' }, { image: 'https://gw.alicdn.com/tfs/TB18P98tyQnBKNjSZFmXXcApVXa-183-144.png?getAvatar=1_.webp', name: '分类' }],
    imagesArray: ['https://img.alicdn.com/imgextra/i4/118/O1CN01nuJfd71Ck5IrNQ8EO_!!118-0-luban.jpg', 'https://img.alicdn.com/tps/i4/TB1xbwljAY2gK0jSZFgSuw5OFXa.jpg','https://gw.alicdn.com/imgextra/i4/90/O1CN01huka4t1CXGDK5cWQZ_!!90-0-lubanu.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    value: '',
    products: [1,2,3,4,5]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getCategoryList();
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

  getCategoryList: function () {
    wx.cloud.callFunction({
      name: 'category-data'
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err);
    })
  }
})