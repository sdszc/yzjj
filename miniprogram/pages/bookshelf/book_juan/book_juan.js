// pages/bookshelf/book_juan/book_juan.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    juan_name : '',
    preface: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thisbookid = parseInt(options.bookid)
    // console.log(thisbookid)
    const _ = db.command
    const $ = db.command.aggregate
    db.collection('items').aggregate()
    .match({ 
      bookid: _.eq(thisbookid)
    })
    .group({
      _id: '$volume_number',
      volumeid: $.first('$volumeid')
    })
    .sort({
      volumeid: 1
    })
    .end()
    .then(res=>{
      // console.log(res.list)
        this.setData({  
          juan_name: res.list
        })    
      }
    )

    // db.collection('items')
    // .where({
    //   bookid: _.eq(thisbookid)
    // })
    // .field({
    //   volumeid: true,
    //   volume_number: true
    // })
    // .get()
    // .then(res=>{
    //   console.log(res.data)
    //   this.setData({
    //     juan_name:res.data
    //   })    
    // })

    db.collection('books').where({
      bookid: _.eq(thisbookid)
    })
    .get()
    .then(res=>{
      // console.log(res.data)
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
  gotobook_cataglog:function(e){
    wx.navigateTo({
      url: '/pages/bookshelf/book_catalog/book_catalog?volumeid=' + e.currentTarget.dataset.volumeid,
    })
  },
})