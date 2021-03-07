// pages/book1_content/book1_content.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    full_text: '',
    fang: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thisid = parseInt(options.id)
    const _ = db.command
    const $ = db.command.aggregate
    db.collection('01part').where({
      id: _.eq(thisid)
    })
    .get()
    .then(res=>{
      // console.log(res.data)
      this.setData({
        full_text: res.data
      })
      // console.log(res.data[0].formula_flag)
      var data_element = typeof res.data[0].formula_flag
      var data = res.data[0].formula_flag
      if (data_element == 'number') {
        db.collection('02part').where({
          id: _.eq(data)
        })
        .get()
        .then(res=>{
          this.setData({
            fang: res.data
          })
        })
       }
      else {
        db.collection('02part').where({
          id: _.in(data)
        })
        .get()
        .then(res=>{
          this.setData({
            fang: res.data
          })
        })
      }
      
    })
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
      
    })
  },
})