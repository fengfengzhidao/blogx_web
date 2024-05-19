import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {userInfoApi} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";

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
                token: ""
            },
        }
    },
    actions: {
        async saveUserInfo(token: string){
            // 传一个token过来，然后重新去调用户信息接口
            this.userInfo.token = token
            const res = await userInfoApi()
            if (res.code){
                Message.error(res.msg)
                return
            }
            this.userInfo = {
                userID: res.data.id,
                nickName:res.data.nick_name,
                userName: res.data.user_name,
                avatar: res.data.avatar,
                role: 0,
                token: token
            }

            // 持久化
            localStorage.setItem("userInfo", JSON.stringify(this.userInfo))

        }

    },
    getters: {}
})
