import {defineStore} from 'pinia'
import {userDetailApi, type userDetailType} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";
interface userStoreType {
    userDetail: userDetailType
}


export const userCenterStorei = defineStore('userCenterStore', {
    state: (): userStoreType => {
        return {
            userDetail: {
                "id": 0,
                "createdAt": "",
                "username": "",
                "nickname": "",
                "avatar": "",
                "abstract": "",
                "registerSource": 0,
                "codeAge": 0,
                "role": 0,
                "userID": 0,
                "likeTags": [],
                "updateUsernameDate": "",
                "openCollect": false,
                "openFollow": false,
                "openFans": false,
                "homeStyleID": 0,
                email: "",
                usePassword: false,
            }
        }
    },
    actions: {
        async getUserDetail(){
            const res = await userDetailApi()
            if (res.code){
                Message.error(res.msg)
                return
            }
            Object.assign(this.userDetail, res.data)

        }
    },
    getters: {

    }
})