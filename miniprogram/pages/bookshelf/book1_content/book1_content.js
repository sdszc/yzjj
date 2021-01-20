// pages/book1_content/book1_content.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thisid = parseInt(options.id)
    const _ = db.command
    db.collection('01part').where({
      relateid: _.eq(thisid)
    }).get().then(
      res=>{
        this.setData({
          text:res.data
        })
      }
    )
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
      url: '/pages/bookshelf/book1_content_detail/book1_content_detail?id=' + e.currentTarget.dataset.id
    })
  },
})