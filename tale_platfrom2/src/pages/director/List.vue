<template>
  <div align="center">
    <div class="demo-input-suffix" style="position:relative;left:-12%;">
      按名字查询：
      <el-input style="width:20%;"
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="inputUserName">
      </el-input>

      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-button @click="getAllDirector" type="text" size="small">查看</el-button>
    </div>
    <hr>

    <div align="center">
      <el-table :data="director" border style="width: 65%" class="table">

        <el-table-column prop="director" label="图片" min-width="20%" >
          <!-- 图片的显示 -->
          <template   slot-scope="scope">
            <img :src= "scope.row.image"  min-width="70" height="70" />
          </template>
        </el-table-column>

        <el-table-column
          prop="id"
          label="导演编号"
          width="100">
        </el-table-column>

        <el-table-column
          prop="name"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="50">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="出生日期"
          width="120">
        </el-table-column>
        <el-table-column
          prop="nationality"
          label="国籍"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope" content="normal">
            <el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
            <el-button @click="deleteById(scope.row.id)" class="delete" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>

    <!--<div>-->
      <!--<detail-update ref="detailAndUpdate" v-on:childMethod="getPackagingData" :message="employeeData.tableData" v-if="employeeData.tableData" :visible.sync="detailAndUpdate"></detail-update>-->

    <!--</div>-->
  </div>


</template>

<script>
  import axios from 'axios';
  //import DeatilAndUpdate from 'src/pages/director/DetailAndUpdate'
  import Message from "element-ui/packages/message/src/main";
  export default {
    data() {
      return {
        director: {
          id:'',
          name: '',
          sex: '',
          birthday: '',
          nationality: '',
          introduction: '',
          image:'',
        },
        //detailAndUpdate:false,
      }
    },
    components: {
      //'detail-update': DeatilAndUpdate,
    },
    created:function() {
      this.getAllDirector();
    },
    methods: {
      getAllDirector:function() {
        let _this = this;
        axios.get("http://localhost:8086/director/list")
          .then(function(response) {
            const resData = response.data;
            if (resData.code === 0) {
              _this.director = resData.data;
            }else {
              this.$message({
                showClose: true,
                message: resData.data,
                type: 'error'
              });
            }
          })
          .catch(function(response) {
            this.$message({
              showClose: true,
              message: response.data.data,
              type: 'error'
            });
          });
      },

      // handleClick:function(index) {
      //   this.detailAndUpdate.initMethdos(index);
      //   this.detailAndUpdate = !this.detailAndUpdate;
      // },

      deleteById(index) {
        this.$confirm('是否进行删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.handleDelete(index);
          this.getAllDirector();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '放弃本次操作'
          });
        });

      },

      handleDelete(index,row) {
        axios.delete("http://localhost:8086/director/"+ index)
          .then((response) => {
            const resDate = response.data;
            if(resDate.code == '0'){
              this.$message({
                showClose: true,
                message: "删除成功",
                type: 'success'
              });
            }else {
              this.$message({
                showClose: true,
                message: "删除失败",
                type: 'error'
              });
            }
            this.getAllDirector();
        })

      }
    }
  }
</script>

<style>
  .table{
    content: normal;
  }
  .delete{
    color: red;
  }
</style>
