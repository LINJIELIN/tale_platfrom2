<template>
  <div>
    <el-form ref="user" :model="user" :rules="rules" label-width="30%" style="margin-left: 20%;margin-top: 8%">
      <h1 style="color: black;margin-left: -375px;">用户添加</h1>
      <el-form-item label="账号" prop="account" style="width: 80%;margin-top: 20px;">
        <el-input v-model="user.account" onkeyup="value=value.replace(/[^\a-\z\A-\Z]/g,'')" placeholder="请输入账号"style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>

      <el-form-item prop="name" label="姓名"  style="width: 80%;margin-top: 20px;">
        <el-input v-model="user.name"  placeholder="请输入用户名"style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>

      <el-form-item prop="password" label="密码" style="width: 80%;margin-top: 20px;">
        <el-input v-model="user.password" auto-complete="off" placeholder="请输入密码" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>

      <el-form-item prop="passwordRetry" label="确认密码" style="width: 80%;margin-top: 20px;">
        <el-input v-model="user.passwordRetry" auto-complete="off" placeholder="请再次输入密码" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>

      <el-form-item prop="studentID" label="学号" style="width: 80%;margin-top: 20px;">
        <el-input  placeholder="请输入学号" v-model="user.studentID" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>

      <el-form-item prop="phone" label="电话"  style="width: 80%;margin-top: 20px;">
        <el-input v-model="user.phone"placeholder="请输入电话" onkeyup="value=value.replace(/[^\d]/g,'')" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>

      <el-form-item prop="email" label="邮箱" style="width: 80%;margin-top: 20px;">
        <el-input  placeholder="请输入邮箱" v-model="user.email" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>
      <el-form-item prop="root" label="用户权限" style="width: 80%;margin-top: 20px;">
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
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 2, max:8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur'}
          ],
          passwordRetry:[
            { required: true, message: '请再次输入密码', trigger: 'blur'}
          ],
          studentID: [
            {required: true, message: '请输入电话', trigger: 'blur'}
          ],
          email: [
            {type:'email', required: true, message: '请输入正确的邮箱', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入电话', trigger: 'blur'}
          ],
          root: [
            {required: true, message: '请选择失物类型', trigger: 'ch'}
          ],
        }
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
            this.user.root='',
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
