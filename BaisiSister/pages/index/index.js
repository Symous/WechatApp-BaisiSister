//index.js
//获取应用实例
var app = getApp()
var requestUrl = "https://route.showapi.com/255-1";
var curPage = 1;
var isPullDownRefreshing = false;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    jokes :{}
  },

  lower:function(){
    console.log("reach to lower...");
    var that = this;
    this.fetchJoke();
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    this.fetchJoke();


  },
  onPullDownRefresh:function(){
    console.log('onPullDownRefresh...');
    curPage = 1;
    isPullDownRefreshing = true;
    this.fetchJoke();
  },

  fetchJoke:function(){
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: requestUrl,
      data: {
        'showapi_appid':app.globalData.appid,
        'showapi_sign':app.globalData.apiKey,
        'page':curPage.toString(),
        'type':app.globalData.tText
      },
      method: 'GET',
      success: function(res){
        // success
        if(curPage == 1)
          that.setData({ jokes:res.data.showapi_res_body.pagebean.contentlist });
        else
          that.setData({ jokes: that.data.jokes.concat(res.data.showapi_res_body.pagebean.contentlist) });

        curPage = curPage + 1;
        wx.hideNavigationBarLoading();
        if(isPullDownRefreshing)
          wx.stopPullDownRefresh();
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }

})

