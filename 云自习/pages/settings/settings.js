const db=wx.cloud.database();
// const schedule=db.collection("schedule")
const app = getApp()

Page({

  /**
   * 页面的初始数据 
   */
  data: {
    value:"",
    table:[],//存放从数据表单中获取的数据
    schedultable:[]
  },

  // 获取form表单传来的数据
  Omsubmit:function(event){
     
    console.log("获取的表单",event)
    this.setData({
      table:event.detail.value
    })
    //调用更新时间表的函数
    this.updateschedule()


  },


  //更新时间表数据库内容函数
  updateschedule:function(){
    var that=this
    db.collection('schedule').where({_openid:app.globalData.openid}).update({
      data:{
        // t1: event.detail.value.t1,
        // t2: event.detail.value.t2,
        // t3: event.detail.value.t3,
        // t4: event.detail.value.t4,
        // t5: event.detail.value.t5,
        // t6: event.detail.value.t6,
        // t7: event.detail.value.t7,
        // t8: event.detail.value.t8,
        t1: this.data.table.t1,
        t2: this.data.table.t2,
        t3: this.data.table.t3,
        t4: this.data.table.t4,
        t5: this.data.table.t5,
        t6: this.data.table.t6,
        t7: this.data.table.t7,
        t8: this.data.table.t8,
      },
      success:function(res){
        //成功后弹出制定成功
        wx.showModal({
          title: '制定成功！',
          content: '',
          showCancel: true,
          confirmText: '确定',
          cancelText: '取消',
          cancelColor: '#000000',
          confirmColor: '#3CC51F',
          success: (result) => {
            //如果点击确定就设置input里的value值为空，达到清空的目的
            if(result.confirm){
              that.setData({
                value:''
              })
            }
          },
        });
      }
    })
  },
  //创建时间表函数
  createschedule:function(){
    db.collection("schedule").add({
      data:{
        t1:'',
        t2:'',
        t3:'',
        t4:'',
        t5:'',
        t6:'',
        t7:'',
        t8:'',
      }
    })

    
  },


  //获取时间表数据库的内容
  gettable:function() {
    db.collection("schedule").where({_openid:app.globalData.openid}).get().then(res =>{
      this.setData({
        schedultable:res.data
      })
      console.log("获取的时间表table数据",res.data)
      console.log("获取的时间表table数据长度",this.data.schedultable.length)

    })
  },

    // 首先获取数据库的数据
    // 如果为空则需要添加数据 
    // 如果不为空则要更新数据

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.openid)
    this.gettable()
    if(this.data.schedultable.length===0){
      this.createschedule()
    }else{
      this.Omsubmit()
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