<template>
  <div>
    <div style=" font-size: 45px;margin-top:20px;margin-left:-35px;,font-family: 黑体">欢迎来到暖寻校园失物招领系统!!!!</div>
    <div style="width: 1200px; margin-left: 100px; margin-top:25px;" >
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div style="position:absolute;left: 408px;top: 580px;">
      <div style="background:rgba(175,192,168,0.5);width: 1200px;height: 300px;border-radius:6px 6px 6px 6px;">
        <div>
        <i style="position:absolute;left:27px;top:7px;" class="titleOrgBg"></i>
        <span style="font-size:30px;padding-top:17px;display: block;">系统公告</span>
        </div>

        <div align="center">
          <el-table :data="notice" style="width: 65%; background-color: rgba(0,0,0,0)" class="table" :header-cell-style="{'text-align':'center'}">
            <el-table-column  label="编号" style="background-color: rgba(0,0,0,0)"  width="100"align="center">
            </el-table-column>
            <el-table-column label="标题" width="250"align="center">
            </el-table-column>
            <el-table-column label="公告内容" width="350"align="center">
            </el-table-column>

          </el-table>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
  export default {
    name: "Index.vue",
    data () {
      return {
        notice: {
          id:'',
          title: '',
          content: '',

        }
      }
    },
    computed:{
      containerStyle() {
        return {
          transform:`translate3d(${this.distance}px, 0, 0)`
        }
      }
    }
  }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(4n) {
    background-image: url("../assets/闽江学院1.jpg");
  }

  .el-carousel__item:nth-child(4n+1) {
    background-image: url("../assets/闽江学院2.jpg");
  }
  .el-carousel__item:nth-child(4n+2) {
    background-image: url("../assets/闽江学院3.jpg");
  }
  .el-carousel__item:nth-child(4n+3) {
    background-image: url("../assets/闽江学院4.jpg");
  }
</style>
