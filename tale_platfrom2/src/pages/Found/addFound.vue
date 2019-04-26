<template>
  <div>
    <el-form ref="found" :model="found" :rules="rules" label-width="30%" style="margin-left: 5%">
      <h1 style="color: black;margin-left: -375px;">拾物招领填写</h1>
      <el-form-item label="标题" style="width: 80%">
        <el-input v-model="found.title" placeholder="请输入标题"style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>

      <el-form-item label="拾物时间" style="width: 80%">
        <el-date-picker type="date" placeholder="选择日期" v-model="found.foundTime" style="width: 50%; margin-left: -50%"></el-date-picker>
      </el-form-item>

      <el-form-item label="拾物地点" style="width: 80%">
        <el-input v-model="found.location"placeholder="请输入拾物地点" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>

      <el-form-item label="类别"style="width: 80%">
        <el-select v-model="found.type" placeholder="请选择类别"  style="width: 50%;margin-left: -50%">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系人" style="width: 80%">
        <el-input placeholder="请输入联系人 " v-model="found.contacts" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>
      <el-form-item label="电话" style="width: 80%">
        <el-input placeholder="请输入电话 " v-model="found.phone" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>

      <el-form-item label="详细信息" style="width: 80%">
        <el-input type="textarea"placeholder="请输入详细信息  " rows="4" v-model="found.information" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>

      <el-form-item style="width: 80%;margin-left: -14%">
        <el-upload action="" drag multiple :file-list="found.fileList" :on-change="onChange" :auto-upload="false" >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或
            <em>点击上传</em>
            <div slot="tip" class="el-upload__tip" style="color:red;">只能上传jpg/png文件</div>
          </div>
        </el-upload>
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
        options: [],
        found: {
          title: '',
          type: '',
          foundTime: '',
          location: '',
          information: '',
          contacts: '',
          phone: ''
          // retrieve: false
        },
        image: '',
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
            {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择拾物类别', trigger: 'change'}
          ],
          foundTime: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          location: [
            {required: true, message: '请输入拾物地点', trigger: 'blur'}
          ],
          information: [
            {required: true, message: '请输入详细信息', trigger: 'blur'}
          ],
          contacts: [
            {required: true, message: '请输入联系人', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入电话', trigger: 'blur'}
          ],
          image: [
            {required: true, message: '请上传拾物图片', trigger: 'blur'}
          ]
        },
      }
    },
    mounted:function(){
      this.getData();
    },
    methods: {
    getData(){
        var _this = this;
        axios.get("http://localhost:8082/sort",{
        }).then(function (res) {
          console.log(res)
          console.log(res.data.data)
          if (res.data.code == 0) {
            _this.options = res.data.data;
          } else {
          }
        });
      },
      onChange(file, image) {
        this.found.fileList = image;
      },
      open() {
        let form = new FormData();
        if (this.found.fileList.length < 1) {
          this.message.error({
            title: "错误",
            message: "请选择文件！"
          });
          return;
        }
        form.append("title", this.found.title);
        form.append("foundTime", dateFormat(this.found.foundTime));
        form.append("type", this.found.type);
        form.append("location", this.found.location);
        form.append("information", this.found.information);
        //form.append("retrieve", this.found.retrieve);
        form.append("contacts", this.found.contacts);
        form.append("phone", this.found.phone);
        for (var i = 0; i < this.found.fileList.length; i++) {
          alert(form.get("name"));
          form.append(
            "image",
            document.querySelector("input[type=file]").files[i]
          );
        }
        // alert(32432);
        axios.post("http://localhost:8082/found", form,{
          "Content-Type": "multipart/form-data"
        }).then(function (res) {
          alert(res.data.data);
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
