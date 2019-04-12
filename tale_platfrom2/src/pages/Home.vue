<template>

    <el-container class = container>
      <el-aside class=aside width="15%">

        <el-row class="tac">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#105e62"
              text-color="#fff"
              active-text-color="#ffd04b"
              router="true">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导演管理</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">导演管理</template>
                  <el-menu-item>
                    <span  @click="changeTrueOrFalse('0')"><router-link class="routerLink" to="/director/AddDirector" >添加导演</router-link></span>
                  </el-menu-item>
                  <el-menu-item>
                    <span  @click="changeTrueOrFalse('0')"><router-link class="routerLink" to="/director/DirectorList" >导演列表</router-link></span>
                  </el-menu-item>
                  <el-menu-item>
                    <span  @click="changeTrueOrFalse('0')"><router-link class="routerLink" to="/director/DetailAndUpdate" >导演详情</router-link></span>
                  </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </el-menu-item>
            </el-menu>

        </el-row>
      </el-aside>

      <el-container>
        <el-header class = header height="10%">Header</el-header>
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
  export default {

    methods: {
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
    background-color: #105e62;
    padding: 0;
    width: 360px;
  }
  .header{
    background-color: #105e62;
    padding: 0;
  }
  .main{
    background-color: #f4f9f4;
  }
  .tac{
    top: 10%;
    padding: 0;
  }


</style>

