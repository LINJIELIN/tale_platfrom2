<template>
  <div>
    <el-form ref="notice" :model="notice" :rules="rules" label-width="30%" style="margin-left: 15%;margin-top:5%">
      <h1 style="color: black;margin-left: -375px;">系统公告</h1>
      <el-form-item label="标题" style="width: 80%">
        <el-input v-model="notice.title" placeholder="请输入标题"style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>
      <el-form-item label="公告内容"  style="width: 80%">
        <el-input type="textarea"placeholder="请输入公告内容  "rows="20" v-model="notice.content" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>
      <el-form-item style="margin-left: -75%">
        <el-button type="primary" @click="open">立即发布</el-button>
        <el-button>取消</el-button>
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
       notice: {
          title: '',
         content: '',

        },
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
            {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
          ],

          content: [
            {required: true, message: '请输入公告内容', trigger: 'blur'}
          ],

        },
      }
    },
    methods: {
      open() {
        let form = new FormData();
        form.append("title", this.notice.title);
        form.append("content", this.notice.content);
        axios.post("http://localhost:8082/notice", form,{
          "Content-Type": "multipart/form-data"
        }).then(function (res) {
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

<style>

</style>
