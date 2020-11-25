<template>
  <div class='shiMask'>
    <div class="text" v-for="(item, index) in shiData" :key="index">
      <p>{{item.label}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShiMask',
  components: {

  },
  props:{
    'shiData': {
      type: Array
    }
  },
  data () {
    return {

    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
  .shiMask .text:nth-of-type(1){
    position: absolute;
    top: 0;
    font-size: 28px;
  }
  .shiMask .text:nth-of-type(2){
    position: absolute;
    top: 50px; 
  }
  .shiMask .text:nth-of-type(3){
    position: absolute;
    top: 100px;
  }
  .shiMask .text:nth-of-type(4){
    position: absolute;
    top: 150px;
  }
  .shiMask .text:nth-of-type(5){
    position: absolute;
    top: 200px;
  }
.text {
    width: 100%;
    /* height: 20%; */
    text-align: center;
    background-image: -webkit-linear-gradient(left, #147B96, #FFE1FF 25%, #147B96 50%, #FFF0F5 75%, #147B96);
    -webkit-text-fill-color: transparent;
    /* 将字体设置成透明色 */
    -webkit-background-clip: text;
    /* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
    -webkit-background-size: 200% 100%;
    -webkit-animation: masked-animation 4s linear infinite;
    font-size: 22px;
  }

  @keyframes masked-animation {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: -100% 0;
    }
  }
</style>
