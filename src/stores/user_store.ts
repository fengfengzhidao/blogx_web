import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {userInfoApi, userLogoutApi} from "@/api/user_api";
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
                nickName: "枫枫",
                userName: "fengfeng",
                avatar: "https://img2.baidu.com/it/u=3029837478,1144772205&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1732813200&t=fa3d317bb04f7146b4142d1ad1460457",
                role: 1,
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJuYW1lIjoiZmVuZ2ZlbmciLCJyb2xlIjoxLCJleHAiOjE3MzM1ODU3MjEsImlzcyI6ImZlbmdmZW5nIn0.nhveJ4e1OUx5nqyMyWydIfiBVHRhzJpaBSN47DXI96E",
            },
        }
    },
    actions: {
         saveUserInfo(token: string) {
            // 传一个token过来，然后重新去调用户信息接口
            this.userInfo.token = token
            const payLoad = parseToken(token)
            this.userInfo.userID = payLoad.user_id
            this.userInfo.role = payLoad.role

             userInfoApi().then(res=>{
                if (res.code) {
                    Message.error(res.msg)
                    return
                }

                 this.userInfo = {
                     userID: res.data.userID,
                     nickName: res.data.nickname,
                     userName: res.data.nickname,
                     avatar: res.data.avatar,
                     role: payLoad.role,
                     token: token,
                 }
                 // 持久化
                 localStorage.setItem("userInfo", JSON.stringify(this.userInfo))
            })
        },
        loadUserInfo() {
            const val = localStorage.getItem("userInfo")
            if (!val) {
                return
            }
            try {
                this.userInfo = JSON.parse(val)
            } catch (e) {
                console.log(e)
                console.log(val)
                return;
            }

            // 判断token有没有过期
            const payLoad = parseToken(this.userInfo.token) // exp的时间是秒
            const nowTime = new Date().getTime() // 单位是毫秒
            if (payLoad.exp * 1000 - nowTime <= 0) {
                Message.warning("token已过期")
                localStorage.removeItem("userInfo")
                router.push({name: "web"})
                return;
            }
        },
        async userLogout() {
            const res = await userLogoutApi()
            localStorage.removeItem("userInfo")
            this.userInfo = {
                userID: 0,
                nickName: "",
                userName: "",
                avatar: "",
                role: 0,
                token: "",
            }
            Message.success("用户注销成功")
            router.push({name: "web_home"})
        }

    },
    getters: {
        isLogin(): boolean {
            return this.userInfo.userID !== 0
        },
        isAdmin(): boolean {
            return this.userInfo.role == 1
        }
    }
})
