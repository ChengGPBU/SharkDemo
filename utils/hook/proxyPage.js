const originalPage = Page;

// 缓存已经代理的函数，使用函数名作为键
const proxiedFunctions = new Map();

Page = function(options) {
  // 使用 Proxy 来包装 options 对象
  const pageProxyHandler = {
    get(target, property, receiver) {
      if (typeof target[property] === 'function' && property in target) {
        // 如果缓存中已经有对应属性的代理函数，则直接返回
        if (proxiedFunctions.has(property)) {
          return proxiedFunctions.get(property);
        }

        // 否则，创建一个新的代理函数
        const originalFn = target[property];
        const proxiedFn = function(...args) {
          // 在原始生命周期函数之前执行自定义逻辑
          console.log(`111111 Before ${property}`, this.route);

          // 调用原始的生命周期函数
          const result = originalFn.apply(this, args);

          // 在原始生命周期函数之后执行自定义逻辑
          console.log(`111111  After ${property}`, this.route);

          // 返回原始函数的结果
          return result;
        };

        // 缓存代理函数
        proxiedFunctions.set(property, proxiedFn);

        // 返回代理函数
        return proxiedFn;
      }

      // 如果属性不是函数或者没有被拦截，则返回原属性值
      return Reflect.get(target, property, receiver);
    }
  };

  // 创建 Proxy 实例
  const pageProxy = new Proxy(options, pageProxyHandler);

  // 使用 Proxy 包装后的对象调用原始的 Page 函数
  return originalPage(pageProxy);
};

export {}
