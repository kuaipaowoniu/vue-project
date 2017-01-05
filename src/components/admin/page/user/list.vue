<template>
    <div class="row">
        <div class="col-sm-12 border-bottom p-sm">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }"><i class="fa fa-home m-r-xs f-16"></i>管理中心</el-breadcrumb-item>
              <el-breadcrumb-item>用户管理</el-breadcrumb-item>
              <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
         <div class="col-sm-12 sreach m-t-sm">
             <el-form ref="form" class="p-sm gray-bg" >
                <el-row :gutter="4">
                    <el-col :span="3">
                         <el-form-item label="用户编号" label-width="70px">
                            <el-input  v-model="form.userId"></el-input>
                          </el-form-item>
                    </el-col>
                 
                    <el-col :span="4">
                         <el-form-item label="用户名称" label-width="80px">
                            <el-input v-model="form.userName" style="width:200px"></el-input>
                          </el-form-item>
                    </el-col>
                    <el-col :span="3">
                         <el-form-item label="用户等级" label-width="80px">
                            <el-select v-model="form.userLevel" placeholder="请选择">
                                 <el-option v-for="(item,key) in userStep" :label="item" :value="key"></el-option>
                            </el-select>
                          </el-form-item>
                    </el-col>
                    <el-col :span="4">
                         <el-form-item label="电子邮箱" label-width="80px">
                            <el-input v-model="form.email"></el-input>
                          </el-form-item>
                    </el-col>
                    <el-col :span="4">
                         <el-form-item label="地区" label-width="50px">
                            <el-input v-model="form.email"></el-input>
                          </el-form-item>
                    </el-col>
                    <el-col :span="3">
                         <el-form-item label="用户状态" label-width="80px">
                             <el-select v-model="form.status" placeholder="请选择">
                                <el-option v-for="(item,key) in userStatus" :label="item" :value="key"></el-option>
                            </el-select>
                          </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="4">
                   
                
                    <el-col :span="3">
                      <el-form-item label="结算货币" label-width="70px">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option v-for="(item,key) in moneyPayment" :label="item" :value="key"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                         <el-form-item label="创建时间" label-width="80px">
                            <el-date-picker format="yyyy-MM-dd" v-model="datePicker"
                              type="daterange"  
                              placeholder="选择日期范围" style="width:200px" >
                            </el-date-picker>
                          </el-form-item>
                    </el-col>
                        <el-col :span="3">
                         <el-form-item label="查询分类" label-width="80px">
                            <el-select v-model="form.region" placeholder="请选择">
                              <el-option label="余额" value="0"></el-option>
                              <el-option label="信用额度" value="1"></el-option>
                              <el-option label="折后人民币" value="2"></el-option>
                            </el-select>
                          </el-form-item>
                    </el-col>
                     <el-col :span="2">
                         <el-form-item>
                            <el-input ></el-input>
                          </el-form-item>
                    </el-col>
                    <el-col :span="2" >
                         <el-form-item label="--"  label-width="30px">
                            <el-input ></el-input>
                          </el-form-item>
                    </el-col>
                </el-row>
                 <el-row :gutter="20">
                 <el-col :span="5">
                       <router-link class="btn btn-primary" :to="{ path: 'add'}"><i class="fa fa-plus m-r-xs"></i>新建用户</router-link>
                 </el-col>
                 <el-col :span="12" :offset="4">
                       <el-button type="primary" @click="searchUser"><i class="fa fa-search m-r-xs"></i>搜索</el-button>
                       <el-button type="info" class="gray-bg"><i class="fa fa-cloud-download m-r-xs"></i>导出</el-button>
                 </el-col>
              </el-row>
              </el-form>
             
        </div>
        <div class="col-sm-12 p-sm">
            <el-table :data="userData" v-loading="loading"
    element-loading-text="正在加载中,请稍后...." stripe border style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection"  width="50"> </el-table-column>
              <el-table-column prop="userId"  label="用户ID" width="100" sortable></el-table-column>
              <el-table-column prop="userName"  label="用户姓名" width="120"></el-table-column>
              <el-table-column inline-template  label="用户等级" width="100" >
                   <span v-text="getParamsChange(row.userLevel,'userGrade')"></span>
              </el-table-column>
              <el-table-column label="余额" width="100" ></el-table-column>
              <el-table-column inline-template  label="结算货币" width="100" >
                   <span v-text="getParamsChange(row.moneyPayment,'moneyPayment')"></span>
              </el-table-column>
              <el-table-column label="折算人民币" width="120" ></el-table-column>
              <el-table-column inline-template label="地区" show-overflow-tooltip width="120">
                  <span>
                    {{row.countryCode+","+row.province+","+row.city}}
                  </span>
              </el-table-column>
              <el-table-column prop="email" label="邮箱" show-overflow-tooltip width="120"></el-table-column>
              <el-table-column prop="createTime" :formatter="dateFormatter" label="创建日期" width="120"></el-table-column>
       
             <el-table-column inline-template  label="状态" width="100">
                  <el-tag :type="row.status==0?'gray':(row.status==1?'success':'danger')">
                    <span v-text="getParamsChange(row.status,'userStatus')"></span>
                  </el-tag>
              </el-table-column>
              
              <el-table-column prop="creditLines" label="信用额度"  width="100"></el-table-column>
 
              <el-table-column
                inline-template
                :context="_self"
                fixed="right"
                label="操作"
                class-name="action"
                >
                <span>
                   <router-link class="details" v-if="row.status != 0" :to="{ path: 'edit', params:{ userId:row.userId }}"><i class="fa fa-clone m-r-xxs"></i><span>详情</span></router-link>
                   <router-link class="edit" :to="{ path:'edit', query:{ userId: row.userId }}"><i class="fa fa-edit m-r-xxs"></i><span>编辑</span></router-link>
                   <a href="javascript:;" class="lock" v-if="row.status>0 && row.status != 0"><i class="fa fa-lock m-r-xxs"></i><span>锁定</span></a>
                   <a href="javascript:;" class="unlock" v-if="row.status == -1"><i class="fa fa-unlock m-r-xxs"></i><span>启用</span></a>
                   <a href="javascript:;" class="remove" @click.stop="removeUser"><i class="fa fa-remove m-r-xxs"></i><span>删除</span></a>
                </span>
              </el-table-column>
          </el-table>
          <div class="m-t-sm cmpage">
                <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="page.currentPage"
                      :page-sizes="[20, 40, 60, 80]"
                      :page-size="page.pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="page.total">
                </el-pagination>
          </div>
        </div>
    </div>
