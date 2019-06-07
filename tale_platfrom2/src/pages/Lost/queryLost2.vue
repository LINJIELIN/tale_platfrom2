<template>
  <div align="center">
      历史记录:
    <hr>

    <div align="center">
      <el-table :data="lost" border style="width: 1213px " class="table" :header-cell-style="{'text-align':'center'}">

        <el-table-column prop="lost.image" label="图片" width="120" align="center">
          <!-- 图片的显示 -->
          <template   slot-scope="scope">
            <img :src= "scope.row.image"  min-width="70" height="70"  alt=""/>
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
        <el-table-column prop="location" label="地点" width="100" font-size="8px" >
        </el-table-column>
        <el-table-column prop="lostTime" label="时间" width="100" font-size="8px" >
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="120" font-size="8px" >
        </el-table-column>
        <el-table-column prop="retrieve"  label="是否找回" width="100" font-size="8px" :formatter="formatRetrieve">
        </el-table-column>
        <el-table-column label="操作" width="100"align="center">
          <template slot-scope="scope" content="normal">
            <el-button @click="handleClick(scope.row.id)" type="text" size="small">修改</el-button>
            <el-button @click="deleteById(scope.row.id)"class="delete" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <el-dialog class="plan-eff-dialog" title="修改" :visible.sync="editLost" width="40%">
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
                  <span class="ordsum">失物地点：</span>
                  <span style="font-weight:bold;"><el-input  style="width:200px;" v-model="location"></el-input></span>
                  <span class="ordsum"style="padding-left: 50px;">失物时间： </span>
                  <span style="font-weight:bold;">
                       <el-date-picker type="date" placeholder="选择日期" v-model="lostTime" style="width:200px;"></el-date-picker>
                    </span>
                </div>

                <div style="margin-left:-51px;margin-top:30px;">
                  <span class="ordsum">是否找回：</span>
                  <span style="font-weight:bold;">
                      <el-select v-model="isLost" placeholder="请选择" style="width:200px;">
                       <el-option label="还未寻回" value="还未寻回  "></el-option>
                      <el-option label="已经寻回" value="已经寻回"></el-option>
                      </el-select>
                    <!--<el-input  style="width:200px;" v-model="isLost"></el-input>-->
                  </span>
                  <span class="ordsum"style="padding-left: 50px;">详情信息： </span>
                  <span style="font-weight:bold;"><el-input type="textarea" :rows="3" placeholder="请输入内容"  style="width:200px;" v-model="details"></el-input></span>
                </div>
              </div>
            </div>
          </div>
          <div style="clear:both; padding-top:50px; ">
            <span><el-button type="primary"  @click="updateInfo" style="width: 120px;margin-left:-30px;">修改</el-button></span>
            <span><el-button type="primary"  @click="closeLostDialog" style="width: 120px;margin-left:80px;" ><span style="color:#ffffff;font-weight:bold">关闭</span></el-button></span>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  // $('#aaaa').css('display',none)
  import axios from 'axios'
  import Message from "element-ui/packages/message/src/main";

  function dateFormat(time) {
    var date=new Date(time);
    var year=date.getFullYear();
    var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
    return year+"-"+month+"-"+day;
  }

  export default {
      data() {
        return {
          options: [],
          editLost:false,
          number:'',
          picture:'',
          title:'',
          type:'',
          contact:'',
          phone:'',
          location:'',
          lostTime:'',
          isLost:'',
          details:'',

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

          userName:'',

          lost: {
            id:'',
            title: '',
            type: '',
            lostTime: '',
            location: '',
            information: '',
            contacts: '',
            phone: '',
            image:'',
            retrieve: '',
          },
          options2: [{
            value: true,
            label: '已经寻回'
          }, {
            value: false,
            label: '还未寻回'
          }],
        }
      },
      created:function() {
        this.userName = sessionStorage.getItem('getUserName');
        this.getAllPage();
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
          //alert("进入分页");
          axios.get("http://localhost:8082/lostAndFound",{
            params:{
              contacts:this.userName,
            }
          }).then(function (res) {
            const resData = res.data;
            console.log(resData);
            if (resData.code == 0 ) {
              _this.lost = resData.data;
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

        getAllLost: function () {
          let _this = this;
          axios.get("http://localhost:8082/lost/list2")
            .then(function (response) {
              const resData = response.data;
              if (resData.code === 0) {
                _this.lost = resData.data
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
        /**查询单条详细详细**/
        handleClick:function(index) {
          axios.get("http://localhost:8082/lost/"+ index)
            .then((response) => {
              const resDate = response.data;
              if (resDate.code == "0") {
                // console.log(resDate.data)
                this.contact = resDate.data.contacts;
                this.lostTime = resDate.data.lostTime;
                this.number = resDate.data.id;
                this.title = resDate.data.title;
                this.type = resDate.data.type;
                this.phone = resDate.data.phone;
                this.location =  resDate.data.location;

                if(resDate.data.retrieve == true){
                  this.isLost = '已经寻回';
                }else{
                  this.isLost = '还未寻回';
                }
                this.details =  resDate.data.information;
                this.picture =  resDate.data.image;
                this.editLost = true;
              } else {
                this.$message({
                  showClose: true,
                  message: "失败：" + resDate.data,
                  type: 'error'
                });
              }
            })
        },
        /**修改导演信息**/
         updateInfo:function(index) {
          var _this = this;
          let form = new FormData();

          form.append("id",   _this.number);
          form.append("title", _this.title);
          form.append("type", _this.type);
          form.append("lostTime", dateFormat(_this.lostTime));
          form.append("location", _this.location);
          form.append("phone", _this.phone);
          form.append("contacts", _this.contact);
          form.append("information", _this.details);
          form.append("retrieve", _this.isLost);

          axios.put("http://localhost:8082/lost",form)
            .then(function(res){
                 if (res.data.code == 0) {
                      Message({
                        showClose: true,
                        message: res.data.data,
                        type: "success"
                      });
                  _this.closeOederCollection();
                  _this.getAllPage();
                } else {
                    Message({
                    showClose: true,
                    message: "失败:" + res.data.data,
                    type: "error"
                    });
                }
           })
        },
        closeOederCollection: function(){
          this.editLost = false;
        },
        deleteById(index) {
          this.$confirm('是否进行删除', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.handleDelete(index);
            //this.getAllPage();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '放弃本次操作'
            });
          });

        },

        handleDelete(index, row) {
          axios.delete("http://localhost:8082/lost/" + index)
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
              this.getAllPage();
            })
        },
        formatRetrieve: function (row, column) {
          return row.retrieve == false ? '还未寻回' : '已经寻回'
        },

      }
    }
</script>

<style >
  .table{
    content: normal;
  }
  .delete{
    color: red;
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
