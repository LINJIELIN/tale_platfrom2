<template>
  <div align="center">
    <div class="demo-input-suffix" style="position:relative;left:-12%;">
      按名字查询：
      <el-input style="width:20%;"
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="inputName">
      </el-input>
      <el-button @click="getAllPage" type="text" size="small">查看</el-button>

      <el-button @click="getAllUser2" type="text" size="small">查看2222</el-button>
    </div>
    <hr>
    <div align="center">
      <el-table :data="user" border style="width: 50% " class="table" :header-cell-style="{'text-align':'center'}">
        <el-table-column prop="id" label="编号" width="100"align="center">
        </el-table-column>
        <el-table-column prop="account" label="用户名" width="100"align="center">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="110"align="center">
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="110"align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="150"align="center">
        </el-table-column>
        <el-table-column prop="roleName" label="权限名" width="100"align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="110"align="center">
          <template slot-scope="scope" content="normal">
            <el-button @click="handleClick(scope.row.id)" type="text" size="small">修改</el-button>
            <el-button @click="deleteById(scope.row.id)"class="delete" type="text" size="small"><span style="color: red">删除</span></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
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
    <el-dialog class="plan-eff-dialog" title="修改用户信息" :visible.sync="editUserInfo" width="40%">
      <template>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="编号"  style="margin-top:30px;">
            <el-input v-model="formInline.id" ></el-input>
          </el-form-item>
          <el-form-item label="姓名" style="margin-left:60px;margin-top:28px;">
            <el-input v-model="formInline.name" ></el-input>
          </el-form-item>
          <el-form-item label="用户名" style="margin-left:-16px;margin-top:30px;">
            <el-input v-model="formInline.userName" ></el-input>
          </el-form-item>
          <el-form-item label="电话" style="margin-left:58px;margin-top:30px;">
            <el-input v-model="formInline.phone" ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" style="margin-left:71px;margin-top:30px;">
            <el-input v-model="formInline.email" ></el-input>
          </el-form-item>
          <el-form-item label="权限" style="margin-left:51px;margin-top:30px;">
            <el-select v-model="formInline.root"  >
              <el-option label="管理员" value="管理员"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 40px;margin-top: 40px;">
            <el-button type="primary" @click="onSubmit">修改</el-button>
          </el-form-item>
          <el-form-item style="margin-bottom: 40px;margin-top: 40px;">
            <el-button type="primary" @click="onSubmit">关闭</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  import Message from "element-ui/packages/message/src/main";
  export default {
    data(){
      return {
        editUserInfo:false,

        inputName:'',

        total:'',
        currentPage:1,
        size: 5,

        formInline: {
          id: '',
          userName:'',
          region: '',
          name:'',
          phone:''
        },
        user:{
          id:'',
          account:'',
          name:'',
          phone:'',
          email:'',
          roleName:''
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
      }
    },
    created:function() {
      this.getAllPage();
    },
    methods: {
      handleClick(id){
        this.editUserInfo = true;
      },

      clean:function(){
        this.inputName='';
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
        axios.get("http://localhost:8082/user/list",{
          params:{
            page:this.currentPage,
            size:this.size,
            name:this.inputTitle,
            retrieve:this.inputRetrieve,
          }
        }).then(function (res) {
          const resData = res.data;
          console.log(resData);
          if (resData.code == 0 ) {
            _this.user = resData.data.data;
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

      getAllUser2() {
        let _this = this;
        axios.get("http://localhost:8082/lostAndFound/")
          .then(function (response) {
            const resData = response.data;
            console.log(resData.data)
            if (resData.code == 0) {
              _this.user = resData.data
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

      getAllUser() {
        let _this = this;
        axios.get("http://localhost:8082/user")
          .then(function (response) {
            const resData = response.data;
            console.log(resData.data)
            if (resData.code == 0) {
              _this.user = resData.data
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
          this.getAllUser();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '放弃本次操作'
          });
        });

      },
      handleDelete(index,row) {
        axios.delete("http://localhost:8084/user/"+ index)
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
            this.getAllUser();
          })
      }
    }
  }
</script>
<style>
  /* 修改element-ui的弹出框样式 */
  .plan-eff-dialog /deep/.el-dialog{border-radius:6px;}
  .plan-eff-dialog /deep/.el-table thead{height:32px;background:rgba(240,242,244,1);}
  .plan-eff-dialog /deep/.el-table--small th{padding: 2px 0;}
  .plan-eff-dialog /deep/.el-dialog__header{padding: 7px 20px 1px;height: 32px;background:rgba(236,237,239,1);box-shadow:0px -1px 0px 0px rgba(220,225,230,1);border-radius:6px;}
  .plan-eff-dialog /deep/.el-dialog__title{font-size:14px;font-family:MicrosoftYaHeiUI-Bold;font-weight:bold;color:rgba(35,44,69,1);line-height:28px;}
  .plan-eff-dialog /deep/.el-dialog__headerbtn{top:8px; right:8px; }
  .plan-eff-dialog /deep/.el-dialog__headerbtn .el-dialog__close{color:red;font-weight:900;}
  .plan-eff-dialog /deep/.el-dialog__body{padding:15px 20px 0 20px;}
</style>
