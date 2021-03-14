// pages/search/search.js
Page({
  //清除历史记录
  cleanhistory: function(e) {
    this.setData({
      history: false, //隐藏历史记录
      historyArray: [], //清空历史记录数组
      newArray: [],
      contenttext: "" //清空搜索框
    })
  },
  //搜索
  search: function(e) {
    var searchtext = this.data.contenttext; //搜索框的值
    var sss = true;
    if (searchtext != "") {
      //将搜索框的值赋给历史数组
      this.data.historyArray.push(searchtext);
      //模糊查询 循环查询数组中的title字段
      for (var index in this.data.contentarray) {
        var num = this.data.contentarray[index].title.indexOf(searchtext);
        let temp = 'contentarray[' + index + '].status';
        if (num != -1) { //不匹配的不显示
          this.setData({
            [temp]: 1,
          })
          sss = false //隐藏未找到提示
        }
      }
      this.setData({
        history: false, //隐藏历史记录
        noneview: sss, //隐藏未找到提示
        contentlist: true, //显示内容列表
        newArray: this.data.historyArray //给新历史记录数组赋值
      })
    } else {
      this.setData({
        noneview: true, //显示未找到提示
        contentlist: false, //隐藏内容列表
        history: false, //隐藏历史记录
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    contenttext: "", //搜索框的值
    history: false, //显示历史记录
    noneview: false, //显示未找到提示
    contentlist: false, //显示内容列表
    historyArray: [], //历史记录数组,
    newArray: [], //添加历史记录数组
    contentarray: [{ //内容
      id: 0,
      images: "/images/3201.png",
      title: "完达山甄选牧场酸奶饮品牛奶饮料常温发酵乳包...",
      money: "88.00",
      sold: "78箱",
      status: 0
    }, {
      id: 1,
      images: "/images/3202.jpg",
      title: "网红 天日盐饼干 粗粮早餐 代餐宿舍小吃零食 130g*...",
      money: "26.80",
      sold: "34包",
      status: 0
    }]
  },
  //搜索框的值
  contentinput: function(e) {
    //当删除input的值为空时
    if (e.detail.value == "") {
      this.setData({
        history: true, //显示历史记录
        contentlist: false //隐藏内容列表
      });
      //所有内容列表的状态改为0
      for (var index in this.data.contentarray) {
        let temp = 'contentarray[' + index + '].status';
        this.setData({
          [temp]: 0,
        })
      }
    }
    this.setData({
      contenttext: e.detail.value
    })
  },
  //点击历史记录赋值给搜索框
  textfz: function(e) {
    this.setData({
      contenttext: e.target.dataset.text
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