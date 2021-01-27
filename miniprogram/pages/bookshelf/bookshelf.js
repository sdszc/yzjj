// pages/bookshelf/bookshelf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uhide: 0
  },
  // 查询搜索的接口方法
  a: function () {
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var data = {
      "datas": [
        {
          "id": 1,
          "imgurl": "../../images/1.png",
          "bookName": "《伤寒论注》",
          "jianJie": "《伤寒论》后汉张机所著,发明《内经》奥旨者也。并不引古经--语.皆出心裁,理无不该,法无不备。盖古经皆有法无方,自此始有法有方。启万世之法程,诚医门之圣书!但世远残阙,多编次传写之误。今博集诸家注释,采其精粹,正 其错讹,删其驳杂,补其阙漏,发其余蕴,于以行之天下,则大法微言,益昭诸万世矣!",
        },
        {
          "id": 2,
          "imgurl": "../../images/2.png",
          "bookName": "《金匮要略》",
          "jianJie": "《伤寒论》论伤寒,《金匮要略》论杂病,乃仲景全书。《伤寒论》得成无己创注,续者五十余家，故得昌明宇内;《金匮要略》人罕言之,虽有赵良、徐彬等注释,但其文义古奥，系千载残编错筒,颇多疑义,阙文亦复不少,承讹袭谬,随文蔓術,宜后人视为迁远,束诸高阁。今于其失次者序之,残缺者补之;博采群书,详加注释,俾二书并行于世。庶后之业医者,不为俗说所误,知仲景能治伤寒,未尝不能治杂证也。",
        }
      ]
    };
    //console.log(data.datas);
    //设置书本展示信息
    that.setData({
      carInfoData: data.datas
    })
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
  gotobook1_juan:function(e){
    wx.navigateTo({
      //url: '/pages/bookshelf/book1_juan/book1_juan?bookname='+ e.currentTarget.dataset.bookname,
      url: '/pages/bookshelf/book1_juan/book1_juan?bookid=1'
    })
  },
})