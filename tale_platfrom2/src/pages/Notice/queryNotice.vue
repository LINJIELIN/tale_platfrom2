<template>
  <div align="center">
    <div class="demo-input-suffix" style="position:relative;left:-8%;">
      按标题查询：
      <el-input style="width:20%;"
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="inputTitle">
      </el-input>

      <el-button @click="getAllPage" type="text" size="small">查看</el-button>
    </div>
    <hr>

    <div align="center">
      <el-table :data="notice" border style="width: 65% " class="table" :header-cell-style="{'text-align':'center'}">
        <el-table-column prop="id" label="编号" width="100"align="center">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="250"align="center">
        </el-table-column>
        <el-table-column prop="content" label="公告内容" width="350"align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100"align="center">
          <template slot-scope="scope" content="normal">
            <el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
            <el-button @click="deleteById(scope.row.id)"class="delete" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="5"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import Message from "element-ui/packages/message/src/main";

  export default {
    data() {
      return {

        inputTitle:'',

        total:'',
        currentPage:1,
        size: 5,

        notice: {
          id:'',
          title: '',
          content: '',

        }
      }
    },
    created:function() {
      alert(23242);
      this.getAllPage();
    },
    methods: {

      clean:function(){
        this.inputTitle='';
      },

      handleSizeChange(val) {
        this.size = val;
        console.log(val);
        this.getAllPage();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
        this.getAllPage();
      },

      getAllPage:function(){
        let _this = this;
        //alert("进入分页");
        axios.get("http://localhost:8082/notice/list",{
          params:{
            page:this.currentPage,
            size:this.size,
            title:this.inputTitle,
          }
        }).then(function (res) {
          const resData = res.data;
          console.log(resData);
          if (resData.code == 0 ) {
            _this.notice = resData.data.data;
            _this.currentPage = resData.data.total.currentPage+1;
            _this.total = resData.data.total.total;
            console.log(_this.total);
          }
        }).catch(function(response){
          this.$message({
            showClose: true,
            message: response.data.data,
            type: 'error'
          });
        })
      },

      getAllNotice: function () {
        let _this = this;
        axios.get("http://localhost:8082/notice/list")
          .then(function (response) {
            const resData = response.data;
            console.log(resData);
            if (resData.code == "0") {
              _this.notice = resData.data
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

      deleteById(index) {
        this.$confirm('是否进行删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.handleDelete(index);
          this.getAllNotice();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '放弃本次操作'
          });
        });

      },

      handleDelete(index, row) {
        axios.delete("http://localhost:8082/notice/" + index)
          .then((response) => {
            const resDate = response.data;
            if (resDate.code == '0') {
              this.$message({
                showClose: true,
                message: "删除成功",
                type: 'success'
              });
            } else {
              this.$message({
                showClose: true,
                message: "删除失败",
                type: 'error'
              });
            }
            this.getAllNotice();
          })
      }
    }
  }
</script>

<style >

</style>
