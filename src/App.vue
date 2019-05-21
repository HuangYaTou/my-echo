<template>
  <div id="app">
    <!-- 视图层 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <!-- 音乐控制条 -->
    <music-bar></music-bar>

    <!-- 页面加载进度条 -->
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>
<!--
1.mint-ui
2.vue-progressbar
3.mock.js
 -->
<script>
import {mapState, mapActions} from 'vuex'
import MusicBar from '@/components/MusicBar'
export default {
  components: {
    MusicBar
  },
  computed: {
    ...mapState([
      'audio'
    ])
  },
  methods: {
    ...mapActions([
      'INIT_CACHE'
    ])
  },
  created() {
    this.INIT_CACHE();
    this.$Progress.start();
    this.$router.beforeEach((to, from, next)=>{
      this.$Progress.start();
      next();
    });
    this.$router.afterEach((to, from)=>{
      this.$Progress.finish();
    });
  },
  mounted() {
    this.$Progress.finish();
  }
}
</script>

<style lang='stylus'>
#app {
    position: relative;
    &.musicBar-on {
        padding-bottom: $musicBarHeight;
    }
    a {
        color: $linkColor;
    }
}
</style>
