<template>
  <div class='loading' v-if="show" >
    <div class="container">
      <div class="loader">
          <div class="petal" style="--i:1"></div>
          <div class="petal" style="--i:2"></div>
          <div class="petal" style="--i:3"></div>
          <div class="petal" style="--i:4"></div>
          <div class="petal" style="--i:5"></div>
          <div class="petal" style="--i:6"></div>
          <div class="petal" style="--i:7"></div>
          <div class="petal" style="--i:8"></div>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    show: Boolean
  },

}
</script>

<style lang='scss' scoped>
@import './style.css';


.loading{
  width: 100%;
  height: 100%;
  background-color: #2c3e50;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 999;
  
  .container{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
}
</style>
