<template>
  <div style="margin-top:100px">
    <el-from :model="director">

      <el-director-item label="导演姓名" prop="name">
        <el-input v-model="director.name"></el-input>
      </el-director-item>

      <el-director-item label="导演性别" prop="sex">
        <el-select v-model="director.sex" placeholder="请选择导演性别" style="width: 100%">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-director-item>

      <el-director-item label="出生日期" required >
        <el-col :span="15">
          <el-form-item prop="birthday">
            <el-date-picker type="date" placeholder="选择日期" v-model="director.birthday" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-director-item>

      <el-director-item label="国籍" prop="nationality">
        <el-input v-model="director.nationality"></el-input>
      </el-director-item>

      <el-director-item label="导演简介" prop="introduction">
        <el-input type="textarea" v-model="director.introduction"></el-input>
      </el-director-item>

      <div class="grid-content bg-purple">
        <el-upload action="" drag multiple :file-list="director.fileList" :on-change="onChange" :auto-upload="false">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或
            <em>点击上传</em>
            <div slot="tip" class="el-upload__tip" style="color:red;">只能上传jpg/png文件</div>
          </div>
        </el-upload>
      </div>

    </el-from>

    <div class="grid-content bg-purple">
      <el-button type="primary" style="width:200px;height:150px;" @click="add">点击上传</el-button>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        director: {
          name: '-',
          sex: '男',
          birthday: '1990-1-1',
          nationality: '中国',
          introduction: '--',
          fileList: []
        }
      }
    },
    methods: {
      onChange(file, fileList) {
        this.director.fileList = fileList;
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
        for (var i = 0; i < this.director.fileList.length; i++) {
          form.append(
            "fileList",
            document.querySelector("input[type=file]").files[i]
          );
        }

        axios.post("http://localhost:8086/upload/add233", form, {
          "Content-Type": "multipart/form-data"
        })
          .then(function (res) {

          }).catch(function (res) {

        });
      },
    }
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
