// components/like/index.js
Component({

  properties:{
    like:{
      type:Boolean,
      value:true,
      observer:function() {
        //当like 变化的时候 自动执行
      },
    },

    count:{
      type:Number,
      value:3,
    },

    readOnly: {
      type:Boolean,
    }
  },

  data: {
   
  },

  methods: {
    onLike:function(event){
      if(this.properties.readOnly) {
        return;
      }
      let like = this.properties.like;
      let count = this.properties.count;
      count = like ? count - 1 : count + 1;
      this.setData({like:!like,count});

      let behavior = this.properties.like ? 'like':'cancel';
      //激活一个事件
      this.triggerEvent("like",{
        behavior:behavior
      })
    }

  }


});