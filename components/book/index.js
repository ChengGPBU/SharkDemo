// components/book/book.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book:Object,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    onTap:function() {
      const bid = this.properties.book.id;
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${bid}`,
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }

  }
})