</template>

<script>
   import {
  mapActions
 } from "vuex";
 export default {
  name: "container",
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 15,
        total: 0
      },
      userData: [],
      userStep: this.$store.state.paramsPool["userGrade"],
      userStatus: this.$store.state.paramsPool["userStatus"],
      moneyPayment: this.$store.state.paramsPool["moneyPayment"],
      datePicker: "",
      form: {
          userLevel: "", //等级
          status: "", // 用户状态
          userName: "", // 用户帐号
          userId: "", // 用户编号
          email: "", // 用户邮箱
          address: "", // 地址
          createTime1: "",
          createTime2: ""
      },
      loading: true
    }
  },
  mounted() {
    this.getUsers();
  },
  watch: {
    "page.currentPage": {
      handler(val, oldVal) {
        this.getUsers({
          page: val
        });
      },
      deep: true // 深度观察
    },
    "page.pageSize": {
      handler(val, oldVal) {
        this.getUsers({
          size: val
        });
      },
      deep: true // 深度观察
    },
    datePicker(val, oldVal) {
      if(val[0]){
         this.form.createTime1 = this.$utils.DateFormate(val[0], "yyyy-MM-dd");
         this.form.createTime2 = this.$utils.DateFormate(val[1], "yyyy-MM-dd");
      }else{
        this.form.createTime1 = "";
        this.form.createTime2 = "";
      }
    },
  },
  methods: {
    // 格式化时间
    dateFormatter(row) {
      if (row && row.createTime) {
        return this.$utils.DateFormate(row.createTime, "yyyy-MM-dd");
      }
      return null;
    },
    getParamsChange(val, which) {
      let _params = this.$store.state.paramsPool;
      if (!this.$utils.isEmptyObject(_params)) {
        return _params[which][val];
      }
      return "未知";
    },
    clickDatePicker(picker){
      console.log("dfsd");
    }, 
    // 删除用户数据
    removeUser() {
      this.$confirm("你确认删除当前的用户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
    // 获取用户数据
    getUsers(options) {
      this.loading = true;
      let opts = {};
      this.$utils.Extend(opts, {
        page: 1,
        size: 15
      }, options);
      this.$resource("/api/users/index/", opts).get().then((res) => {
        this.loading = false;
        let userData = res.data.data;
        this.page.total = userData.total;
        this.userData = userData.list;
      });
    },
    // 查询用户数据
    searchUser() {
      this.getUsers(this.form);
    },
    // 选择多条记录
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 变面页呈现条数
    handleSizeChange(val) {
      this.page.pageSize = val;
    },
    // 翻页操作
    handleCurrentChange(val) {
      this.page.currentPage = val;
    },
    ...mapActions([
      "setComponentParams",
    ]),
  }
 }
</script>

<style scoped>
    .sreach{   }
    .sreach label{ font-weight:400; }
    .sreach .el-form-item{ margin-bottom: 10px; }
    .cmpage{ text-align: right; }
    .action a{ color:#20a0ff; }
    .action .cell .lock,.action .cell .unlock{ color:#ff7200; }
    .action .cell .remove{ color:#FF4949; }
    .el-table,.action a{  font-size: 13px; }
</style>