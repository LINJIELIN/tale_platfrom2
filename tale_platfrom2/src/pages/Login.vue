<template>
  <div>
    <el-form ref="user" :model="user" :rules="rules"  label-width="20%" style=";margin-top:15%"
           class="demo-ruleForm login-container" >
      <i><h1 style="color: dodgerblue">我的天哪电影系统</h1></i>
        <el-form-item prop="username" style="width: 40%; margin-left: 25%" >
        <el-input type="text"   auto-complete="off" placeholder="账号" v-model="user.account"></el-input><br>
        </el-form-item>
        <el-form-item prop="pwd" style="width: 40%;margin-left: 25%">
        <el-input type="password"  auto-complete="off" placeholder="密码" v-model="user.pwd"></el-input><br>
        </el-form-item>
        <el-checkbox  v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form style="width:100%;">
        <el-button type="primary"  @click.native.prevent="handleLogin" round style="width:8%;margin-top:0%;margin-left:-3%">登录</el-button><br>
        </el-form>
    </el-form>
  </div>
</template>

<script>
//import api from '../api/Api';
import api from "../api/Api";
import axios from 'axios';

export default {
  data() {
    return {
      logining: false,
      user: {
        account: '',
        pwd: ''
      },
      rules: {

        pwd: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    }
  }, methods: {

    handleLogin() {
      var params = new URLSearchParams();
      params.append("account", this.user.account);
      params.append("password", this.user.pwd);
      alert(this.user.account);
      //api.requestLogin(params).then(res => res.data)

      api.requestLogin(params).then(res => {
        let {code,data} = res;
        if (code == '0'){
          //跳转到后台主界面
          this.$message({
            message: data,
            type: 'success'
          });
          this.$router.push({ path: '/home' });
        }
        else{
          this.$message({
            message: data,
            type: 'error'
          });
        }
      });


      // axios.post("http://localhost:8086/login",params).then(res => {
      //   alert("OK");
      //   alert(JSON.stringify(res));
      //   const response = res.data;
      //   if (response.code == '0'){
      //     //跳转到后台主界面
      //     this.$message({
      //       message: response.data,
      //       type: 'success'
      //     })
      //     this.$router.push({ path: '/home' });
      //   }
      //   else{
      //     this.$message({
      //       message: response.data,
      //       type: 'error'
      //     });
      //   }
      // })

    }
  }
}
</script>

<style>
  .remember{
  margin-right:25%;

}
</style>
