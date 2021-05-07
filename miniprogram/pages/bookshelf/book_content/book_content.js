// pages/book_content/book_content.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text : '',
    last_text: '',
    fang: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    var thisid = parseInt(options.id)
    const _ = db.command
    console.log(thisid)
   const thisdata = wx.cloud.callFunction({
      name: 'search',
      data:{
        data_base: '01part',
        id: thisid
      }
    })
    // console.log((await thisdata).result)
    if ((await thisdata).result.data[0].second_title == 1) {
      db.collection('02part').where({
        id:_.in((await thisdata).result.data[0].formula_flag)
      }).get().then(res=>{
        this.setData({
          fang:res.data
        })
      })
    }  
    this.setData({
        text: (await thisdata).result.data
    })

    // console.log(thisid)
    db.collection('items')
    .where({
      id: _.eq(thisid)
    })
    .get()
    .then(res=>{
      // console.log(res.data)
      this.setData({
        last_text: res.data
      })
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
  gotobook_content_detail:function(e){
    wx.navigateTo({
      url: '/pages/bookshelf/book_content_detail/book_content_detail?id=' + e.currentTarget.dataset.id
    })
  },
  gotobook_content_detail_fy:function(e){
    wx.navigateTo({
      url: '/pages/bookshelf/book_content_detail/book_content_detail?fyid=' + e.currentTarget.dataset.fyid
    })
  },
})