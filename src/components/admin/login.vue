<template>
  <div id="login" class="col-sm-12 p-sm">
      <h3 class="m-t-none m-b">登录</h3>
      <p>欢迎登录本站(⊙o⊙)</p>
      <form role="form">
          <div class="form-group">
              <label>用户名</label>
              <input type="email" placeholder="请输入您注册的E-mail" class="form-control">
          </div>
          <div class="form-group">
              <label>密码</label>
              <input type="password" placeholder="请输入密码" class="form-control">
          </div>
          <div>
              <button class="btn btn-sm btn-primary pull-right m-t-n-xs" @click="login" type="button"><strong>登 录</strong>
              </button>
              <label>
                  <input type="checkbox" class="i-checks">自动登录</label>
          </div>
      </form>
  </div>
</template>
<script>
    import { mapStates,mapActions} from "vuex";
    export default {
      name: "login",
      methods:{
        login(){
              console.log("登录请求");
              // 往vuex变更用户信息 
              this.SIGNIN({username:"测试帐号",userid:8888,accesstoken:"98sdsdAasTTspoxx2sfd"});
              window.location.href = "/ucenter/home";
        },
        ...mapActions([
            "SIGNIN"  
        ]),
      },
      mounted(){ 
        
      }
    }
</script>
      