import {type baseResponse, useAxios} from "@/api/index";

export interface siteResponse {
    "siteInfo": {
        "title": string
        "logo": string
        "beian": string
        "mode": 1 | 2
    },
    "project": {
        "title": string
        "icon": string
        "webPath": string
    },
    "seo": {
        "keywords": string
        "description": string
    },
    "about": {
        "siteDate": string
        "qq": string
        "version": string
        "wechat": string
        "gitee": string
        "bilibili": string
        "github": string
    },
    "login": {
        "qqLogin": boolean
        "usernamePwdLogin": boolean
        "emailLogin": boolean
        "captcha": boolean
    },
    "indexRight": {
        "list": indexRightType[]
    },
    "article": {
        "noExamine": boolean
        "commentLine": number
    }
}

export interface indexRightType {
    title: string
    enable: boolean
}

export interface emailResponse {
    "domain": string
    "port": number
    "sendEmail": string
    "authCode": string
    "sendNickname": string
    "ssl": boolean
    "tls": boolean
}

export interface qqResponse {
    "appID": string
    "appKey":string
    "redirect": string
}

export interface qiNiuResponse {

}

export interface aiResponse {
    "enable": boolean,
    "secretKey": string
    "nickname": string
    "avatar": string
    "abstract": string
}

interface siteBaseResponse {
    site: siteResponse
    email: emailResponse
    qq: qqResponse
    qiNiu: qiNiuResponse
    ai: aiResponse
}


export type siteName = "site" | "email" | "qq" | "qiNiu" | "ai"


export function siteApi<T extends siteName>(name: T): Promise<baseResponse<siteBaseResponse[T]>> {
    return useAxios.get("/api/site/" + name)
}

export function siteUpdateApi<T extends siteName>(name: T, data: siteBaseResponse[T]):Promise<baseResponse<string>>{
    return useAxios.put("/api/site/" + name, data)
}