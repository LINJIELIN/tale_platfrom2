<template>
  <div>
    <el-form ref="user" :model="user" :rules="rules" label-width="30%" style="margin-left: 20%;margin-top: 200px;">
      <h1 style="color: black;margin-left: -375px;">注册</h1>
      <el-form-item label="账号" prop="account" style="width: 80%">
        <el-input v-model="user.account" onkeyup="value=value.replace(/[^\a-\z\A-\Z]/g,'')" placeholder="请输入账号"style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>

      <el-form-item prop="name" label="用户名"  style="width: 80%">
        <el-input v-model="user.name"  placeholder="请输入用户名"style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>

      <el-form-item prop="name" label="密码" style="width: 80%">
        <el-input v-model="user.password" auto-complete="off" placeholder="请输入密码" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="确认密码" style="width: 80%">
        <el-input v-model="user.passwordRetry" auto-complete="off" placeholder="请再次输入密码" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="电话"  style="width: 80%">
        <el-input v-model="user.phone"placeholder="请输入电话" onkeyup="value=value.replace(/[^\d]/g,'')" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="邮箱" style="width: 80%">
        <el-input  placeholder="请输入邮箱" v-model="user.email" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>
      <el-form-item style="margin-left: -75%">
        <el-button type="primary" @click.native.prevent="register">立即注册</el-button>
        <el-button @click="quxiao">返回</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import axios from 'axios';
  import Message from "element-ui/packages/message/src/main";
  export default {
    data(){
      return{
        user: {
          account: '',
          name:'',
          password:'',
          passwordRetry:'',
          phone:'',
          email:''
          // roleName:''
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max:8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          account: [
            {required: true, message: '请输入账号', trigger: 'change'}
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
        }
      }
    },
    methods: {
      quxiao() {
        alert(11111);
        this.$router.push({path: '/login'});
      },
      register() {
        alert(32432);
        let form = new FormData();
        form.append("account", this.user.account);
        form.append("name", this.user.name);
        form.append("password", this.user.password);
        form.append("passwordRetry", this.user.passwordRetry);
        form.append("phone", this.user.phone);
        form.append("email", this.user.email);
        //form.append("roleName", this.user.roleName);

        axios.post("http://localhost:8084/register", form, {
          "Content-Type": "multipart/form-data"
        }).then(function (res) {
          alert(33333);
          if (res.data.code == 0) {
            Message({
              showClose: true,
              message: res.data.data,
              type: "success"

            });
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

<style >

</style>
