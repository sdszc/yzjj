// pages/search/search_detail/search_detail.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zheng: '',
    fang: '',
    searchtext: '',
    status: false
  },

  getHilightStrArray: function(str, key) {
    return str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.showLoading({
      title: '加载中',
    });
    const _ = db.command
    var llid = parseInt(options.id)
    var search = options.text
    var fyid = parseInt(options.fyid)
    this.setData({
      searchtext: search
    })
    // console.log(fyid)

    // const thisoh = wx.cloud.callFunction({
    //   name: 'remove_0',
    //   data:{
    //     data_base: '01part'
    //   }
    // })
    // console.log((await thisoh).result)

    if (fyid) {
      var thiszheng = []
      const thisoh = wx.cloud.callFunction({
        name: 'remove_0',
        data:{
          data_base: '01part',
        }
      })
      // console.log((await thisoh).result)
      
      try {
        var for_search = (await thisoh).result
        for_search.forEach(element=>{
          var this_ = element.formula_flag
          if(this_.indexOf(fyid)!=-1){
            thiszheng.push(element)
            this.setData({
              zheng: thiszheng
            })
            throw new Error('ending')
          }
        })
      } catch (e) {
        if (e.message=='ending') {
          console.log('end')
        } else {
          console.log(e.message)
        }
      }
    } 
    else {
      const thiszheng = db.collection('01part').where({
        id: _.eq(llid)
      })
      .get()
      this.setData({
        zheng: (await thiszheng).data
      })
    } 

    if (this.data.zheng.length!=0) {
      var data_ll = this.data.zheng[0].formula_flag
      if (data_ll != 0) {
       const thisfang =  db.collection('02part').where({
          id: _.in(data_ll)
        })
        .get()
        this.setData({
          fang: (await thisfang).data
        })
      } 
    } else {
      const thisfang =  db.collection('02part').where({
        id: _.eq(fyid)
      })
      .get()
      this.setData({
        fang: (await thisfang).data
      })
    }
    
      
    var this_z = this.data.zheng
    var this_f = this.data.fang
    if(this_z){
      this_z.forEach(element => {
        if(element.tips!=0){
          var tips = this.getHilightStrArray(element.tips, search)
          element.tips = tips
        }
        if(element.original_text!=0){
          var original_text = this.getHilightStrArray(element.original_text, search)
          element.original_text = original_text
        }
        if(element.note!=0){
          var note = this.getHilightStrArray(element.note, search)
          element.note = note
        }
      })
    }
    
    if(this_f){
      this_f.forEach(element => {
        var formula_name = this.getHilightStrArray(element.formula_name, search)
        element.formula_name = formula_name  
        if(element.introduction!=0){
          var introduction = this.getHilightStrArray(element.introduction, search)
          element.introduction = introduction
        }
        if(element.composition!=0){
          var composition = this.getHilightStrArray(element.composition, search)
          element.composition = composition
        }
        if(element.usage!=0){
          var usage = this.getHilightStrArray(element.usage, search)
          element.usage = usage
        }
        if(element.fy_note!=0){
          var fy_note = this.getHilightStrArray(element.fy_note, search)
          element.fy_note = fy_note
        }
        if(element.rhyme!=0){
          var rhyme = this.getHilightStrArray(element.rhyme, search)
          element.rhyme = rhyme
        }
      })
    }
    
    this.setData({
      zheng: this_z,
      fang: this_f,
      status: true
    })
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
})