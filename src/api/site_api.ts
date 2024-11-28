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

export function siteInfoApi(): Promise<baseResponse<siteResponse>> {
    return useAxios.get("/api/site/site",)
}

export function siteUpdateApi(data: siteResponse): Promise<baseResponse<string>> {
    return  useAxios.put("/api/site/site", data)
}