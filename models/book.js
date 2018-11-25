import { HTTP } from '../utils/http.js';

export class BookModel extends HTTP {


  getHotList() {
    return this.requestPormise({
      url:'book/hot_list',
      // data:{
      //   name:'1',
      //   age:18,
      // },
      // method:'GET',
    });
  }


  getMyBookCount() {
    return this.requestPormise({
      url:'book/favor/count'
    });
  }

  /**
   * 获取图书详情
   * @param {number} bid 
   */
  getDetail(bid) {
    return this.requestPormise({
      url:`book/${bid}/detail`
    });
  }


  /**
   * 获取图书的点赞状态
   * @param {number} bid 
   */
  getLikeStatus(bid) {
    return this.requestPormise({
      url:`book/${bid}/favor`
    });
  }

  /**
   * 获取图书的短评信息
   * @param {number} bid 
   */
  getComments(bid) {
    return this.requestPormise({
      url:`book/${bid}/short_comment`
    });
  }


  /**
   * 书本详情 短评提交
   */
   postComment(bid,comment) {
     return this.requestPormise({
       url:'book/add/short_comment',
       method:'POST',
       data:{
          book_id:bid,
          content:comment,
       }
     });
   }


  /**
  * 搜索  分页加载
  * q: 查询关键字
  * start: 起始页
  */
  searchBook(q, start) {
    return this.requestPormise({
      url: 'book/search?summary=1',
      data: {
        q: q,
        start: start
      },
    });
  }

}