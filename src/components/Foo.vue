<template>
  <div class="foo">
    <!--
      使用 Vuex 容器中的数据：
        方式一：store.state.xxx
        在组件中我们可以通过 this.$store 来访问容器对象
        组件中的 this.$store 就是我们在容器模块中创建的 store 对象
        组件的模板中访问 this.数据 不需要加 this
        这种访问容器数据的方式不推荐，因为无法在调试工具组件中看到这个数据

        方式二：通过计算属性包装获取
          缺点：如果访问数据太多都这样写的话麻烦
                也无法通过调试工具看出来这个数据来自于容器

        方式三：使用 Vuex 提供的辅助方法 mapState
     -->
    <h2>Foo 组件</h2>
    <p>{{ count }}</p>
    <!-- <p>{{ hello }}</p> -->
    <!-- <p>{{ $store.state.count }}</p> -->

    <!--
      调用容器的 mutation 函数
      错误的：$store.mutations.increment()
      正确的：$store.commit('mutation函数名称')
     -->
    <button
      @click="$store.commit({
        type: 'increment', // 也可以直接通过对象的属性 type 来指定要调用的 mutation 函数的名称
        count: 2,
        num: 10
      })"
    >+</button>
    <!-- <button
      @click="$store.commit('increment', {
        count: 2,
        num: 10
      })"
    >+</button> -->
    <!-- <button
      @click="$store.commit('increment', 2)"
    >+</button> -->
    <!-- <button
      @click="$store.commit('increment')"
    >+</button> -->

    <!--
      mutation 函数的调用方式
      方式一：store.commit() 方法
      方式二：使用 mapMutations() 辅助方法
     -->
    <br>
    <button @click="increment({ count: 5 })">store increment</button>
    <br>
    <button @click="abc">abc -> store hello</button>

    <!-- mutation 必须是同步函数 -->
    <br>
    <button @click="$store.commit('changeCount')">mutation 必须是同步函数</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

// 返回一个对象，对象包含：
//    数据名：容器中数据的名称
//    数据值：一个函数，计算属性函数
//            调用该函数，返回容器对应的数据值
// const ret = mapState(['count', 'message'])

// console.log(ret)

export default {
  name: 'Foo',
  components: {},
  props: {},
  data () {
    return {
      // count: 0
      num: 100
    }
  },
  computed: {
    // mapState() 方法返回对象
    // ...对象 是意思是把对象展开，说白了就是把里面的数据成员一个一个的拿出来，放到使用 ... 的对象中
    // 还有一种叫法：对象混入或者对象拷贝
    // 使用注意：数据冲突的问题，合并的时候后者会覆盖前者
    // 大多数情况下该方式能满足需求
    ...mapState(['count', 'msg']),

    // 如果容器数据名称和本地数据名称有冲突，或者想要使用容器数据和本地数据混合处理使用，则必须使用下面这种方式
    // ...mapState({
    //   count: state => state.count,
    //   abc: state => state.count,
    //   // 等价于 state => state.count
    //   haha: 'count',
    //   // 如果你需要使用容器数据混合本地数据处理使用，那必须这么写。注意：不能使用箭头函数，否则 this 有问题
    //   total (state) {
    //     return state.count + this.num
    //   }
    // }),
    hello () {
      return 'world'
    }
  },
  // computed: Object.assign(
  //   mapState(['count', 'msg']),
  //   {
  //     hello () {
  //       return 'world'
  //     }
  //   }
  // ),
  // 说白了，就是把容器中的数据映射到组件的 computed 计算属性中
  // computed: mapState(['count', 'msg']),
  // computed: {
  //   hello () {
  //     return 'world'
  //   }
  // },
  // computed: {
  //   count () {
  //     return this.$store.state.count
  //   },
  //   hello () {
  //     return 'world'
  //   }
  // },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 把容器中的 mutation 函数映射到本地的 methods 中
    // 然后就可以像调用自己的 method 函数一样来调用容器中的 mutation 函数
    ...mapMutations({
      increment: 'increment',
      abc: 'hello'
    }),
    haha () {
      console.log('foo haha')
    }
    // ...mapMutations(['increment', 'hello'])
  }
}
</script>

<style scoped>
.foo {
  padding: 20px;
  border: 1px solid #000;
  margin-bottom: 30px;
}
</style>
