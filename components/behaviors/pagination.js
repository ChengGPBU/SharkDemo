const paginationBev = Behavior({

  data:{
    dataArr:[],
    total:null,
    noneResult:false,
    loading: false,
  },

  
  methods: {
    // 添加新数据
    setMoreData(dataArr){
      // 合并数据
     const tempArray = this.data.dataArr.concat(dataArr);
     this.setData({dataArr:tempArray});
    },

    // 获取当前
    getCurrentStart() {
      return this.data.dataArr.length;
    },

    // 设置总数
    setTotal(total) {
      this.data.total = total;
      if(total == 0) {
        this.setData({noneResult:true});
      }
    },
    // 是否还有更多数据
    hasMore() {
      const currentDataNum = this.data.dataArr.length;
      const { total } = this.data;
      if (currentDataNum >= total) {
          return false;
      }
      return true;
    },
    // 初始化数据
    initialize() {
      this.setData({ dataArr: [], noneResult: false, loading:false});
      this.data.total = null;
    },

    // 加锁 解锁
    lockAndUnLock(flag) {
      this.setData({ loading: flag });
    },
  }
})


export { paginationBev };