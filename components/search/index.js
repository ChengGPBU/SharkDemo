// components/search/index.js

import { KeywordModel } from '../../models/keyword.js'
import { BookModel } from '../../models/book.js'

import { paginationBev } from '../behaviors/pagination.js';


const keyWordModel = new KeywordModel();
const bookModel = new BookModel();



Component({

  /**
   * 组件的属性列表
   */

  behaviors: [paginationBev],
  properties: {
    more: {
      type:String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    searching:false,
    keyword:"",
    loading:false,
    loadingCenter:false,
  },

  /**
   * 组件附载的时候
   */
  attached() {

    this.setData({ historyWords: keyWordModel.getHistory() });

    keyWordModel.getHot().then((res)=> {
     this.setData({hotWords:res.hot});
   });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //取消
    onCancel:function() {
      // 初始化数据
      this.initialize();
      this.triggerEvent("cancel",{},{})
    },

    //tag 被点击的时候  确认
    onConfirm:function(e) {
     
      const keyword = e.detail.value || e.detail.text;
      this.setData({ keyword });
      this._showLoadingCenter();
      //先让组件展示 
      this._showResult();
      // 查询
      bookModel.searchBook(keyword,0).then((res)=>{
        //保存数据
        this.setMoreData(res.books);
        //保存总数
        this.setTotal(res.total);

        // 保存查询的关键字
        keyWordModel.addToHistory(keyword); 
        this._hideLoadingCenter();
      });
    },

    // 是否展示搜索结果
    _showResult() {
      this.setData({ searching: true });
    },

    // 删除搜索文本
    onDelete:function() {
      // 初始化数据
      this.initialize();
      this.setData({ keyword: "", searching: false });
    },

    // 加载更多数据  分页加载
    loadMore:function() {
      const {keyword} = this.data;
      const currentStart = this.getCurrentStart();
      
      //如果空关键字
      if (!keyword) {
        return;
      }
      // 如果正在加载
      if (this._isLocked()) {
        return;
      }
      // 是否还有更多
      if(this.hasMore()) {
        // 加锁
        this.lockAndUnLock(true);
        // 查询
        bookModel.searchBook(keyword, currentStart).then((res) => {
          //保存数据
          this.setMoreData(res.books);
          // 解锁
          this.lockAndUnLock(false);
        }).catch(()=>{
          // 解锁
          this.lockAndUnLock(false);
        });
      }
    },

    // 是否锁住
    _isLocked() {
      return this.data.loading ? true:false;
    },

    _showLoadingCenter() {
      this.setData({loadingCenter:true});
    },


    _hideLoadingCenter(){
      this.setData({ loadingCenter: false });
    },
  },

})
