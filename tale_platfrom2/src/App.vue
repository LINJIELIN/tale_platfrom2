<template>
  <div id="app">
    <!--<img :src="formData.img" alt="">-->
    <!--<router-view v-wechat-title="$route.meta.title"/>-->
    <router-view/>
  </div>
</template>


<script>
  export default {
    name: 'App',
    data() {
      return {
        formData: {
          //avatar: require('@/assets/1.png'),
          //img: require('./assets/' + '1.jpg'),
        },
        routers: this.$router.options.routes
      }
    }
  }
</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
