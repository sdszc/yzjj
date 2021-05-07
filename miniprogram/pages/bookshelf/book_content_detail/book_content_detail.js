// pages/book_content/book_content.js
const db = wx.cloud.database()
var startPoint
Page({

  /**
   * 页面的初始数据
   */
  data: {
    full_text: '',
    fang: '',
    cijiu: '',
    //按钮位置参数
    buttonTop: 0,
    buttonLeft: 0,
    windowHeight: '',
    windowWidth: '',
    //角标显示数字
    corner_data:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thisid = parseInt(options.id)
    var thisfyid = parseInt(options.fyid)
    // console.log(thisfyid)
    const _ = db.command
    const $ = db.command.aggregate
    if (thisid) {
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
        var data = res.data[0].formula_flag
        // console.log(data)
        var which_table = res.data[0].second_title
        if(which_table == 2){
          // console.log(data)
          db.collection('cj').where({
            id: _.in(data)
          })
          .get()
          .then(res=>{
            // console.log(res.data)
            this.setData({
              cijiu: res.data
            })
          })
        }
        else{
          if (data != 0) {
            db.collection('02part').where({
              id: _.in(data)
            })
            .get()
            .then(res=>{
              console.log(res.data)
              this.setData({
                fang: res.data
              })
            })
          }  
        }
        
      })
    } else {
      db.collection('02part').where({
        id: _.eq(thisfyid)
      })
      .get()
      .then(res=>{
        this.setData({
          fang: res.data
        })
      })
      
    }
   
    // 获取购物车控件适配参数
 var that =this;
 wx.getSystemInfo({
  success: function (res) {
  // console.log(res);
  // 屏幕宽度、高度
  // console.log('height=' + res.windowHeight);
  // console.log('width=' + res.windowWidth);
  // 高度,宽度 单位为px
  that.setData({
   windowHeight: res.windowHeight,
   windowWidth: res.windowWidth,
   buttonTop:res.windowHeight*0.70,//这里定义按钮的初始位置
   buttonLeft:res.windowWidth*0.70,//这里定义按钮的初始位置
  })
  }
 })
  },
//可拖动悬浮按钮点击事件
btn_Suspension_click:function(){
  //这里是点击购物车之后将要执行的操作
  wx.showToast({
   title: '点击成功',
   icon:'success',
   duration:1000
  })
  },
  //以下是按钮拖动事件
  buttonStart: function (e) {
  startPoint = e.touches[0]//获取拖动开始点
  },
  buttonMove: function (e) {
  var endPoint = e.touches[e.touches.length - 1]//获取拖动结束点
  //计算在X轴上拖动的距离和在Y轴上拖动的距离
  var translateX = endPoint.clientX - startPoint.clientX
  var translateY = endPoint.clientY - startPoint.clientY
  startPoint = endPoint//重置开始位置
  var buttonTop = this.data.buttonTop + translateY
  var buttonLeft = this.data.buttonLeft + translateX
  //判断是移动否超出屏幕
  if (buttonLeft+50 >= this.data.windowWidth){
   buttonLeft = this.data.windowWidth-50;
  }
  if (buttonLeft<=0){
   buttonLeft=0;
  }
  if (buttonTop<=0){
   buttonTop=0
  }
  if (buttonTop + 50 >= this.data.windowHeight){
   buttonTop = this.data.windowHeight-50;
  }
  this.setData({
   buttonTop: buttonTop,
   buttonLeft: buttonLeft
  })
  },
  buttonEnd: function (e) {
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
      
    })
  },
})