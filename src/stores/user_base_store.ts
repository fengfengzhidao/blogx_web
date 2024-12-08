import {defineStore} from 'pinia'
import { userInfoApi, type userInfoType} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";
interface userBaseType {
    userBase: userInfoType
}


export const userBaseStorei = defineStore('userBaseStore', {
    state: (): userBaseType => {
        return {
            userBase: {
                userID: 0,
                codeAge: 0,
                avatar: "",
                nickname: "",
                lookCount: 0,
                articleCount: 0,
                fansCount: 0,
                followCount: 0,
                place: "",
            }
        }
    },
    actions: {
        async getUserBaseInfo(id: number){
            const res = await userInfoApi(id)
            if (res.code){
                Message.error(res.msg)
                return
            }
            Object.assign(this.userBase, res.data)

        }
    },
    getters: {

    }
})