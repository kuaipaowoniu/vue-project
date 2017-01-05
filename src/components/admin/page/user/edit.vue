<template>
    <div class="row">
      <div class="col-sm-12 border-bottom p-sm">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">管理中心</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>编辑用户</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="col-sm-10 p-sm">
            <el-form  :model="form" :rules="rules"  v-loading="loading"
    element-loading-text="正在加载中,请稍后...."  ref="registerForm" label-width="100px">
                 <el-form-item label="用户类型：">
                  <el-radio-group v-model="form.loginType">
                    <el-radio :label="2">个人用户</el-radio>
                    <el-radio :label="1">企业用户</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="用户名：" prop="userName">
                    <el-row :gutter="12">
                      <el-col :span="11" style="padding-left:0px;">
                          <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
                      </el-col>
                      <el-col :span="4">3-20位的字符
                      </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="用户等级：" prop="rank" >
                    <el-row>
                      <el-col :span="11">
                            <el-select v-model="form.userLevel" placeholder="请选择">
                                 <el-option v-for="(item,key) in userStep" :label="item" :value="key"></el-option>
                            </el-select>
                      </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="电子邮箱：" prop="email">
                    <el-row :gutter="8">
                      <el-col :span="11" style="padding-left:0px;">
                          <el-input v-model="form.email" placeholder="请输入电子邮箱"></el-input>
                      </el-col>
                      <el-col :span="11">请填写您的真实邮箱</el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="结算货币：" prop="moneyPayment">
                   <el-row>
                      <el-col :span="11">
                             <el-select v-model="form.moneyPayment" placeholder="请选择">
                                 <el-option v-for="(item,key) in moneyPayment" :label="item" :value="key"></el-option>
                            </el-select>
                      </el-col>
                    </el-row>
                 
                </el-form-item>
              <el-form-item label="地区："> 
                     <cascadinng :areas-data-in="areasData" @childChange="updateAreaData"></cascadinng>
              </el-form-item>
               <el-form-item label="地址：" prop="address">
                    <el-row :gutter="8">
                      <el-col :span="11"  style="padding-left:0px;">
                          <el-input  v-model="form.address"  placeholder="请输入地址"></el-input>
                      </el-col>
                      <el-col :span="11">请填写您的详细地址，方便我们与您联系</el-col>
                    </el-row>
              </el-form-item>
              <el-form-item label="邮编：" prop="zipCode">
                    <el-row :gutter="8">
                      <el-col :span="11" style="padding-left:0px;">
                          <el-input  v-model="form.zipCode"  placeholder="请输入邮编"></el-input>
                      </el-col>
                       <el-col :span="11">请填写您所在地区的邮政编码</el-col>
                    </el-row>
              </el-form-item>
              <el-form-item label="公司名称：" prop="company">
                   <el-row :gutter="8">
                      <el-col :span="11"  style="padding-left:0px;">
                          <el-input v-model="form.company" placeholder="请输入公司名称"></el-input>
                      </el-col>
                      <el-col :span="11">请填写您的公司名称或个人姓名</el-col>
                    </el-row>
              </el-form-item>
              
              <el-form-item label="联系人：" prop="fullname">
                  <el-row :gutter="12">
                      <el-col :span="2" style="padding-left:0px;">
                       <el-input v-model="form.firstName"  placeholder="姓"></el-input>
                      </el-col>
                      <el-col :span="9">
                           <el-input v-model="form.lastName" placeholder="名"></el-input>
                      </el-col>
                      <el-col :span="4">请输入您的姓-名
                      </el-col>
                  </el-row>
              </el-form-item>
              <el-form-item label="联系电话：" prop="mobile">
                  <el-row :gutter="8">
                    <el-col :span="2" style="padding-left:0px;">
                       <el-input v-model="tempFrom.countryAreaCode"  placeholder="区号"></el-input>
                    </el-col>
                    <el-col :span="9">
                       <el-input v-model="tempFrom.mobile"></el-input>
                    </el-col>
                     <el-col :span="11">固话格式：+86.5922577888   手机号格式：+86.13912345678</el-col>
                </el-row>  
              </el-form-item>
               <el-form-item label="传真：" prop="fax">
                  <el-row :gutter="12">
                    <el-col :span="2" style="padding-left:0px;">
                       <el-input v-model="tempFrom.countryAreaCode"  placeholder="区号"></el-input>
                    </el-col>
                      <el-col :span="9">
                           <el-input v-model="tempFrom.fax" placeholder="请输入传真号码"></el-input>
                      </el-col>
                      <el-col :span="8">传真格式：+86 592*******
                      </el-col>
                  </el-row>
              </el-form-item>
              <el-form-item label="备用联系人1：">
                  <el-row :gutter="12">
                     <el-col :span="2" style="padding-left:0px;">
                       <el-input v-model="form.userLastNameBack1" placeholder="姓"></el-input>
                      </el-col>
                      <el-col :span="9">
                           <el-input  v-model="form.userFirstNameBack1" placeholder="名"></el-input>
                      </el-col>
                      <el-col :span="4">请输入您的姓-名
                      </el-col>
                  </el-row>
              </el-form-item>
              <el-form-item label="备用电话1：">
                  <el-row :gutter="8">
                    <el-col :span="2" style="padding-left:0px;">
                       <el-input v-model="tempFrom.countryAreaCode" placeholder="区号"></el-input>
                    </el-col>
                    <el-col :span="9">
                       <el-input v-model="form.userMobileBack1"></el-input>
                    </el-col>
                     <el-col :span="11">请输入正确的手机号码 区号-号码</el-col>
                  </el-row>  
              </el-form-item>
              <el-form-item label="备用联系人2：">
                 
                   <el-row :gutter="12">
                    <el-col :span="2" style="padding-left:0px;">
                       <el-input v-model="form.userLastNameBack2" placeholder="姓"></el-input>
                      </el-col>
                      <el-col :span="9">
                            <el-input  v-model="form.userFirstNameBack2" placeholder="名"></el-input>
                      </el-col>
                      <el-col :span="4">请输入您的姓-名
                      </el-col>
                  </el-row>
              </el-form-item>
              <el-form-item label="备用电话2：">
                   <el-row :gutter="8">
                    <el-col :span="2" style="padding-left:0px;">
                       <el-input v-model="tempFrom.countryAreaCode"   placeholder="区号"></el-input>
                    </el-col>
                    <el-col :span="9">
                       <el-input v-model="form.userMobileBack2"></el-input>
                    </el-col>
                     <el-col :span="11">固话格式：+86.5922577888   手机号格式：+86.13912345678</el-col>
                   </el-row>  
              </el-form-item>
             
              <el-form-item label="网址：" prop="url">
                   <el-row>
                      <el-col :span="11">
                          <el-input v-model="form.url"  placeholder="请输入网址"></el-input>
                      </el-col>
                    </el-row>
              </el-form-item>
              <el-form-item label="信用额度：">
                   <el-row :gutter="12">
                      <el-col :span="11" style="padding-left:0px;">
                           <el-input  v-model="form.creditLines"  placeholder="请输入信用额度"></el-input>
                      </el-col>
                      <el-col :span="2">元
                      </el-col>
                  </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button>取消</el-button>
              </el-form-item>
          </el-form>

      </div>
    </div>
