import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {userInfoApi, userLogoutApi} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";
import {parseToken} from "@/utils/parse_token";
import router from "@/router";
import {siteApi, type siteResponse} from "@/api/site_api";

interface userInfoType {
    userID: number
    nickName: string
    userName: string
    avatar: string
    role: number
    token: string
    "lookCount": number
    "articleCount": number
    "fansCount": number
    "followCount": number
    "place": string
}

interface userStoreType {
    userInfo: userInfoType
    siteInfo: siteResponse
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
                lookCount: 0,
                articleCount: 0,
                fansCount: 0,
                followCount: 0,
                place: ""
            },
            siteInfo: {
                ai: {
                  enable: false
                },
                "qiNiu": {
                    "enable": false
                },
                "siteInfo": {
                    "title": "",
                    "logo": "",
                    "beian": "",
                    "mode": 1
                },
                "project": {
                    "title": "",
                    "icon": "",
                    "webPath": ""
                },
                "seo": {
                    "keywords": "",
                    "description": ""
                },
                "about": {
                    "siteDate": "",
                    "qq": "",
                    "version": "",
                    "wechat": "",
                    "gitee": "",
                    "bilibili": "",
                    "github": ""
                },
                "login": {
                    "qqLogin": false,
                    "usernamePwdLogin": true,
                    "emailLogin": false,
                    "captcha": false
                },
                "indexRight": {
                    "list": []
                },
                "article": {
                    "noExamine": false,
                    "commentLine": 4
                }
            }
        }
    },
    actions: {
        saveUserInfo(token: string) {
            // 传一个token过来，然后重新去调用户信息接口
            this.userInfo.token = token
            const payLoad = parseToken(token)
            console.log(payLoad)
            this.userInfo.userID = payLoad.userID
            this.userInfo.role = payLoad.role

            userInfoApi(payLoad.userID).then(res => {
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
                    lookCount: res.data.lookCount,
                    articleCount: res.data.articleCount,
                    fansCount: res.data.fansCount,
                    followCount: res.data.followCount,
                    place: res.data.place,
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
                lookCount: 0,
                articleCount: 0,
                fansCount: 0,
                followCount: 0,
                place: ""
            }
            Message.success("用户注销成功")
            router.push({name: "web_home"})
        },
        async loadSiteInfo() {
            const res = await siteApi("site")
            if (res.code) {
                Message.error(res.msg)
                return
            }
            Object.assign(this.siteInfo, res.data)
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