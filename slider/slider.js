// slider/slider.js
var offsetAll = 0;
var slideIndex = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前显示的下标，也就是当前显示的下标
     pageIndex:3,
     array:["1","2","3","4","5","6"],
     // slide下标
     slideIndex:1,
     //容器的偏移下标
     offsetAll:0,
     slides:[-100,0,100],
     // 外部容器的偏移量
     offsetStyle:"translateX(0%) translateZ(0)",
     touch:{
       x:0,
       y:0
     },
    windowWidth:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth
        })
      }
    })
  },
  // 单步移动
  _step: function (offset) {
    offsetAll += offset;
    slideIndex += offset;
    

    this._calcSlide();

  },
  _calcSlide: function () {

    // 
    slideIndex = this._normIndex(slideIndex, 3);
   // var pageIndex = this.pageIndex = this._normIndex(this.pageIndex, this.pageNum);
    
    var prevSlideIndex = this._normIndex(slideIndex - 1, 3);
    var nextSlideIndex = this._normIndex(slideIndex + 1, 3);

    var slides = this.data.slides;

    // 三个slide的偏移
    slides[slideIndex] = (offsetAll) * 100
    slides[prevSlideIndex] = (offsetAll - 1) * 100 
    slides[nextSlideIndex] = (offsetAll + 1) * 100 

    // 容器偏移
    var offsetStyle = 'transform:translateX(' + (-offsetAll * 100) + '%) translateZ(0)'


    // 当前slide 添加 'z-active'的className
    this.setData({
      slides,
      offsetStyle
    })


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  _normIndex: function (index, len) {
    return (len + index) % len
  },
  // 开始粗发
  touchStart(e) { 
    // console.log(e)
    this.setData({
      "touch.x": e.changedTouches[0].clientX,
      "touch.y": e.changedTouches[0].clientY
    });
  },
  // 手指一动
  touchMove(e) {
    console.log(22)
      if(this.data.windowWidth){
        console.log(e)
       
         this.setData({
           offsetStyle: `transition-duration: 0s;transform:translateX(${-this.data.windowWidth * offsetAll + parseInt(e.changedTouches[0].clientX) - parseInt(this.data.touch.x)}px) translateZ(0)`
         })
      }
  },
  //结束触发
  touchEnd(e) {
    let x = e.changedTouches[0].clientX;
    let y = e.changedTouches[0].clientY;
    var turn =  this.getTouchData(x, y, this.data.touch.x, this.data.touch.y);
    if(turn == "left"){
      this.next()
    } else if (turn == "right"){
      this.prev()
    }else{
      this._step(0);
    }
  },
  getTouchData (endX, endY, startX, startY){
    let turn = "";
    console.log(endX, endY, startX, startY)
    if (endX - startX > 50 ) {      //右滑
      turn = "right";
    } else if (endX - startX < -50 ) {   //左滑
      turn = "left";
    }
    return turn;
  },
  /**
   * 上一页
   */
  prev: function () {
    this._step(-1);
  },
  /**
   * 下一页
   */
  next: function () {
    this._step(1);
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