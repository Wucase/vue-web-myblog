<template>
  <el-card class="box-card animated search" :class="{zoomIn:articalBI}">
    <div slot="header" class="clearfix">
      <h2 style="font-size: 20px; color: rgb(153,153,153)">
        <span class="iconfont icon-remen title"></span>
        blog热门
      </h2>
    </div>
    <div class="typeList">
      <ul>
        <li v-for="(item, index) in typeList" :key="index">
          <div>{{index+1}}</div>
          <el-link :underline="false">{{item.label}}</el-link>
        </li>
      </ul>
    </div>

  </el-card>
</template>

<script>
  import { typeList } from './data.js'
  import { animate } from '@/utils/commonFun/myFun.js'
  export default {
    name: 'hotArticle',
    components: {

    },
    data() {
      return {
        articalBI: false,
        searchValue: '',
        typeList: typeList,
      }
    },
    created() {
      this.articalBI = true
    },
    methods: {

    }
     
  }
</script>

<style lang='scss' scoped>
  .search {
    /* height: 250px; */
    padding: 10px;
    box-sizing: border-box;
    margin: 20px 0;
  }

  /deep/ .el-card__header {
    padding: 10px 0;
  }

  .title {
    font-size: 20px;
    color: #6bc30d;
  }
  .typeList {
    margin: 10px 0;

    ul {
      list-style: none;
      position: relative;
      left: 0;
      top: 0;

      li {
        /* padding: 0 25px; */
        height: 39px;
        color: #787977;
        line-height: 39px;
        cursor: pointer;
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
       
        div{
         
          width: 25px;
          height: 25px;
          background-color: #ddd;
          border-radius: 50%;
          margin-top: 7px;
          text-align: center;
          line-height: 25px;
        }
        &:nth-child(1)>div {
            background-color: red;
            color: #fff;
          }
        &:nth-child(2)>div {
            background-color: skyblue;
            color: #fff;
          }
        &:nth-child(3)>div {
            background-color: #6bc30d;
            color: #fff;
          }
        .el-link{
          margin-left: 15px;
        }
      }
    }
  }

  
</style>