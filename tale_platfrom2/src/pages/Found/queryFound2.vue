<template>
  <div align="center">
    <div style="float: left;margin-left:192px;margin-top:6px;font-size:20px;">
      拾物列表:
    </div>
    <div class="demo-input-suffix" style="position:relative;left:-5%;">
      按名字查询：
      <el-input style="width:20%;"
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="inputTitle">
      </el-input>
      <el-select v-model="inputRetrieve" placeholder="请选择">
        <el-option
          v-for="item in selectoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span><el-button type="primary"  @click="getAllPage" style="width: 100px;margin-left:30px;">查看</el-button></span>
      <span><el-button type="primary"  @click="clean" style="width: 100px;margin-left:30px;">清空</el-button></span>
      <!--<el-button @click="getAllPage" type="text" size="small">查看</el-button>-->
    </div>
    <hr>

    <div align="center">
      <el-table :data="found" border id="tableWidth" class="table" :header-cell-style="{'text-align':'center'}">

        <el-table-column prop="found.image" label="图片" width="120" align="center">
          <!-- 图片的显示 -->
          <template   slot-scope="scope">
            <img :src= " scope.row.image"  min-width="70" height="70"  alt=""/>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="编号" width="100"align="center">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="100"align="center">
        </el-table-column>
        <el-table-column prop="contacts" label="联系人" width="100"align="center">
        </el-table-column>
        <el-table-column prop="information" label="详细信息" width="200" font-size="8px" >
        </el-table-column>
        <el-table-column prop="type" label="类型" width="70"align="center">
        </el-table-column>
        <el-table-column prop="location" label="拾物地点" width="100" font-size="8px" >
        </el-table-column>
        <el-table-column prop="foundTime" label="拾物时间" width="100" font-size="8px" >
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="120" font-size="8px" >
        </el-table-column>
        <el-table-column prop="retrieve" label="是否找回" width="100" font-size="8px" :formatter="formatRetrieve" >
        </el-table-column>
        <el-table-column label="操作"  v-if="showEdit" width="100"align="center">
          <template slot-scope="scope" content="normal">
            <el-button @click="handleClick(scope.row.id)" type="text" size="small">修改</el-button>
            <el-button @click="deleteById(scope.row.id)"class="delete" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="5"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

    </div>
      <el-dialog class="plan-eff-dialog" title="修改" :visible.sync="editFound" width="40%">
        <template>
          <div style="width: 100%;height: 670px;">
            <span style="position: absolute;left: 388px;top: 73px;">图片：</span>
            <div>
              <div>
                <div style="width:100%; height:251px;">
                  <div style="margin-left:-580px;margin-top:20px;">
                    <span style="width: 40px;">
                      <span style="padding-left:165px;padding-right: 80px;">编号：</span>
                      <span style="font-weight:bold; margin-left:-90px;"><el-input  style="width:200px;" v-html="number"></el-input></span>
                    </span>
                    <span style="width: 50px;">
                    </span>
                  </div>
                  <div style="margin-top:30px;margin-left:200px;"><img :src= "picture"  min-width="350" height="165" width="200" /></div>
                </div>

                <div>
                  <div style="margin-left:-51px;">
                    <span class="ordsum">标题：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                    <span style="font-weight:bold;"><el-input  style="width:200px;" v-model="title"></el-input></span>
                    <span class="ordsum" style="padding-left: 50px;">类型：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span style="font-weight:bold;">
                      <el-select v-model="type" placeholder="请选择" style="width:200px;">
                          <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                      </el-select>
                  </span>
                  </div>
                  <div style="margin-left:-51px;margin-top:30px;">
                    <span class="ordsum">联系人：&nbsp;&nbsp;&nbsp;</span>
                    <span style="font-weight:bold;"><el-input  style="width:200px;" v-model="contact"></el-input></span>
                    <span class="ordsum"style="padding-left: 50px;">联系电话： </span>
                    <span style="font-weight:bold;"><el-input  style="width:200px;" v-model="phone"></el-input></span>
                  </div>
                  <div style="margin-left:-51px;margin-top:30px;">
                    <span class="ordsum">拾物地点：</span>
                    <span style="font-weight:bold;"><el-input  style="width:200px;" v-model="location"></el-input></span>
                    <span class="ordsum"style="padding-left: 50px;">拾物时间： </span>
                    <span style="font-weight:bold;">
                       <el-date-picker type="date" placeholder="选择日期" v-model="foundTime" style="width:200px;"></el-date-picker>
                    </span>
                  </div>

                  <div style="margin-left:-51px;margin-top:30px;">
                    <span class="ordsum">是否找回：</span>
                    <span style="font-weight:bold;">
                      <el-select v-model="isFound" placeholder="请选择" style="width:200px;">
                        <el-option label="还未寻回" value="还未寻回"></el-option>
                        <el-option label="已经寻回" value="已经寻回"></el-option>
                      </el-select>
                      <!--<el-input  style="width:200px;" v-model="isFound"></el-input>-->
                    </span>
                    <span class="ordsum"style="padding-left: 50px;">详情信息： </span>
                    <span style="font-weight:bold;"><el-input type="textarea" :rows="3" placeholder="请输入内容"  style="width:200px;" v-model="details"></el-input></span>
                  </div>
                </div>
              </div>
            </div>
            <div style="clear:both; padding-top:50px; ">
              <span><el-button type="primary"  @click="updateInfo" style="width: 120px;margin-left:-30px;">修改</el-button></span>
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
  function dateFormat(createTime) {
    var date=new Date(createTime);
    var year=date.getFullYear();
    var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
    return year+"-"+month+"-"+day;
  }
  export default {
    data() {
      return {
        isRootName:'',
        showEdit:true,
        options: [],
        foundRetrieve:'',
        inputUserName:'',

        editFound:false,
        number:'',
        picture:'',
        title:'',
        type:'',
        contact:'',
        phone:'',
        location:'',
        foundTime:'',
        isFound:'',
        details:'',

        isRetrieve: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },

        inputTitle:'',
        inputType:'',
        inputRetrieve:'',

        total:'',
        currentPage:1,
        size: 5,

        edit:false,

        lostId:'',
        lostTitle: '',
        lostType: '',
        lostLostTime: '',
        lostLocation: '',
        lostInformation: '',
        lostContacts: '',
        lostPhone: '',
        lostImage:'',
        lostRetrieve: '否',

        found: {
          id:'',
          title: '',
          type: '',
          foundTime: '',
          location: '',
          information: '',
          contacts: '',
          phone: '',
          image:'',
          retrieve: '',
        },

        selectoptions: [{
          value: true,
          label: '已经寻回'
        }, {
          value: false,
          label: '还未寻回'
        }],
      }
    },
    created:function() {
      this.isRootName = sessionStorage.getItem('getUserName');
      this.getAllPage();
    },
    mounted:function(){
      this.getData();
      var aa= document.getElementById('tableWidth');

      if( this.isRootName == 'admin'){
        this.showEdit=true;
        aa.style.width="1216px";
      }else{
        this.showEdit=false;
        aa.style.width="1115px";
      }
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
      clean:function(){
        this.inputTitle='';
        this.inputRetrieve='';
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
        axios.get("http://localhost:8082/found/list",{
          params:{
            page:this.currentPage,
            size:this.size,
            name:this.inputTitle,
            retrieve:this.inputRetrieve,
          }
        }).then(function (res) {
          const resData = res.data;
          console.log(resData);
          if (resData.code == 0 ) {
            _this.found = resData.data.data;
            _this.currentPage = resData.data.total.currentPage+1;
            _this.total = resData.data.total.total;
            console.log(_this.total);
          }
        }).catch(function(response){
          this.$message({
            showClose: true,
            message: response.data.data,
            type: 'error'
          });
        })
      },
      updateInfo:function(){
        /**修改信息**/
          var _this = this;
          let form = new FormData();
          // if (_this.isFound == '已经寻回') {
          //   _this.isRetrieve = true;
          // }else {
          //   _this.isRetrieve = false;
          // }
          form.append("id", _this.number);
          form.append("title", _this.title);
          form.append("type", _this.type);
          form.append("foundTime", dateFormat(_this.foundTime));
          form.append("location", _this.location);
          form.append("information", _this.details);
          form.append("contacts", _this.contact);
          form.append("phone", _this.phone);
          form.append("retrieve", _this.isFound);

          axios.put("http://localhost:8082/found",form)
            .then(function(res){
                if (res.data.code == 0) {
                  Message({
                    showClose: true,
                    message: res.data.data,
                    type: "success"
                  });
                  _this.closeFoundDialog();
                  _this.getAllPage();
                } else {
                  Message({
                    showClose: true,
                    message: "失败:" + res.data.data,
                    type: "error"
                  });
                }
              }
            )
      },
      handleClick:function(id){
        axios.get("http://localhost:8082/found/"+ id)
          .then((response) => {
            const resDate = response.data;
            if (resDate.code == "0") {
             // console.log(resDate.data)
              this.contact = resDate.data.contacts;
              this.foundTime = resDate.data.foundTime;
              this.number = resDate.data.id;
              this.title = resDate.data.title;
              this.type = resDate.data.type;
              this.phone = resDate.data.phone;
              this.location =  resDate.data.location;
              if(resDate.data.retrieve == true){
                this.isFound = '已经寻回';
              }else{
                this.isFound = '还未寻回';
              }
              this.details =  resDate.data.information;
              this.picture =  resDate.data.image;
              this.editFound=true;
            } else {
              this.$message({
                showClose: true,
                message: "失败：" + resDate.data,
                type: 'error'
              });
            }
          })
      },
      closeFoundDialog:function(){
        this.editFound=false;
      },
      getAllFound: function () {
        let _this = this;
        axios.get("http://localhost:8082/found/list")
          .then(function (response) {
            const resData = response.data;
            if (resData.code === 0) {
              _this.found = resData.data
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

      deleteById(index) {
        this.$confirm('是否进行删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.handleDelete(index);
          this.getAllPage();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '放弃本次操作'
          });
        });
      },

      handleDelete(index, row) {
        axios.delete("http://localhost:8082/found/" + index)
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
                message: "删除失败" + resDate.data,
                type: 'error'
              });
            }
            this.getAllPage();
          })
      },
      formatRetrieve: function (row, column) {
        return row.retrieve == false ? '还未寻回' : '已经寻回'
      }
    }
  }
</script>

<style >
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
