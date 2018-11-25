// pages/classic/classic.js

import {ClassicModel} from '../../models/classic.js';
import {LikeModel} from '../../models/like.js';


const classicModel = new ClassicModel();
const likeModel = new LikeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData:{},
    latest:true,
    first:false,
    likeCount:0,
    likeStatus:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取最新期刊
    classicModel.getLatest((res)=>{
      this.setData({
        classicData:res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      });
    });
    
  },

  /**
   * 点赞
   */
  onLike: function (e){
    const behavior = e.detail.behavior;
    const {id,type} = this.data.classicData;
    likeModel.like(behavior,id,type);
  },


  /**
   * 获取点赞的状态
   */
  _getLikeStatus:function(artID,category) {
    likeModel.getClassicLikeStatus(artID,category,(res)=>{
        this.setData({
          likeCount:res.fav_nums,
          likeStatus:res.like_status
        });
    });
  },

  /**
   * 当前期的下一期
   */
  onLeft:function(e) {
    this._updateClassic('next');
  },

  /**
   * 当前期的上一期
   */
  onRight:function() {
    this._updateClassic('previous');
  },


  _updateClassic: function (nextOrPrevious) {
    const index = this.data.classicData.index;
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id,res.type);
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index),
      });

    });
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