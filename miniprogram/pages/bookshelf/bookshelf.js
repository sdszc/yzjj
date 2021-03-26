// pages/bookshelf/bookshelf.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookData: '',
    bookname: '',
    show: 'true',
    start: false,
    status: false,
    _error: '抱歉，暂无此书籍!'
  },

  /**
   * 生命周期函数--监听页面加载
   */
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      show: true
    })
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
      bookname: e.detail.value,
      start: false,
      status: false,
    })
  },

  // 输入书名查找
  search:async function(e){
    this.setData({
      bookData: '',
      start: true,
      status: false,
      show: false,
      _error: '抱歉，暂无此书籍!'
    })
    wx.showLoading({
      title: '加载中',
    });
    var searchtext = this.data.bookname
    const _ = db.command
    // console.log(searchtext)
    if (searchtext.replace(/\s+/g,'').length==0) {
      // const thisbook = wx.cloud.callFunction({
      //   name: 'search',
      //   data:{
      //     data_base: 'books',
      //   }
      // })
      // console.log((await thisbook).result)
      this.setData({
          _error: '请输入搜索内容!',
          status: true,
          show: true
      })
    } else {
      const thisbook = db.collection('books').where(
        _.or([
          {
            bookname:{
              $regex:'.*'+ searchtext,
              $options: 'i'
            }
          },
          {
            preface:{
              $regex:'.*'+ searchtext,
              $options: 'i'
            }
          }
        ])
      ).get()
      // console.log((await thisbook).data)
      this.setData({
        bookData:(await thisbook).data,
        status: true,
        show: true
      })
    }
    // console.log(this.data.bookData)


    if(this.data.status){
      wx.hideLoading()
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
          start: false,
          bookData: res.result.data,
          _error: ''
        })
      }
    })
  },
  /**
   * 顶部固定
   */
  //页面滚动监听
 //页面滚动监听
 onPageScroll: function (e) {
  let vm = this;
  var query = wx.createSelectorQuery()
  query.select('#location_id').boundingClientRect()
  query.selectViewport().scrollOffset()
  query.exec(function (res) {
    if (res[0].top < 0){  //res[0].top为location_id距离顶部的位置
      vm.setData({
        hideTop: true
      })
    }else{
      vm.setData({
        hideTop: false
      })
    }
  })
},
})