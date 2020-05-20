//index.js
//获取应用实例
const app = getApp()

Page({

  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // openid:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.switchTab ({
      url: '../upcoming/upcoming'
    })
  },
  onLoad: function () {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.getopenid()
  },
  //通过调用云函数回去openid
  getopenid(){
    wx.cloud.callFunction({
      name:"getopenid",
      success(res){
        console.log("获取openid成功",res.result.openid),//打印出成功获得openid
        app.globalData.openid=res.result.openid//将openid值赋给全局变量的openid
        // console.log("app.globalData.openid",app.globalData.openid)
      }
    })

  },

  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

})
