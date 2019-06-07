<template>
  <div>
    <el-form ref="thank" :model="thank" :rules="rules" label-width="30%" style="margin-left: 15%;margin-top: 5%">
      <h1 style="color: black;margin-left: -375px;">感谢信</h1>

      <el-form-item prop="title" label="标题" style="width: 80%;margin-top: 20px">
        <el-input v-model="thank.title" placeholder="请输入标题"style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>

      <el-form-item prop="content" label="公告内容"  style="width: 80%;margin-top: 20px">
        <el-input type="textarea"placeholder="请输入公告内容" rows="15"v-model="thank.content" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>

      <el-form-item prop="time" label="时间" style="width: 80%;margin-top: 20px">
        <el-date-picker type="date" placeholder="选择日期" v-model="thank.time" style="width: 50%; margin-left: -50%"></el-date-picker>
      </el-form-item>

      <el-form-item style="margin-left: -75%;margin-top: 20px">
        <el-button type="primary" @click="open">立即发布</el-button>
        <el-button>取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import axios from 'axios';
  import Message from "element-ui/packages/message/src/main";
  function dateFormat(createTime) {
    var date=new Date(createTime);
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
        thank: {
          title: '',
         content: '',
          time:''

        },
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
            {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入公告内容', trigger: 'blur'}
          ],
          time: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ]
        },
      }
    },
    methods: {
      cleanFrom(){
        this.found.title = '';
        this.found.foundTime = '';
        this.found.location = '';
        this.found.type = '';
        this.found.contacts = '';
        this.found.phone = '';
        this.found.information = '';
        this.onChange('','');
        this.found.fileList = '';
      },

      open() {
        var _this = this;
        let form = new FormData();
        form.append("title", this.thank.title);
        form.append("content", this.thank.content);
        form.append("time", dateFormat(this.thank.time));

        axios.post("http://localhost:8082/thank", form,{
          "Content-Type": "multipart/form-data"
        }).then(function (res) {

          if (res.data.code == 0) {
            Message({
              showClose: true,
              message: "添加成功"+res.data.data,
              type: "success"
            });
            _this.cleanFrom();
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
