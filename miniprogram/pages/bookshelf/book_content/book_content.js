// pages/book_content/book_content.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    last_text: '',
    fang: '',
    text: '',
    tips: '',
    title: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) { 
    var thisid = parseInt(options.id)
    const _ = db.command
    // console.log(thisid)

    const thisdata = wx.cloud.callFunction({
      name: 'search',
      data:{
        data_base: '01part',
        id: thisid
      }
    })
    // console.log((await thisdata).result)
    let this_data = (await thisdata).result;
    let this_text = [];
    let this_fang = [];
    let this_tips = [];
    let is_tips = [];
    let is_title = [];
    let this_title = [];

    let that = this;
    this_data.forEach(function(item, index){
      if (item.second_title == 1) {
        db.collection('02part').where({
          id:_.in(item.formula_flag)
        }).get().then(res=>{
          this_fang.push(res.data)
          that.setData({
            fang: this_fang
          })
        })
      }
      if (item.second_title == 0 || item.second_title == 2){
        if (item.tips == '') {
          this_text.push(item)
          that.setData({
            text: this_text
          })
          // console.log(this_text)
        } else {
          // console.log(item.tips)
          if(is_tips.indexOf(item.tips)==-1){
            is_tips.push(item.tips)
            this_tips.push(item)
          }
          that.setData({
            tips: this_tips
          })
        }
      }
      if ([0,1,2].indexOf(item.second_title) == -1){
        if(is_title.indexOf(item.second_title) == -1){
          is_title.push(item.second_title)
          this_title.push(item)
        }
        that.setData({
          title: this_title
        })
      }
    });

    


    // if(this_data[0].second_title == 0 || this_data[0].second_title == 2) {
    //   if (this_data[0].tips == ''){
    //     console.log(this_data[0].tips)

    //   }
    //   if (this_data[0].tips != ''){
    //     console.log(this_data[0].tips)
    //   }
    // }

    
    // if (this_data[0].second_title == 1) {
    //   db.collection('02part').where({
    //     id:_.in(this_data[0].formula_flag)
    //   }).get().then(res=>{
    //     this.setData({
    //       fang:res.data
    //     })
    //   })
    // }  
    
   

   

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
    // console.log(this.data.last_text)
    
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
  gotobook_content_detail_title:function(e){
    wx.navigateTo({
      url: '/pages/bookshelf/book_content_detail/book_content_detail?title=' + e.currentTarget.dataset.title
    })
  },
  gotobook_content_detail_tips:function(e){
    wx.navigateTo({
      url: '/pages/bookshelf/book_content_detail/book_content_detail?tips=' + e.currentTarget.dataset.tips
    })
  },
})