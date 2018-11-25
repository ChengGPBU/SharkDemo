// pages/like/like.js

import { ClassicModel } from '../../models/classic.js';
import { BookModel } from '../../models/book.js';


const bookModel = new BookModel();
const classicModel = new ClassicModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized:false,
    userInfo:null,
    bookCount:0,
    classics:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized();
    this.getMyBookCount();
    this.getMyFavor();
  },

  /**
   * 获取我的书籍
   */

  getMyBookCount() {
    bookModel.getMyBookCount().then(res=>{
      this.setData({ bookCount: res.count});
    });
  },

  /**
   * 获取我喜欢的期刊信息
   */
  getMyFavor() {
    classicModel.getMyFavor().then(res=>{
      this.setData({classics: res});
    });
  },


  /**
   * 绑定授权按钮
   */
  getUserInfo:function(e) {
    console.log(e);
  },

  /**
   * 点击获取用户权限
   */
  onGetUserInfo(e) {
    const info = e.detail.userInfo;
    if(info) {
      debugger;
      this.setData({ userInfo: info, authorized: true });
    }
  },


  /**
   * 初始化  检测用户是否授权
   */
  userAuthorized() {
    wx.getSetting({
      success:data=>{
        if (data.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({ userInfo: res.userInfo, authorized: true });
            }
          })
        } else {
          
        }
      },
    })
  },

  /**
   * pages about页面
   */
  onJumpToAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },


  /**
   * 点击右上角学习
   */
  onStudy() {
    wx.navigateTo({
      url: '/pages/course/course',
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
})