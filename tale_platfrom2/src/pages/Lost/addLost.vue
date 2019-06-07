<template>
  <div>
    <el-form ref="lost" :model="lost" :rules="rules" label-width="30%" style="margin-left: 5%">
      <h1 style="color: black;margin-left: -375px;">失物报失填写</h1>
      <el-form-item label="标题" prop="title" style="width: 80%">
        <el-input v-model="lost.title" placeholder="请输入标题"style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>

        <el-form-item prop="lostTime" label="丢失时间" style="width: 80%;margin-top: 20px">
          <el-date-picker type="date" placeholder="选择日期" v-model="lost.lostTime" style="width: 50%;margin-left: -50%">></el-date-picker>
        </el-form-item>

        <el-form-item prop="location" label="丢失地点" style="width: 80%;margin-top: 20px">
        <el-input v-model="lost.location"placeholder="请输入丢失地点" style="width: 50%;margin-left: -50%"></el-input>
        </el-form-item>
      <el-form-item prop="type" label="类别"style="width: 80%;margin-top: 20px">
        <el-select v-model="lost.type" placeholder="请选择类别" style="width: 50%;margin-left: -50%">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="contacts" label="联系人" style="width: 80%;margin-top: 20px">
        <el-input placeholder="请输入联系人 "  :disabled="true"  v-model="lost.contacts" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="电话" style="width: 80%;margin-top: 20px">
      <el-input placeholder="请输入电话 " v-model="lost.phone" style="width: 50%;margin-left: -50%"></el-input>
    </el-form-item>
      <el-form-item prop="information" label="详细信息" style="width: 80%;margin-top: 20px">
        <el-input type="textarea"placeholder="请输入详细信息  "rows="4" v-model="lost.information" style="width: 50%;margin-left: -50%"></el-input>
      </el-form-item>

      <el-form-item prop="fileList" style="width: 80%;margin-left: -14%;margin-top: 20px">
        <el-upload
          class="upload-demo"
          action=""
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="lost.fileList"
          list-type="picture"
          :auto-upload="false"
          :on-change="onChange">
          <el-button size="small" type="primary" >点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
    var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
    // 拼接
    return year+"-"+month+"-"+day;
  }
    export default {
      data() {
        return {
          Name:'',
          options: [],
          lost: {
            title: '',
            type: '',
            lostTime: '',
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
              {min: 2, max:8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
            ],
            type: [
              {required: true, message: '请选择失物类型', trigger: 'blur'}
            ],
            lostTime: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
            ],
            location: [
              {required: true, message: '请输入失物地点', trigger: 'blur'}
            ],
            contacts: [
              {required: true, message: '请输入联系人', trigger: 'blur'}
            ],
            phone: [
              {required: true, message: '请输入联系人电话', trigger: 'blur'}
            ],
            information: [
              {required: true, message: '请输入详细信息', trigger: 'blur'}
            ],
            image: [
              {required: true, message: '请上传失物图片', trigger: 'blur'}
            ]
          }
        }
      },
      mounted:function(){
        this.getData();
        this.Name = sessionStorage.getItem('getName');
        this.lost.contacts =this.Name;
      },
      methods: {
        cleanFrom(){
            this.lost.title = '';
            this.lost.lostTime = '';
            this.lost.location = '';
            this.lost.type = '';
            this.lost.contacts = '';
            this.lost.phone = '';
            this.lost.information = '';
            this.onChange('','');
            this.lost.fileList = '';
        },
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
          this.lost.fileList = image;
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        open() {
          var _this  = this;
          let form = new FormData();
          if (this.lost.fileList.length < 1) {
            this.message.error({
              title: "错误",
              message: "请选择文件！"
            });
            return;
          }
          form.append("title", this.lost.title);
          form.append("lostTime", dateFormat(this.lost.lostTime));
          form.append("type", this.lost.type);
          form.append("location", this.lost.location);
          form.append("information", this.lost.information);
          form.append("contacts", this.lost.contacts);
          form.append("phone", this.lost.phone);
          for (var i = 0; i < this.lost.fileList.length; i++) {
            form.append(
              "image",
              document.querySelector("input[type=file]").files[i]
            );
          }
          axios.post("http://localhost:8082/lost", form,{
            "Content-Type": "multipart/form-data"
          }).then(function (res) {
            if (res.data.code == 0) {
              Message({
                showClose: true,
                message: res.data.data,
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
