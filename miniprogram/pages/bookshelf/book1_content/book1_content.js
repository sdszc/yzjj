// pages/book1_content/book1_content.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['太阳之为病，脉浮，头项强痛而恶寒。','太阳病，发热，汗出，恶风，脉缓者，名为中风。','太阳中风，阳浮而阴弱，阳浮者热自发，阴弱者汗自出，啬啬恶寒，淅淅恶风，翕翕发热，鼻鸣，干呕者，桂枝汤主之。']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 页面跳转
  gotobook1_content_detail:function(e){
    wx.navigateTo({
      url: '/pages/bookshelf/book1_content_detail/book1_content_detail'
    })
  },
})