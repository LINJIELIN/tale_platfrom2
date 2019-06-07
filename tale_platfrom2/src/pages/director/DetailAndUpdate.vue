<template>
  <div>
    <div  class="form-test">
      <div style="float: left">
        <template>
          <img src="direvtor.image">
        </template>
      </div>

      <div style="float: left">
        <el-form :model="director" :rules="rules" ref="director" label-width="100px" class="demo-director">

          <el-form-item label="导演姓名" prop="name">
            <el-input v-model="director.name"></el-input>
          </el-form-item>
          <el-form-item label="导演性别" prop="sex">
            <el-select v-model="director.sex" placeholder="请选择导演性别" style="width: 100%">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="出生日期" required >
            <el-col :span="15">
              <el-form-item prop="birthday">
                <el-date-picker type="date" placeholder="选择日期" v-model="director.birthday" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="国籍" prop="nationality">
            <el-input v-model="director.nationality"></el-input>
          </el-form-item>

          <el-form-item label="导演简介" prop="introduction">
            <el-input type="textarea" v-model="director.introduction"></el-input>
          </el-form-item>

        </el-form>

        <div class="grid-content bg-purple">
          <el-button type="primary" @click="add">提交导演信息</el-button>
        </div>
      </div>


    </div>
  </div>

</template>

<script>
  import axios from 'axios';
  import Message from "element-ui/packages/message/src/main";

  function dateFormat(time) {
    var date=new Date(time);
    var year=date.getFullYear();
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
    // var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
    // var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
    // var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
    // 拼接
    return year+"-"+month+"-"+day;
  }

  export default {

    data() {
      return {
        director: {
          name: '',
          sex: '',
          birthday: '',
          nationality: '',
          introduction: ''
        },
      };
    },
    methods: {

      initMethdos(index){
        this.director.id = this.message(index).director.id;
        this.director.name = this.message(index).director.name;
        this.director.birthday = this.message(index).director.birthday;
        this.director.nationality = this.message(index).director.nationality;
        this.director.introduction = this.message(index).director.introduction;
        this.director.image = this.message(index).director.image;
        }
      },

      add() {
        let form = new FormData();
        if (this.director.fileList.length < 1) {
          this.$notify.error({
            title: "错误",
            message: "请选择文件！"
          });
          return;
        }
        form.append("name", this.director.name);
        form.append("sex", this.director.sex);
        form.append("birthday", dateFormat(this.director.birthday));
        form.append("nationality", this.director.nationality);
        form.append("introduction", this.director.introduction);

        axios.post("http://localhost:8086/director", form, {
          "Content-Type": "multipart/form-data"
        }).then(function(res){

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
      },
  }
</script>

<style>
  .form-test{
    width: 30%;
    align-content: center;
    margin-left: 30%;
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
  .avatar-uploader-icon {
    font-size: 35px;
    color: #ffffff;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: compact;
  }
</style>
