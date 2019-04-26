<template>

    <el-container class = container>
      <el-aside class=aside width="15%">

        <div style="color: #fff;font-size: 22px;">
          <h1>暖寻校园失物招领系统</h1>
          <el-dialog class="plan-eff-dialog"  title="修改用户信息" :visible.sync="EditUserInfo" width="40%">
            <template>
              <div style="width: 100%;height: 270px;">
                <div>
                  <div>
                    <div>
                      <div style="margin-left:-51px;margin-top:35px;">
                        <span class="ordsum">编号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                        <span style="font-weight:bold;"><el-input  style="width:200px;" v-html="editNum"></el-input></span>
                        <span class="ordsum" style="padding-left: 50px;">姓名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span style="font-weight:bold;"><el-input  style="width:200px;" v-html="editNume"></el-input></span>
                      </div>
                      <div style="margin-left:-51px;margin-top:30px;">
                        <span class="ordsum">用户名：&nbsp;&nbsp;&nbsp;</span>
                        <span style="font-weight:bold;"><el-input  style="width:200px;" v-html="editUserName"></el-input></span>
                        <span class="ordsum" style="padding-left: 50px;">电话：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span style="font-weight:bold;"><el-input  style="width:200px;" v-html="editPhone"></el-input></span>
                      </div>
                      <div style="margin-left:-51px;margin-top:30px;">
                        <span class="ordsum">邮箱：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                        <span style="font-weight:bold;"><el-input  style="width:200px;" v-html="editEmail"></el-input></span>
                        <span class="ordsum" style="padding-left: 50px;">用户名：&nbsp;&nbsp;&nbsp;</span>
                        <span style="font-weight:bold;">
                           <span style="font-weight:bold;">
                          <el-select v-model="editRoot" disabled placeholder="请选择" style="width:200px;">
                          <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                          </el-select>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="clear:both; padding-top:50px; ">
                  <span><el-button type="primary"  @click="closeDialog" style="width: 120px;margin-left:0px;" ><span style="color:#ffffff;font-weight:bold">关闭</span></el-button></span>
                </div>
              </div>
            </template>
          </el-dialog>
        </div>

        <el-row class="tac">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#32442a"
              text-color="#fff"
              active-text-color="#fff"
              router="true">

              <el-menu-item>
                <span  @click="changeTrueOrFalse('0')"><router-link class="routerLink" to="/index" style="font-size:22px;margin-left:26px;">首页</router-link></span>
              </el-menu-item>
              <el-menu-item>
                <i class="el-icon-news"></i><span  @click="changeTrueOrFalse('0')"><router-link class="routerLink" to="/lost/queryLost2" >历史记录</router-link></span>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location-outline"></i>
                  <span>失物管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item>
                    <span  @click="changeTrueOrFalse('0')"><router-link class="routerLink" to="/Lost/addLost" >发布失物信息</router-link></span>
                  </el-menu-item>
                  <el-menu-item>
                    <span  @click="changeTrueOrFalse('0')"><router-link class="routerLink" to="/Lost/queryLost" >失物列表</router-link></span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-view"></i>
                  <span>拾物管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item>
                    <span  @click="changeTrueOrFalse('0')"><router-link class="routerLink" to="/Found/addFound" >发布拾物信息</router-link></span>
                  </el-menu-item>
                  <el-menu-item>
                    <span  @click="changeTrueOrFalse('0')"><router-link class="routerLink" to="/Found/queryFound" >拾物列表</router-link></span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-edit-outline"></i>
                  <span>感谢信管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item>
                    <span  @click="changeTrueOrFalse('0')"><router-link class="routerLink" to="/Thank/addThank" >添加感谢信</router-link></span>
                  </el-menu-item>
                  <el-menu-item>
                    <span  @click="changeTrueOrFalse('0')"><router-link class="routerLink" to="/Thank/queryThank" >感谢信列表</router-link></span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <div id="showMenu">
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-warning"></i>
                    <span>系统公告</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item>
                      <span  @click="changeTrueOrFalse('0')"><router-link class="routerLink" to="/Notice/addNotice" >添加系统公告</router-link></span>
                    </el-menu-item>
                    <el-menu-item>
                      <span  @click="changeTrueOrFalse('0')"><router-link class="routerLink" to="/Notice/queryNotice" >系统公告列表</router-link></span>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                  <template slot="title">
                    <i class="el-icon-news"></i>
                    <span>用户管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item>
                      <span  @click="changeTrueOrFalse('0')"><router-link class="routerLink" to="/User/addUser" >添加用户</router-link></span>
                    </el-menu-item>
                    <el-menu-item>
                      <span  @click="changeTrueOrFalse('0')"><router-link class="routerLink" to="/User/queryUser" >用户列表</router-link></span>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </div>
            </el-menu>
        </el-row>
      </el-aside>

      <el-container>
        <el-header class = header height="10%">
          <div style="color: #fff;font-size: 12px; margin-left: 85%; margin-top: 30px;">
            <a @click="showMoreInfo">
            <span>
             <el-col :span="11">
                <div style="font-size: 20px;"><span style="padding-top:10px;display: block;">{{this.data}}</span></div>
             </el-col>
            </span>
            </a>
            <span style=" position: absolute;left: 1575px;top: 42px; ">当前登录用户：</span>
            <span><el-button type="primary" @click="IntoLogin()" class="buttcolor11"><span class="buttconter11">用户注销</span></el-button></span>
            <!--<h1>用户注销</h1>-->
          </div>
        </el-header>

        <el-main class = main>
          <el-row :span="6"><span v-if="trueAndFalse" class="el-dropdown-link userinfo-inner font2">{{userName}}</span></el-row>
          <information ref="information" :visible.sync="informationCheck"></information>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>

