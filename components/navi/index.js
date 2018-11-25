// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String, // 标题
    first: Boolean, // 是否第一期
    latest: Boolean // 是否最新一期
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'image/triangle.dis@left.png',
    leftSrc: 'image/triangle@left.png',
    disRightSrc: 'image/triangle.dis@right.png',
    rightSrc: 'image/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft:function(e) {
      if(!this.properties.latest) {
        this.triggerEvent('left', {}, {});
      }
    },
    onRight:function(e) {
      if(!this.properties.first) {
        this.triggerEvent('right', {}, {});
      }
    }
  }
})
