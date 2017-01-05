<template>
    <div class="row m-t">
      <div class="col-sm-12 border-bottom p-sm">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">管理中心</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户注册</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="col-sm-10 p-sm">
            <el-steps :space="400" :active="2" class="regstep">
                <el-step title="注册步骤1：填写帐号注册资料"></el-step>
                <el-step title="注册步骤2：注册信息邮件确认"></el-step>
                <el-step title="注册步骤3：注册成功"></el-step>
            </el-steps>
            <el-form  :model="form" :rules="rules"  class="m-t" ref="registerForm" label-width="100px">
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
                <el-form-item label="用户密码：" prop="loginPassword" >
                    <el-row :gutter="8">
                      <el-col :span="11" style="padding-left:0px;">
                          <el-input  type="password" v-model="form.loginPassword" placeholder="请输入用户密码"></el-input>
                      </el-col>
                         <el-col :span="11">密码须由字母和数字组成，区分大小写(6~16位)</el-col>
                    </el-row>
                    </el-row>
                </el-form-item>
                 <el-form-item label="确认密码：" prop="passWordNext" >
                    <el-row>
                      <el-col :span="11">
                          <el-input type="password" v-model="form.passWordNext" placeholder="请输入用户密码"></el-input>
                      </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="电子邮箱：" prop="email">
                    <el-row :gutter="8">
                      <el-col :span="11" style="padding-left:0px;">
                          <el-input v-model="form.email" placeholder="请输入电子邮箱"></el-input>
                      </el-col>
                      <el-col :span="11">{{ GETLANGS["inputEmail"] }}</el-col>
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
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即注册</el-button>
                <el-button  @click="onReset">重置</el-button>
              </el-form-item>
          </el-form>

      </div>
    </div>
</template>
<script>
    import { mapGetters  } from "vuex";
    import cascadinng from "../../common/cascading.vue";
    export default {
    data() {
      var checkUserName = (rule, value, callback) => {
        if(this.form.firstName == "" || this.form.lastName ==""){
           callback(new Error("请输入您的姓-名"));
        }
      };
      var validatePass = (rule, value, callback) => {

          let pattern =/^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{6,16}$/;
          if(!pattern.test(value)) {
              callback(new Error("密码须由字母和数字组成，区分大小写(6~16位)"));
          }
          if (this.form.passWordNext !== "") {
            this.$refs.registerForm.validateField("passWordNext");
          }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入确认密码"));
        } else if (value !== this.form.loginPassword) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
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
           countryAreaCode:"+86",
           mobile:"",
           fax:""
        },
        areasData:{
             countryCode:"中国",
             province:"北京市",
             city:"北京市"  
        },
        form: {
          loginType:2, // 用户类型
          userName: "",// 用户帐号
          loginPassword:"",// 用户密码
          passWordNext:"", // 确认密码
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
            loginPassword: [
                { required: true,validator: validatePass, trigger: 'blur' }
            ],
            passWordNext: [
            { required: true,validator: validatePass2, trigger: 'blur' }
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
               { required: true,validator: checkUserName, trigger: 'blur' }
            ],
            zipCode:[
                { required: true, message: "请填写您所在地区的邮政编码", trigger: "blur" },
                { validator(rule, value, callback, source, options) {
                  var errors = [];
                  if(!/^[0-9][0-9]{5}$/.test(value)) {
                      errors.push(new Error("请输入正确的邮政编码"));
                    }
                  callback(errors);
                }} 
            ],
            mobile:[
                { required: true, message: "请输入正确的联系电话 区号-号码", trigger: "blur" },
                { validator(rule, value, callback, source, options) {
                  var errors = [];
               
                  var pattern =/^(\+[1-9]{1,4}\.[3-9]{1}[1-9]{2}[1-9]{1}[0-9]{6,7})$|^(\+[1-9]{1,4}\.10[1-9]{1}[0-9]{7})$|^(\+[1-9]{1,4}\.2(0|1|2|3|4|5|7|8)[1-9]{1}[0-9]{7})$|^(\+[1-9]{1,4}\.(13|15|18|14|17)[0-9]{9})$/;
                  if(!pattern.test(value)) {
                      errors.push(new Error("请输入正确的联系电话"));
                    }
                  callback(errors);
                }} 
            ],
            fax:[
                { required: true, message: "请输入正确的传真号码 区号-号码", trigger: "blur" },
                { validator(rule, value, callback, source, options) {
                  var errors = [];
                     console.log(value);
                  var pattern =/^(\+[1-9]{1,4}\.[3-9]{1}[1-9]{2}[1-9]{1}[0-9]{6,7})$|^(\+[1-9]{1,4}\.10[1-9]{1}[0-9]{7})$|^(\+[1-9]{1,4}\.2(0|1|2|3|4|5|7|8)[1-9]{1}[0-9]{7})$/;
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
               this.tempFrom.countryAreaCode = this.areaCode[val];
            },
            deep:true  // 深度观察
       },
       "tempFrom":{
            handler(val,oldVal){
               this.form.mobile = this.tempFrom.countryAreaCode+"."+this.tempFrom.mobile;
               this.form.fax = this.tempFrom.countryAreaCode+"."+this.tempFrom.fax;
            },
            deep:true  // 深度观察
       },
      },
    mounted() {
         //console.log(this.GETLANGS);//this.GETLANGS["tools"]
         this.tempFrom.countryAreaCode = this.areaCode[this.areasData.countryCode];
    },
    methods: {
      updateAreaData(o){
          this.areasData = o;
          this.form.countryCode = o.countryCode;
          this.form.province = o.province;
          this.form.city = o.city;
      },
      // 创建新用户
      onSubmit() {
         this.$refs.registerForm.validate((valid) => {
           if (valid) {
             this.$http.post("/api/users/register/", this.form).then((data) => {
                     this.$message({
                         type: data.body.status == 1? "success":"error",
                         message: data.body.info
                     });
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
      },
      onReset(){
        this.$refs.registerForm.resetFields();
      }
    },
    computed: {
        ...mapGetters([
          "GETLANGS"
        ])
    }
  }

</script>
<style>
   .regstep .el-step__icon{ line-height: 26px; }
</style>
