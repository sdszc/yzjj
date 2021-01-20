// pages/bookshelf/book1_juan/book1_juan.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    juan_name : '',
    preface: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thisbookid = parseInt(options.bookid)
    const _ = db.command
    db.collection('items').where({
      bookid: _.eq(thisbookid)
    }).get().then(
      res=>{
        this.setData({
          juan_name:res.data
        })    
      }
    )
    db.collection('books').where({
      bookid: _.eq(thisbookid)
    }).get().then(
      res=>{
        this.setData({
          preface:res.data
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
  //页面跳转
  gotobook1_cataglog:function(e){
    wx.navigateTo({
      url: '/pages/bookshelf/book1_catalog/book1_catalog?volumeid=' + e.currentTarget.dataset.volumeid,
    })
  },
})