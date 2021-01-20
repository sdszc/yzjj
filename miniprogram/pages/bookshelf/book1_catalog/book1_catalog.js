// pages/book1_catalog/book1_catalog.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_name : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thisvolumeid = parseInt(options.volumeid)
    const _ = db.command
    db.collection('items').where({
      volumeid: _.eq(thisvolumeid)
    }).get().then(
      res=>{
        this.setData({
          title_name:res.data
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
  gotobook1_content:function(e){
    wx.navigateTo({
      url: '/pages/bookshelf/book1_content/book1_content?id=' + e.currentTarget.dataset.id
    })
  },
})