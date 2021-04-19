<template>
  <el-card class="animated zoomIn" v-if="isShowPage">
    FriendLink
  </el-card>
</template>

<script>
export default {
  name: 'FriendLink',
  components: {

  },
  data () {
    return {
      isShowPage: false,
    }
  },
  created() {
    this.isShowPage = true
  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
.el-card{
  width: 100%;
  height: 500px;
}
</style>
