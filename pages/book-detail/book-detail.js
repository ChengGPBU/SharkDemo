// pages/book-detail/book-detail.js

import { BookModel } from '../../models/book.js';
import { LikeModel } from '../../models/like.js';


const bookModel = new BookModel();
const likeModel = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:null,
    comments:[],
    likeStatus:false,
    likeCount:0,
    posting:false,
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中…',
    })
      const bid = options.bid;

    const detail = bookModel.getDetail(bid);
    const comments = bookModel.getComments(bid);
    const likeStatus = bookModel.getLikeStatus(bid);


    Promise.all([detail, comments, likeStatus]).then((res)=>{
      this.setData({ book: res[0], comments: res[1].comments, likeStatus: res[2].like_status, likeCount: res[2].fav_nums });
      wx.hideLoading();
    });
  },


  /**
    * 点赞
    */
  onLike: function (e) {
    const behavior = e.detail.behavior;
    const { id } = this.data.book;
    likeModel.like(behavior, id, 400);  // 400 是书籍的类型
  },

  /**
   * 评论展示展示
   */
  onFakePost:function(e) {
      this.setData({posting:true});
  },


  /**
   * 取消  评论隐藏
   */

  onCancel:function() {
    this.setData({ posting: false });
  },


  onTap:function(e) {
    const content = e.detail.text || e.detail.value;
    const bid = this.data.book.id;

    if (!content) {
      return;
    }

    if(content.length >12) {
      wx.showToast({
        title: '短评最12个字',
        icon:"none",
      })

    }

    bookModel.postComment(bid, content).then((res)=>{
        wx.showToast({
          title: '+1',
          icon: "none",
        })
      // 提交成功  添加一个新的comment 
      this.data.comments.unshift({
          content,
          nums:1,
        });

      console.log(this.data.comments);
      // 刷新数据
      this.setData({ comments: this.data.comments,posting:false });
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