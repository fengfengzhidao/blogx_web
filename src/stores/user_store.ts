import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {userInfoApi} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";
import {parseToken} from "@/utils/parse_token";
import router from "@/router";

interface userInfoType {
    userID: number
    nickName: string
    userName: string
    avatar: string
    role: number
    token: string
}

interface userStoreType {
    userInfo: userInfoType
}


export const userStorei = defineStore('userStore', {
    state: (): userStoreType => {
        return {
            userInfo: {
                userID: 0,
                nickName: "",
                userName: "",
                avatar: "",
                role: 0,
                token: "",
            },
        }
    },
    actions: {
        async saveUserInfo(token: string) {
            // 传一个token过来，然后重新去调用户信息接口
            this.userInfo.token = token
            const res = await userInfoApi()
            if (res.code) {
                Message.error(res.msg)
                return
            }

            const payLoad = parseToken(token)
            this.userInfo = {
                userID: res.data.id,
                nickName: res.data.nick_name,
                userName: res.data.user_name,
                avatar: res.data.avatar,
                role: payLoad.role,
                token: token,
            }

            // 持久化
            localStorage.setItem("userInfo", JSON.stringify(this.userInfo))
        },
        loadUserInfo(){
            const val = localStorage.getItem("userInfo")
            if (!val){
                return
            }
            try {
                this.userInfo = JSON.parse(val)
            }catch (e){
                console.log(e)
                console.log(val)
                return;
            }

            // 判断token有没有过期
            const payLoad = parseToken(this.userInfo.token) // exp的时间是秒
            const nowTime = new Date().getTime() // 单位是毫秒
            if (payLoad.exp * 1000 - nowTime <= 0){
                Message.warning("token已过期")
                router.push({name: "web"})
                return;
            }

            console.log(this.userInfo)

        }

    },
    getters: {
        isLogin(): boolean{
            return this.userInfo.userID !== 0
        },
        isAdmin(): boolean{
            return this.userInfo.role == 1
        }
    }
})
