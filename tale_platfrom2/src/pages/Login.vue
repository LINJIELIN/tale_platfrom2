<template>
  <div>
    <el-form ref="user" :model="user" :rules="rules"  label-width="20%" class="login" >
      <div style="height: 200px"></div>
      <h1 style="color: black;">暖寻校园失物招领系统</h1>

      <h5>也可以使用学号、手机号登录哦</h5>
      <el-form-item prop="account" label="账号：" style="width: 70%; margin-left: 7%" >
        <el-input type="text"   auto-complete="off" placeholder="账号" v-model="user.account"></el-input><br>
      </el-form-item>
      <el-form-item prop="pwd" label="密码：" style="width:70%;margin-left: 7%">
        <el-input type="password"  auto-complete="off" placeholder="密码" v-model="user.pwd"></el-input><br>
      </el-form-item>

      <template>
        <div style="margin-left:-40px; ">
          <label>验证码:</label>
          <input type="text"  placeholder="请输入验证码" class="pic" v-model="user.pic">
          <el-button @click="createCode" >
            <el-input style="width: 54px;"  v-html="checkCode"></el-input>
          </el-button>
        </div>
      </template>

      <!--<el-form style="width:100%;">-->
        <!--<el-button type="primary"  @click.native.prevent="handleLogin" round style="width:20%;margin-top:0%;margin-left:-3%">登录</el-button><br>-->
        <!--<el-button @click="register" type="primary" round>注册</el-button><br>-->
      <!--</el-form>-->

      <br>
      <br>
      <span  style="margin-left:0%">
          <el-button id="aaa" type="success" @click.native.prevent="handleLogin" round style="width: 20%">登录</el-button>
        </span>
      <span style="margin-left:10%;">
          <el-button id="bbb" type="success" @click.native.prevent="register" round style="width: 20%">注册</el-button>
        </span>

    </el-form>
  </div>

</template>

<script>
import api from "../api/Api";
import axios from 'axios';

export default {
  data() {
    return {
      checkCode:'',
      user: {
        account: '',
        pwd: '',
        pic: ''
      },
      rules: {
        account: [{required: true, message: '请输入用户名', trigger: 'blur'}, ],
        pwd: [ {required: true, message: '请输入密码', trigger: 'blur'}, ],
        pic: [ {required: true, message: '请输入验证码', trigger: 'blur'}, ],
      },
      checked: true
    }
  },
  created() {
    this.createCode();
  },
  methods: {
    register(){
      this.$router.push({ path: '/register' });
    },

    handleLogin() {
      if ( this.isCode() != 0 ) {
        this.$message({
          message:"验证码不正确！",
          type: 'error'
        });
      }
      var params = new URLSearchParams();
      params.append("account", this.user.account);
      params.append("password", this.user.pwd);
     // alert(this.user.account);
      //api.requestLogin(params).then(res => res.data)

      api.requestLogin(params).then(res => {
        console.log(res);
        if (res.code == "0"){
          //跳转到后台主界面\\
          sessionStorage.setItem('getUserName', res.data.account);
          this.$router.push({ path: '/index' });
          this.$message({
            message: '登录成功',
            type: 'success'
          });
        }
        else{
          this.$message({
            message: res.data,
            type: 'error'
          });
        }
      });
    },

    createCode(){
      //先清空验证码的输入
      this.code = "";
      this.checkCode = "";
      //验证码的长度
      var codeLength = 4;
      //随机数
      var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
      for(var i = 0; i < codeLength; i++) {
        //取得随机数的索引（0~35）
        var index = Math.floor(Math.random()*36);
        //根据索引取得随机数加到code上
        this.code += random[index];
      }
      //把code值赋给验证码
      this.checkCode = this.code;
    },

    isCode() {
      var pic =this.user.pic.toUpperCase();
      if (this.code == pic) {
        return 0;
      } else {
        return 1;
      }
    }
  }
}
</script>

<style>
  body{
    background: url('../assets/系统背景图.png');
  }
  .login {
    margin-top: 150px;
    margin-left: 718px;
    width: 470px;
    height: 580px;
    background-image: url("../assets/登录背景.png");
    background-origin: border-box;
    opacity: 20%;

  }
  .a{
    /*background-color: #DDF0ED;*/
    width: 35%;
    height: 50%;
    margin-top: 20%;
    margin-left: 40%;

  }
  .pic{
    font-family: 'Exo 2', sans-serif;
    border: 1px solid #fff;
    color: #fff;
    outline: none;
    border-radius: 12px;
    letter-spacing: 1px;
    font-size: 17px;
    font-weight: normal;
    background-color: rgba(82, 56, 76, 0.15);
    padding: 5px 0 5px 10px;
    height: 30px;
    margin-top: 25px;
    border: 1px solid #e6e6e6;
  }
</style>
