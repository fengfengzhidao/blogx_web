import {type baseResponse, type listResponse, type optionsType, type paramsType, useAxios} from "@/api/index";


export interface pwdLoginRequest {
    "val": string,
    "password": string
    captchaID: string
    captchaCode: string
}

export function pwdLoginApi(data: pwdLoginRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/user/login", data)
}


export interface userInfoType {
    "userID": number
    "codeAge": number
    "avatar": string
    "nickname": string
    "lookCount": number
    "articleCount": number
    "fansCount": number
    "followCount": number
    "place": string
}

export function userInfoApi(): Promise<baseResponse<userInfoType>> {
    return useAxios.get("/api/user/base")
}

export function userLogoutApi(): Promise<baseResponse<string>> {
    return useAxios.post("/api/logout")
}

export function articleCategoryOptionsApi(params?: paramsType): Promise<baseResponse<optionsType[]>> {
    return useAxios.get("/api/categorys")
}

export interface userArticleTopRequest {
    articleID: number
    type: number
}

export function userArticleTopApi(data: userArticleTopRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/user/article/top", data)
}

export interface userListType {
    "id": number
    "nickname": string
    "username": string
    "avatar": string
    "ip": string
    "addr": string
    "articleCount": number
    "indexCount": number
    "createdAt": string
    "lastLoginDate": string
}

export function userListApi(params: paramsType): Promise<baseResponse<listResponse<userListType>>> {
    return useAxios.get("/api/user", {params})
}

export interface userUpdateAdminRequest {
    userID: number
    username: string
    nickname: string
    avatar: string
    abstract?: string
    role?: number
}

export function userUpdateAdminApi(data: userUpdateAdminRequest): Promise<baseResponse<string>> {
    return useAxios.put("/api/user/admin", data)
}

export interface sendEmailType {
    "type": 3
    "email": string
    "captchaID": string
    "captchaCode": string
}

export interface sendEmailResponse {
    emailID: string
}

export function sendEmailApi(data: sendEmailType): Promise<baseResponse<sendEmailResponse>> {
    return useAxios.post("/api/user/send_email", data)
}

export interface emailRegisterType {
    "emailID": string
    "emailCode": string
    "pwd": string
    rePwd: string
}

export function emailRegisterApi(data: emailRegisterType): Promise<baseResponse<string>> {
    return useAxios.post("/api/user/email", data)
}