</template>

<script>
  import axios from 'axios'
  import Message from "element-ui/packages/message/src/main";
  export default {
    data() {
      return {
        data: '',
        EditUserInfo:false,
        editNum:'',
        editNume:'',
        editUserName:'',
        editPhone:'',
        editEmail:'',
        editRoot:''
      }
    },
    created:function() {
       this.data = sessionStorage.getItem('getUserName');
    },
    mounted:function(){
      if( this.data == 'admin' ){

      }else{
        var aa= document.getElementById('showMenu');
        aa.style.display= "none";
      }
    },
    methods: {
      closeDialog(){
        this.EditUserInfo=false;
      },
      showMoreInfo(){
        axios.get("http://localhost:8082/user/account",{
          params:{
            account:this.data,
          }
        }).then((response) => {
          console.log(response);
            const resDate = response.data;
            if (resDate.code == "0") {
              this.editNum = resDate.data.id;
              this.editUserName = resDate.data.account;
              this.editNume = resDate.data.name;
              this.editPhone = resDate.data.phone;
              this.editEmail = resDate.data.email;
              this.editRoot =  resDate.data.roleName;
              this.EditUserInfo=true;
            } else {
              this.$message({
                showClose: true,
                message: "失败：" + resDate.data,
                type: 'error'
              });
            }
          })
      },
      IntoLogin(){
        this.$confirm('是否注销?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({ path: '/login' });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消此操作'
          });
        });
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      changeTrueOrFalse(index){
        if(index == '1'){
          this.trueAndFalse = true;
        }else{
          this.trueAndFalse = false;
        }
      },
      queryInformation(){
        this.$refs.information.initMethods();
        this.informationCheck = !this.informationCheck;
      },
    }
  }
</script>

<style >
  .container{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    left: 0px;
  }
  .aside{
    background-color: #32442a;
    /*background-image: url("../assets/a.jpg");*/
    background-size: 100% 110%;
    padding: 0;
    width: 360px;
  }
  .header{
    /*background-image: url("../assets/h.jpg");*/
    background-color: #32442a;
    padding: 0;
  }
  .main{
    background-image: url("../assets/main.jpg");
    background-size: 100% 102%;

  }
  .routerLink{
    text-decoration: none;
    color: white;
  }
  a{
    text-decoration:none;
    cursor: pointer;
  }
  .tac{
    top: 1%;
    padding: 0;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
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

