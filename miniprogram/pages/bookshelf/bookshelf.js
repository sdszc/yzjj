// pages/bookshelf/bookshelf.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookData: '',
    bookname: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     wx.cloud.callFunction({
        name: 'search',
        data:{
          data_base: 'books',
        },
        success:res=>{
          this.setData({
            bookData: res.result.data
          })
        }
      })
  },

  booknameinput:function(e){
    this.setData({
      bookname: e.detail.value
    })
  },

  // 输入书名查找
  search: function(e){
    var searchtext = this.data.bookname
    const _ = db.command
    // console.log(searchtext)
    if (searchtext == '') {
      wx.cloud.callFunction({
        name: 'search',
        data:{
          data_base: 'books',
        },
        success:res=>{
          this.setData({
            bookData: res.result.data
          })
        }
      })
    } else {
      db.collection('books')
      .where({
        bookname:{
          $regex:'.*'+ searchtext,
          $options: 'i'
        }
      })
      .get()
      .then(res=>{
        // console.log(res.data)
        this.setData({
          bookData: res.data
        })  
      })
    }
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

  }
  ,
  //页面跳转
  gotobook_juan:function(e){
    wx.navigateTo({
      url: '/pages/bookshelf/book_juan/book_juan?bookid='+ e.currentTarget.dataset.bookid
    })
  },
  /**
   * 清空搜索内容
   */
  cancel:function(){
    wx.cloud.callFunction({
      name: 'search',
      data:{
        data_base: 'books',
      },
      success:res=>{
        this.setData({
          bookname: '',
          bookData: res.result.data
        })
      }
    })
  }
})