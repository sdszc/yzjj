const util = require('../../utils/util.js')
const config = require('../../config.js')

Page({
  data: {
    user: {},
    now: new Date().getFullYear(),
    info: config.info,
    title: '我的',
    showSharePoster: false,
    wechatUserInfo: {},
  },
  onLoad: function() {
    let that = this
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          wechatUserInfo: res.userInfo
        })
      }
    })

    that.initUser()
  },
  onShow: function() {
    this.initUser()
  },
  onUnload: function() {
    this.initUser()
  },
  initUser: function() {
    let that = this
    let user = util.getUser()
    if (user == undefined || user.token == undefined || user.uid <= 0) {
      user = {
        'uid': 0,
        'nickname': '游客，请戳我登录',
        'avatar': '/images/logo.png',
        'intro': '分享知识，共享智慧；知识，因分享，传承久远'
      }
    }
    that.setData({
      user: user,
    })
  },
  logout: function(e) {
    let that = this
    wx.showModal({
      title: '温馨提示',
      content: '您确定要退出登录吗？',
      success(res) {
        if (res.confirm) {
          util.request(config.api.logout) // 只需调用，不需要处理返回结果
          util.clearUser()
          util.toastSuccess('退出成功')
          that.initUser()
        }
      }
    })
  },
  userLoginEvent: function(e) {
    if (config.debug) console.log("userLoginEvent", e)
    if (this.data.user.uid == 0) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
  },
  onShareAppMessage: function() {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  showMessage: function(){
    wx.showModal({
      title: '提示',
      content: '该模块后续开放！',
      success: function (res) {
          if (res.confirm) {
              console.log('用户点击确定')
          }else{
             console.log('用户点击取消')
          }

      }
  })
  }
})