</template>
<script>
    import cascadinng from "../../common/cascading.vue";
    export default {
    data() {
      var checkUserName = (rule, value, callback) => {
        if(this.form.firstName == "" || this.form.lastName ==""){
           callback(new Error("请输入您的姓-名"));
        }
      };
      return {
        userStep:this.$store.state.paramsPool["userGrade"],
        moneyPayment:this.$store.state.paramsPool["moneyPayment"],
        areaCode:{
           "中国":"+86",
           "日本":"+81",
           "韩国":"+82"
        },
        tempFrom:{
           countryAreaCode:"",
           mobile:"",
           fax:""
        },
        areasData:{
             countryCode:"中国",
             province:"北京市",
             city:"北京市"  
        },
        loading:true,
        form: {
          loginType:2, // 用户类型
          userName: "",// 用户帐号
          userLevel:"normal", // 用户等级
          email:"", // 电子邮箱
          moneyPayment:"￥",// 结算货币
          countryCode:"",
          province:"",
          city:"",  
          company:"",// 公司名称
          mobile:"",// 手机号
          fax:"", // 传真
          address:"", // 地址
          zipCode:"",// 邮编
          url:"",// 网址,
          creditLines:0,//信用额度,
          firstName:"",// 联系人名
          lastName:"", // 联系人姓
          userFirstNameBack1:"", // 备用联系人名字1
          userLastNameBack1:"",// 备用联系人姓氏1
          userMobileBack1:"",// 备用联系电话1
          userFirstNameBack2:"", // 备用联系人名字2
          userLastNameBack2:"", // 备用联系人姓氏2
          userMobileBack2:""//  备用联系电话2
        },
        rules:{
            userName: [
                { required: true, message: "请输入活动名称", trigger: "blur" },
                { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
            ],
            userLevel: [
                { type:"number", required: true, message: "请选择用户等级", trigger: "change" }
            ],
            email:[
               { type:"string", required: true, message: "请输入正确的电子邮箱", trigger: "blur" },
               { validator(rule, value, callback, source, options) {
                  let errors = [];
                  let pattern =/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
                  if(!pattern.test(value)) {
                      errors.push(new Error("电子邮箱格式错误"));
                    }
                  callback(errors);
                }}  
            ],
            moneyPayment:[
               { type:"string", required: true, message: "请输入结算货币", trigger: "change" }  
            ],
            url:[
               { type:"url", message: "请输入正确的网址", trigger: "change" }  
            ],
            address:[
               { type:"string", required: true, message: "请填写您的详细地址，方便我们与您联系", trigger: "blur" }  
            ],
            company:[
               { type:"string", required: true, message: "请填写您的公司名称或个人姓名", trigger: "blur" }  
            ],
            fullname:[
               { validator: checkUserName, trigger: 'blur' }
            ],
            zipCode:[
                { required: true, message: "请填写您所在地区的邮政编码", trigger: "blur" },
                { validator(rule, value, callback, source, options) {
                  let errors = [];
                  if(!/^[0-9][0-9]{5}$/.test(value)) {
                      errors.push(new Error("请输入正确的邮政编码"));
                    }
                  callback(errors);
                }} 
            ],
            mobile:[
                { required: true, message: "请输入正确的联系电话 区号-号码", trigger: "blur" },
                { validator(rule, value, callback, source, options) {
                  let errors = [];
               
                  let pattern =/^(\+[1-9]{1,4}\.[3-9]{1}[1-9]{2}[1-9]{1}[0-9]{6,7})$|^(\+[1-9]{1,4}\.10[1-9]{1}[0-9]{7})$|^(\+[1-9]{1,4}\.2(0|1|2|3|4|5|7|8)[1-9]{1}[0-9]{7})$|^(\+[1-9]{1,4}\.(13|15|18|14|17)[0-9]{9})$/;
                  if(!pattern.test(value)) {
                      errors.push(new Error("请输入正确的联系电话"));
                  }
                  callback(errors);
                }} 
            ],
            fax:[
                { required: true, message: "请输入正确的传真号码 区号-号码", trigger: "blur" },
                { validator(rule, value, callback, source, options) {
                  let errors = [];
                  let pattern =/^(\+[1-9]{1,4}\.[3-9]{1}[1-9]{2}[1-9]{1}[0-9]{6,7})$|^(\+[1-9]{1,4}\.10[1-9]{1}[0-9]{7})$|^(\+[1-9]{1,4}\.2(0|1|2|3|4|5|7|8)[1-9]{1}[0-9]{7})$/;
                  if(!pattern.test(value)) {
                      errors.push(new Error("请输入正确的传真号码"));
                    }
                  callback(errors);
                }} 
            ]

        }
      }
    },
    components:{
      "cascadinng":cascadinng
    },
    watch:{
        "areasData.countryCode":{
            handler(val,oldVal){
               //console.log(val);
               this.tempFrom.countryAreaCode = this.areaCode[val];
            },
            deep:false  // 深度观察
       },
       "tempFrom":{
            handler(val,oldVal){
               this.form.mobile = this.tempFrom.countryAreaCode+"."+this.tempFrom.mobile;
               this.form.fax = this.tempFrom.countryAreaCode+"."+this.tempFrom.fax;
            },
            deep:true  // 深度观察
       },
    },
    computed:{
         
    },
    mounted() {
         this.getUserInfo(this.$route.query.userId);
         this.tempFrom.countryAreaCode = this.areaCode[this.areasData.countryCode];
    },
    methods: {
      updateAreaData(o){
          this.areasData = o;
          this.form.countryCode = o.countryCode;
          this.form.province = o.province;
          this.form.city = o.city;
       },
       getUserInfo(USERID){
          if(USERID){
                   this.$resource("/api/users/getbyid/",{userId:USERID}).get().then((data)=>{
                         this.loading = false;
                         let _data = data.data;
                         if(_data && _data.status == 1 && _data.data){
                              let oData = _data.data;
                                this.form = oData;
                                this.tempFrom.mobile = oData.mobile.split('.')[1];
                                this.tempFrom.fax = oData.fax.split('.')[1];
                         } 
                           
                  });
          }else{
            this.$alert("系统处理参数失败", "信息提示", {
              confirmButtonText: "确定",
              type:"error",
              callback: action => {
                 
              }
            });
          }
      },
      // 创建新用户
      onSubmit() {
         this.$refs.registerForm.validate((valid) => {
           if (valid) {
             console.log(this.form);
             this.$http.post("/api/users/update/", this.form).then((data) => {
                   if(data.body.status==1){
                        this.$message({
                             type: "success",
                             message: data.body.info
                        });
                   }else{
                     // this.$message({
                     //     type: data.body.status == 1? "success":"error",
                     //     message: data.body.info
                     // });
                     this.$alert(data.body.info, "信息提示", {
                        callback: action => {
                           
                        }
                      });
                   }
                     
             },(err) => {
                   console.log("error", err)
             });
           } else {
             this.$message({
               type: "error",
               message: "请确认需要提交的信息是否完整正确！"
             });
             return false;
           }
         });
      }
    }
  }

</script>
<style>

</style>
