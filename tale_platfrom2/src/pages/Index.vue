<template>
  <div>
    <div style=" font-size: 45px;margin-top:10px;margin-left:-35px;,font-family: 黑体">欢迎来到暖寻校园失物招领系统!!!!</div>
    <div style="width: 1200px; margin-left: 100px; margin-top:25px;" >
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div style="position:absolute;left: 408px;top: 560px;">
      <div style="background:rgba(175,192,168,0.5);width: 1200px;height: 350px;border-radius:6px 6px 6px 6px;">
        <div>
        <i style="position:absolute;left:27px;top:7px;" class="titleOrgBg"></i>
        <span style="font-size:30px;padding-top:17px;display: block;">系统公告</span>
        </div>

        <div class="table_c" >
          <div class="table_all">
              <el-table  style="background:rgba(175,192,168,0.5);" show-header=false :data="notice" border  :row-style="getRowClass" :header-row-style="getRowClass" :header-cell-style="getRowClass">
                <!--<el-table-column prop="title" width="230" label="标题" align="center">-->
                <!--</el-table-column>-->
                <!--<el-table-column prop="content" width="835" label="内容" align="left">-->
                <!--</el-table-column>-->
                <!--<el-table-column prop="createTime"  width="110" label="发布时间"  align="right">-->
                <!--</el-table-column>-->

                <el-table-column prop="content" width="1055" label="内容" align="left">
                </el-table-column>
                <el-table-column prop="createTime"  width="120" label="发布时间"  align="right">
                </el-table-column>
              </el-table>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Message from "element-ui/packages/message/src/main";
  export default {
    name: "Index.vue",
    data () {
      return {
        notice: {
          id:'',
          content: '',
          createTime:'',
        }
      }
    },
    created:function() {
      this.getAllNotice();
    },
    methods: {
      getRowClass ({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background:rgba(175,192,168,0);text-align:center;font-size:16px;font-weight:500;'
        } else {
          return 'background:rgba(175,192,168,0);text-align:center;font-size:16px;font-weight:500;'
        }
      },

      getAllNotice: function () {
        let _this = this;
        axios.get("http://localhost:8082/notice/home")
          .then(function (response) {
            const resData = response.data;
            console.log(resData);
            if (resData.code === "0") {
              _this.notice = resData.data.data;
              console.log(_this);
            }
          })
          .catch(function (response) {
            Message({
              showClose: true,
              message: "失败:",
              type: "error"
            });
          });
      },

    },
    // computed:{
    //   containerStyle() {
    //     return {
    //       transform:`translate3d(${this.distance}px, 0, 0)`
    //     }
    //   }
    // }
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
    background-image: url("../assets/闽江学院5.png");
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
  .table_c {
    width: 98%;
    height: 200px;
    border-top-color: rgba(0,0,0,0.4);
    /*background:#3f5c6d2c;color:#000;*/
    background-size: 100% auto;
    padding: 10px;

  }


</style>
