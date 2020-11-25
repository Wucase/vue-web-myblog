<template>
  <div class='btnMenu'>
    <div class="btn" v-for="(item, index) in btnOptions" :key="index">
      <el-button round @click="toPage(item)">{{item.label}}</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    components: {

    },
    props: ["btnOptions"],
    data() {
      return {

      }
    },
    created() {
      console.log("-----------", this.btnOptions);
    },
    methods: {
      toPage(data){
        console.log(data.path);
        this.$router.push(data.path)
      }
    }
  }
</script>

<style lang='scss' scoped>
  .btnMenu {
    width: 100%;
    text-align: center;

    .el-button {
      width: 50%;
      margin-top: 20px;
      position: relative;
      top: 0;
      left: 0;
      &::after{
        content: '';
        width: 0;
        height: 2px;
        background-color: #eeee00;
        position: absolute;
        top: 50%;
        left: 50%;
        transition: all 0.7s linear;

      }
      &:hover:after{
        width: 80%;
        left: 10%;
      }
    }
  }
</style>