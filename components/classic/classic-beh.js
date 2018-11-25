
/**
 * 组件公用属性的抽离  essay  movie music 都拥有img  content 的属性
 */
const classicBeh= Behavior({

  properties: {
    img:String,
    content:String,
    hidden: Boolean,
  }

})


export {classicBeh}