<template>
  <div>
    <el-form ref="user" :model="user" :rules="rules" label-width="30%" style="margin-left: 20%;margin-top: 8%">
      <h1 style="color: black;margin-left: -375px;">用户添加</h1>
      <el-form-item label="账号" style="width: 80%">
        <el-input v-model="user.account" placeholder="请输入账号"style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>
      <el-form-item label="姓名" style="width: 80%">
        <el-input v-model="user.name" placeholder="请输入姓名"style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>
      <el-form-item label="密码" style="width: 80%">
        <el-input type="password" v-model="user.password" auto-complete="off" placeholder="请输入密码" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" style="width: 80%">
        <el-input type="password" v-model="user.passwordRetry" auto-complete="off" placeholder="请再次输入密码" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>
      <el-form-item label="电话" style="width: 80%">
        <el-input v-model="user.phone"placeholder="请输入电话" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" style="width: 80%">
        <el-input  placeholder="请输入邮箱" v-model="user.email" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>
      <el-form-item label="学号" style="width: 80%">
        <el-input  placeholder="请输入学号" v-model="user.studentID" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>
      <el-form-item label="用户权限" style="width: 80%">
        <el-select v-model="user.root" placeholder="请选择用户权限" style="width: 50%;margin-left: -50%" >
          <el-option label="管理员" value="管理员"></el-option>
          <el-option label="普通用户" value="普通用户"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-left: -78%;margin-top: 30px;">
        <el-button type="primary" @click.native.prevent="addUser">立即添加</el-button>
        <el-button type="primary" @click="back">取消添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from 'axios';
  import Message from "element-ui/packages/message/src/main";
  export default {
    data() {
      return {
        user: {
          account: '',
          name:'',
          password:'',
          passwordRetry:'',
          phone:'',
          email:'',
          root:'',
          studentID:''
        },
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 3, max:8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          account: [
            {required: true, message: '请输入用户名', trigger: 'change'}
          ],
          password: [
            {type: true, required: true, message: '请输入密码', trigger: 'blur'}
          ],
          passwordRetry:[
            {type:  true, required: true, message: '请再次输入密码', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入电话', trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      created:function() {

      },
      back() {
            this.user.account='',
            this.user.name='',
            this.user.password='',
            this.user.passwordRetry='',
            this.user.phone='',
            this.user.email='',
            this.user.root=''
            this.user.studentID=''
      },
      addUser() {
        var _this = this;
        let form = new FormData();
        form.append("account", this.user.account);
        form.append("name", this.user.name);
        form.append("password", this.user.password);
        form.append("passwordRetry", this.user.passwordRetry);
        form.append("phone", this.user.phone);
        form.append("email", this.user.email);
        form.append("roleName", this.user.root);
        form.append("studentID", this.user.studentID);
        axios.post("http://localhost:8082/user", form, {
          "Content-Type": "multipart/form-data"
        }).then(function(res){
          if (res.data.code == 0) {
            Message({
              showClose: true,
              message: "添加成功",
              type: "success"
            });
            _this.back();
          } else {
            Message({
              showClose: true,
              message: "失败:" + res.data.data,
              type: "error"
            });
          }
        });
      }
    }
  }
</script>
<style>
  .el-form-item {
    margin-bottom: 5px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .sellout1{
    margin-right: 50%;
    width: 90%;
  }
</style>
