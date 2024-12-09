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
    "openCollect": boolean,
    "openFollow": boolean,
    "openFans": boolean,
    "homeStyleID": number
    "relation": 0| 1 | 2 | 3 | 4
}

export function userInfoApi(userID: number): Promise<baseResponse<userInfoType>> {
    return useAxios.get("/api/user/base", {params: {id: userID}})
}

export function userLogoutApi(): Promise<baseResponse<string>> {
    return useAxios.delete("/api/user/logout")
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


export function qqLoginApi(code: string): Promise<baseResponse<string>> {
    return useAxios.post("/api/user/qq", {code})
}

export interface userDetailType {
    "id": number,
    "createdAt": string
    "username": string
    "nickname": string
    "avatar": string
    "abstract": string
    "registerSource": number // 1 email 2 qq 3
    "codeAge": number
    "role": number
    "userID": number
    "likeTags"?: string[],
    "updateUsernameDate"?: string,
    "openCollect": boolean,
    "openFollow": boolean,
    "openFans": boolean,
    "homeStyleID": number
    email: string
    usePassword: boolean
}

export function userDetailApi(): Promise<baseResponse<userDetailType>> {
    return useAxios.get("/api/user/detail")
}

export interface userDetailUpdateRequest {
    username?: string
    nickname?: string
    avatar?: string
    abstract?: string
    likeTags?: string[]
    openCollect?: boolean
    openFollow?: boolean
    openFans?: boolean
    homeStyleID?: number
}

export function userDetailUpdateApi(data: userDetailUpdateRequest): Promise<baseResponse<string>> {
    return useAxios.put("/api/user", data)
}

export interface userPwdUpdateType {
    "oldPwd": string
    "pwd": string
    rePwd: string
}

export function userPwdUpdateApi(data: userPwdUpdateType): Promise<baseResponse<string>> {
    return useAxios.put("/api/user/password", data)
}


export interface userEmailUpdateType {
    "emailID": string
    "emailCode": string
}


export function userEmailUpdateApi(data: userEmailUpdateType): Promise<baseResponse<string>> {
    return useAxios.put("/api/user/email/bind", data)
}


export interface loginRecordType {
    "id": number
    "createdAt": string
    "updatedAt": string
    "userID": number
    "ip": string
    "addr": string
    "ua": string
}

export interface loginRecordRequest extends paramsType {
    type: 1 | 2
}

export function loginRecordApi(params: loginRecordRequest): Promise<baseResponse<listResponse<loginRecordType>>> {
    return useAxios.get("/api/user/login", {params})
}
