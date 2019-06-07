<template>
  <div align="center">
    <hr>
    <div align="center">
      <el-table :data="thank" border id="tableWidth"  class="table" :header-cell-style="{'text-align':'center'}">
        <el-table-column prop="id" label="编号" width="100"align="center">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="250"align="center">
        </el-table-column>
        <el-table-column prop="content" label="公告内容" width="380"align="center">
        </el-table-column>
        <el-table-column prop="time" label="时间" width="150" font-size="8px" align="center">
        </el-table-column>
          <el-table-column fixed="right"   label="操作" v-if="showEdit" width="100"align="center">
            <template slot-scope="scope" content="normal">
              <el-button @click="handleClick(scope.row.id)" type="text" size="small">修改</el-button>
              <el-button @click="deleteById(scope.row.id)"class="delete" type="text" size="small"><span style="color: red">删除</span></el-button>
            </template>
          </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="5"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog class="plan-eff-dialog" title="修改" :visible.sync="editThank" width="40%">
      <template>
        <div style="width: 100%;height: 300px;">
          <div>
            <div>
              <div>
                <div style="margin-left:-51px;margin-top:30px;">
                  <span class="ordsum">编号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span style="font-weight:bold;"><el-input  style="width:200px;" v-html="editNum"></el-input></span>
                  <span class="ordsum"style="padding-left: 50px;">标题：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span style="font-weight:bold;"><el-input  style="width:200px;" v-html="editTitle"></el-input></span>
                </div>
                <div style="margin-left:-51px;margin-top:30px;">
                   <span class="ordsum">时间：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span style="font-weight:bold;">
                       <el-date-picker type="date" placeholder="选择日期" v-html="editTime" style="width:200px;"></el-date-picker>
                    </span>
                  <span class="ordsum"style="padding-left: 50px;">公告内容： </span>
                  <span style="font-weight:bold;"><el-input type="textarea" :rows="3" placeholder="请输入内容"  style="width:200px;" v-html="editContent"></el-input></span>
                </div>
              </div>
            </div>
          </div>
          <div style="clear:both; padding-top:50px; ">
            <span><el-button type="primary"  @click="closeFoundDialog" style="width: 120px;margin-left:80px;" ><span style="color:#ffffff;font-weight:bold">关闭</span></el-button></span>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import Message from "element-ui/packages/message/src/main";

  export default {
    data() {
      return {
        editNum:'',
        editTitle:'',
        editTime:'',
        editContent:'',
        editThank:false,
        isRootName:'',
        showEdit:true,
        total:'',
        currentPage:1,
        size: 5,

        thank: {
          id:'',
          title: '',
          content: '',
          time:''
        },
      }
    },
    created:function() {
      this.isRootName = sessionStorage.getItem('roleName');
      this.getAllPage();
    },
    mounted:function(){
      var aa= document.getElementById('tableWidth');
      if( this.isRootName == '管理员'){
        this.showEdit=true;
        aa.style.width="990px";
      }else{
        this.showEdit=false;
        aa.style.width="886px";
      }
    },
    methods: {
      closeFoundDialog(){
        this.editThank=false;
      },
      handleClick(id){
        axios.get("http://localhost:8082/thank/"+ id)
          .then((response) => {
            const resDate = response.data;
            console.log(resDate)
            if (resDate.code == "0") {
              this.editNum=resDate.data.id;
              this.editTitle=resDate.data.title;
              this.editTime=resDate.data.time;
              this.editContent=resDate.data.content;
              this.editThank=true;
            } else {
              this.$message({
                showClose: true,
                message: "失败：" + resDate.data,
                type: 'error'
              });
            }
          })
      },
      getAllThank: function () {
        let _this = this;
        axios.get("http://localhost:8082/thank/list")
          .then(function (response) {
            const resData = response.data;
            if (resData.code === 0) {
              _this.thank = resData.data;
              _this.currentPage = resData.data.currentPage+1;
              _this.total = resData.data.total;
            }
          })
          .catch(function (response) {
            Message({
              showClose: true,
              message: "失败:",
              type: "error"
            });
          });
      },
      closeLostDialog:function(){
        this.editLost = false;
      },
      handleSizeChange(val) {
        this.size = val;
        console.log(val);
        this.getAllPage();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
        this.getAllPage();
      },

      getAllPage:function(){
        let _this = this;
        axios.get("http://localhost:8082/thank/list",{
          params:{
            page:this.currentPage,
            size:this.size,
          }
        }).then(function (res) {
          const resData = res.data;
          console.log(resData);
          if (resData.code == 0 ) {
            _this.thank = resData.data.data;
            _this.currentPage = resData.data.total.currentPage+1;
            _this.total = resData.data.total.total;
          }
        }).catch(function(response){
          this.$message({
            showClose: true,
            message: response.data.data,
            type: 'error'
          });
        })
      },

      deleteById(index) {
        this.$confirm('是否进行删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.handleDelete(index);
          this.getAllThank();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '放弃本次操作'
          });
        });

      },

      handleDelete(index, row) {
        axios.delete("http://localhost:8082/thank/" + index)
          .then((response) => {
            const resDate = response.data;
            if (resDate.code == '0') {
              this.$message({
                showClose: true,
                message: "删除成功",
                type: 'success'
              });
            } else {
              this.$message({
                showClose: true,
                message: "删除失败",
                type: 'error'
              });
            }
            this.getAllThank();
          })
      }
    }
  }
</script>
<style >
</style>
