// pages/search/search.js
const db = wx.cloud.database()
Page({
  data: {
    contenttext: '', //搜索框的值
    confirm: true,
    search_history : [],
    c_fy: '',
    result_ll : [],
    result_fy : [],
    status: false, //搜索是否完成
    start: false, //搜索是否开始
    _error: '未找到相关内容',
    // result_all : []
    isSearch: false, // 默认没有搜索
  },

  //当前搜索框的值
  contentinput: function(e) {
    this.setData({
      contenttext: e.detail.value,
      result_ll : [],
      result_fy : [],
      start: false,
      status: false
    })
  },

  // 点击历史记录赋值给搜索框
  history_push: function(e) {
    this.setData({
      contenttext: e.target.dataset.text,
      result_ll : [],
      result_fy : []
    })
  },

  // 清除历史记录
  cleanhistory: function(e) {
    this.setData({
      contenttext: '', //清空搜索框
      search_history: []
    })
  },

  getHilightStrArray: function(str, key) {
    return str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%');
  },
  
  //搜索
  search: async function(e) {
    var bol = this.data.isSearch; // 获取状态
    this.setData({
      start: true,
      _error: '未找到相关内容',
      isSearch:true // 改变状态
    })
    wx.showLoading({
      title: '加载中',
    });
    var searchtext = this.data.contenttext; //搜索框的值
    let search_array = this.data.search_history //历史搜索记录
    var text_index = search_array.indexOf(searchtext) //用于判断搜索框的值是否出现过
    // 控制搜索历史记录长度
    if (search_array.length>=10){
      search_array.splice(-1, 1)
    }
    if (searchtext.replace(/\s+/g,'').length!=0){
      // console.log(text_index)
      if (text_index!=-1) {
        search_array.splice(text_index, 1)  
      } 
      // 添加历史
      search_array.splice(0,0,searchtext.replace(/^\s*|\s* $/g, ''))
    }
    this.setData({
      search_history: search_array,
      confirm: false
    })

    if (searchtext.replace(/\s+/g,'').length==0) {
      this.setData({
        _error: '请输入搜索内容!',
        status: true
      })
    } else {
      // 搜索
    const _ = db.command
    const result1 = wx.cloud.callFunction({
      name: 'fuzzy_search',
      data:{
        datasets: '01part',
        search: searchtext
      }
    })

    const result2 = wx.cloud.callFunction({
      name: 'fuzzy_search_fy',
      data:{
        datasets: '02part',
        search: searchtext
      }
    }) 

    let ll = (await result1).result
    let fy = (await result2).result

    // console.log(ll)
    // console.log(fy)


    ll.forEach(element => {
      var note = this.getHilightStrArray(element.note, searchtext)
      element.note = note
      var original_text = this.getHilightStrArray(element.original_text, searchtext)
      element.original_text = original_text
    })

    fy.forEach(element => {
      var formula_name = this.getHilightStrArray(element.formula_name, searchtext)
      element.formula_name = formula_name  
      if(element.composition!=0){
        var composition = this.getHilightStrArray(element.composition, searchtext)
        element.composition = composition
      }
      var usage = this.getHilightStrArray(element.usage, searchtext)
      element.usage = usage  
      var fy_note = this.getHilightStrArray(element.fy_note, searchtext)
      element.fy_note = fy_note
    })
    this.setData({
      result_ll: ll,
      result_fy: fy,
      status: true,
    })
      
    }

    
    if(this.data.status){
      wx.hideLoading()
    }
    // console.log(this.data.result_ll)
    // console.log(fy)

    




    // let fy_array = []
    // let one_pice = this.data.result_all
    // for (let index = 0; index < fy.length; index++) {
    //   fy_array.push(fy[index].id)
    // }
    // // console.log(fy_array)
    // for (let index = 0; index < ll.length; index++) {
    //   let element = ll[index]
    //   if (element.formula_flag!=0) {
    //     db.collection('02part').where({
    //       id: _.in(element.formula_flag)
    //     })
    //     .get()
    //     .then(res=>{
    //       // if () {
            
    //       // } else {
            
    //       // }
    //     })
    //   }
    //   else{
    //     one_pice.push(element)
    //     this.setData({
    //       result_all: one_pice
    //     })
    //   }
    // }
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
      contenttext: '',
      confirm: true,
      result_ll : [],
      result_fy : [],
      _error: '',
      status: false, 
      start: false,
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
//页面跳转
gotoSearch_detail_ll:function(e){
  wx.navigateTo({
    url: '/pages/search/search_detail/search_detail?id=' + e.currentTarget.dataset.id + "&text=" + e.currentTarget.dataset.text
  })
},
gotoSearch_detail_fy:function(e){
  wx.navigateTo({
    url: '/pages/search/search_detail/search_detail?fyid=' + e.currentTarget.dataset.fyid + "&text=" + e.currentTarget.dataset.text
  })
},
})