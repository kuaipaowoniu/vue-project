// 引入VUE
import Vue from "vue";
// MD5
import md5 from "./utils/md5";
// 引入storejs
import Store from "storejs";

export default {
    checkExpiredToken: function(response, request) {
        return new Promise(function(resolve, reject) {
            //If token is expired, refresh token, resubmit original request & resolve response for original request
            if (response.status === 401 && response.data.error.code === 'GEN-TOKEN-EXPIRED') {
                this.refreshToken(this, request).then(function(response) {
                    resolve(response);
                });
            }
            // Otherwise just resolve the current response
            resolve(response);
        }.bind(this));
    },
    refreshToken: function(context, request) {
        return new Promise(function(resolve, reject) {
            //Refresh token
            Vue.http({
                url: '/api/v2/refresh-token',
                method: 'POST'
            }).then((response)=> {
                //Store refreshed token
                localStorage.setItem('id_token', response.data.token);
                //Resubmit original request and resolve the response (probably shouldn't be the responsibility of the Auth service...)
                Vue.http(request).then(function(newResponse) {
                    resolve(newResponse);
                });
            }, (newResponse) =>{
                reject(newResponse);
            });
        });
    },
    /**
     * [checkApiToken 接口权限校验]
     * @param  {[type]} response [description]
     * @param  {[type]} request  [description]
     * @return {[type]}          [description]
     */
    checkApiToken: function(response, request) {
        return new Promise(function(resolve, reject) {
            //If token is expired, refresh token, resubmit original request & resolve response for original request
            if (![100,101,102,104,105,106].indexOf(response.data.status)) {
                this.refreshApiToken(this, request).then((response) =>{
                    resolve(response);
                },(err) => {
                    //response.data.status = err.status;
                });
            }
            // Otherwise just resolve the current response
            resolve(response);
        }.bind(this));
    },
    /**
     * [refreshApiToken 刷新接口口令牌]
     * @param  {[type]} context [description]
     * @param  {[type]} request [description]
     * @return {[type]}         [description]
     */
    refreshApiToken: function(context, request) {
        return new Promise(function(resolve, reject) {
            let [timestamp, account, saltKey] = [Date.now(), "minetwork", "BjQH66zx94MEtwwl"];
            let token = md5(account + timestamp + saltKey);
            Vue.http.post("/api/auth/gettoken", {
                account: account,
                timeKey: timestamp,
                token: token
            }).then((response) => { //accessToken
                Store.set("Minetwork", response.data.data.accessToken);
                // 重新发起请求
                // Vue.http(request).then((newResponse) =>{
                //     resolve(newResponse);
                // });
            },(err) => {
                reject(err);
            });
        });
    }
}