// pages/search/search.js
Page({
  data: {
    contenttext: '', //搜索框的值
    search_history : []
  },

  //搜索框的值
  contentinput: function(e) {
    //当删除input的值为空时
    this.setData({
      contenttext: e.detail.value
    })
  },

  // 点击历史记录赋值给搜索框
  history_push: function(e) {
    this.setData({
      contenttext: e.target.dataset.text
    })
  },

  // 清除历史记录
  cleanhistory: function(e) {
    this.setData({
      contenttext: '', //清空搜索框
      search_history: []
    })
  },
  
  //搜索
  search: function(e) {
    var searchtext = this.data.contenttext; //搜索框的值
    let search_arry = this.data.search_history //历史搜索记录
    var text_index = search_arry.indexOf(searchtext)
    // 控制搜索历史记录长度
    if (search_arry.length>4){
      search_arry.splice(-1, 1)
    }
    if (searchtext.replace(/\s+/g,'').length!=0){
      // 添加历史
      if (text_index==1) {
        search_arry.splice(text_index, 1)  
      } 
      search_arry.splice(0,0,searchtext.replace(/^\s*|\s* $/g, ''))
    }

    // 赋值
    this.setData({
      search_history: search_arry
    })
    
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
  /**
   * 清空搜索内容
   */
  cancel(){
    this.setData({
      contenttext: ''
    })
  }
})