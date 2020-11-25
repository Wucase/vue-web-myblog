<template>
  <div class='btns'>
    <a class="btn" id="mybtn" @click="myBtns($event)">首页
      <span id="spanID" :class="{spanClass:showClass}"></span>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'Btns',
    props: {
      "showMenu":Boolean,
      "btnOptions": Array
    },
    components: {

    },
    data() {
      return {
        showClass: false
      }
    },
    created() {
      // console.log("===op===", this.btnOptions);
    },
    methods: {
      myBtns(e) {
        console.log("===op===", this.btnOptions);
        let span = document.getElementById("spanID")
        console.log("left------", e.offsetX);
        span.style['left'] = e.offsetX + "px";
        span.style['top'] = e.offsetY + "px";
        this.showClass = true
        setTimeout(() => {
          this.showClass = false
        }, 700)
        this.$emit("btnClick")
      }
    }
  }
</script>

<style lang='scss' scoped>
  .btn {
    margin: 10px 0;
    display: inline-block;
    width: 100px;
    height: 45px;
    background: linear-gradient(90deg, #2af598, #009efd);
    text-transform: uppercase;
    color: #fff;
    text-align: center;
    line-height: 45px;
    border-radius: 40px;
    user-select: none;
    position: relative;
    overflow: hidden;
  }

  .spanClass {
    border-radius: 50%;
    display: inline-block;
    background-color: #fff;
    position: absolute;
    transform: translate(-50%, -50%);
    animation: tran .6s linear alternate;
  }

  @keyframes tran {
    0% {
      width: 0;
      height: 0;
      opacity: .6;
    }

    100% {
      width: 500px;
      height: 500px;
      opacity: 0;
    }
  }
</style>