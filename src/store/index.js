import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建 Vuex 容器
const store = new Vuex.Store({
  // 容器的状态
  // 作用：类似于组件中的 data，存储需要共享的数据状态
  // 任何组件都可以访问或者修改容器中的 state 数据
  state: {
    count: 100,
    msg: 'hello'
  },

  // 作用：类似于组件中的 methods，用来修改容器数据的
  // 所有的 mutation 函数的第1个参数是 state 对象
  // Vuex 调试工具会把每个 mutation 函数的调用记录起来
  // 说白了，调试工具保存每一次状态改变的历史记录
  // 这个作用的目的是为了方便你调试，当数据非常复杂的时候，这个调试功能非常有用
  mutations: {
    increment (state, data) {
      console.log(data)
      // 注意：这里没有 this
      // 错误的：this.count++
      state.count += data.count
    },

    jian (state) {
      state.count--
    },

    hello () {
      console.log('store hello')
    },

    // 注意：mutation 必须是同步函数
    // 说白了就是不要在 mutation 中执行异步操作修改 state 状态
    // 为什么？因为调试工具懵逼了，无法正常工作了
    // 怎么办？使用 action
    changeCount (state) {
      // 定时器、发送请求等都是异步操作
      setTimeout(() => {
        state.count++
      }, 1000)
    }
  },

  // 作用：类似于 methods，但是专门用来执行异步操作
  // action 函数的第1个参数是 context 对象，简单理解就是 store 对象
  // 注意：只有 mutation 函数的调用才会被记录到历史记录中
  //       所以在 action 中正确的修改 state 的方式是提交 mutation
  // 总结正确使用方法：执行异步操作 -> 提交 mutation 修改 state
  actions: {
    asyncIncrement (context) {
      // 执行异步操作
      setTimeout(() => {
        // 修改 state
        // 错误的方式：context.state.count++
        // 正确的方式：提交 mutation 修改 state
        context.commit({
          type: 'increment',
          count: 1
        })
      }, 1000)
    },

    hello (context, msg) {
      console.log('store -> action -> hello', msg)
    }
  }
})

// 导出容器模块
// 注意：然后在 main.js 中把 store 配置到 Vue 根实例中
export default store
