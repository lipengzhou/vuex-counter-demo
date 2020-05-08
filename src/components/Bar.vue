<template>
  <div class="bar">
    <h2>Bar 组件</h2>
    <p>{{ $store.state.count }}</p>
    <p>
      <!--
        在组集中调用容器的 action 方法
        方式一：store.dispatch('action函数名称', 可选参数)
       -->
      <button
        @click="$store.dispatch('asyncIncrement')"
      >action increment</button>
    </p>
    <p>
      <button @click="hello('哈哈')">store -> action -> hello</button>
    </p>
    <button
      @click="$store.commit('jian')"
    >-</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Bar',
  components: {},
  props: {},
  data () {
    return {
      // count: 0
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    ...mapActions(['hello'])
  }
}
</script>

<style scoped>
.bar {
  padding: 20px;
  border: 1px solid #000;
}
</style>
