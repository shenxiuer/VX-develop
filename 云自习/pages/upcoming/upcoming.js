const db=wx.cloud.database();
const upcoming=db.collection("upcoming");
var app = getApp()



Page({
  data: {
      showModal: false,
      upcomingData:[],
      scheduleData:[],
      openid:"",
      show:false,
  },

    onLoad:function () {
      //打印出全局变量的openid
      console.log("openid",app.globalData.openid)



      console.log("页面初次加载1")
      // this.getSchedule();
      // console.log("获取事件表数据成功",this.data.scheduleData)
      this.getdata()
      // console.log("获取待办事件表数据成功",this.data.upcomingData)

    },

    onReady:function () {
      // console.log("页面初次加载完成")
      // console.log("获取事件表数据成功1",this.data)

      // console.log("获取事件表数据成功2",this.data.scheduleData[0])
      // console.log("获取待办事件表数据成功",this.data.upcomingData)

    },


    //获取待办事件数据
    getdata:function() {
      //获取product数据库信息
        upcoming.where({_openid:app.globalData.openid}).get().then(res => {
          this.setData({
            upcomingData: res.data
          })
          // console.log(this.data.upcomingData)

        })
      },

  //获取时间表的数据
  getSchedule:function(){
    db.collection("schedule").where({_openid:app.globalData.openid}).get().then(res => {
      this.setData({
        scheduleData: res.data,
        openid:res.data[0]._openid
      })
    console.log("获取成功111",res.data[0]._openid)
    console.log("获取成功22",this.data.openid)
    })
  }, 



    //时间表点击按钮
   popup:function() {
    //每次点击时间表都重新加载一些页面，解决连续添加两次第二次不实时显示问题
    //  this.onLoad()
    this.getSchedule();
    this.setData({ show: true });

   },
      
  Onsubmit:function(event){
    console.log(event.detail.value);
    //将从前端获取的数据添加到数据库中
    upcoming.add({
      data:{
        name: event.detail.value.name,
        value: event.detail.value.value
      }
    },
    this.getdata(),
    this.go(),
    // this.onReady()
    //这里有时候会有bug添加完后不立即显示在首页
    // console.log(this.data.upcomingData)
    // this.onPullDownRefresh()
    )},



    //监听下拉刷新
    onPullDownRefresh: function () {
        this.getdata()
        console.log("下拉刷新了")
        wx.stopPullDownRefresh()

    },


















  preventTouchMove: function() {

  },

  addClick: function() {
    this.setData({
    showModal: true
    })
},

onClose() {
  this.setData({ show: false });
},
  go: function() { 
      this.setData({
      showModal: false
      })
  },
  cancel:function(){
    this.go()
  },


})