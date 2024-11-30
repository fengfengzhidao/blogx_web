import {type baseResponse, type listResponse, type optionsType, type paramsType, useAxios} from "@/api/index";


export interface emailLoginRequest {
    user_name: string
    password: string
}

export function emailLoginApi(data: emailLoginRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/email_login", data)
}


export interface userInfoType {
    "id": number
    "created_at": string
    "nick_name": string
    "user_name": string
    "avatar": string
    "email": string
    "tel": string
    "addr": string
    "token": string
    "ip": string
    "role": string
    "sign_status": string
    "integral": number
    "sign": string
    "link": string
}

export function userInfoApi(): Promise<baseResponse<userInfoType>> {
    return useAxios.get("/api/user_info")
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
export function userArticleTopApi(data: userArticleTopRequest):Promise<baseResponse<string>>{
    return useAxios.post("/api/user/article/top", data)
}

export interface userListType{
    "id": number
    "nickname": string
    "username": string
    "avatar": string
    "ip": string
    "addr": string
    "articleCount": number
    "indexCount":number
    "createdAt": string
    "lastLoginDate": string
}

export function userListApi(params: paramsType):Promise<baseResponse<listResponse<userListType>>>{
    return  useAxios.get("/api/user", {params})
}

export interface userUpdateAdminRequest {
    userID: number
    username: string
    nickname: string
    avatar: string
    abstract?: string
    role?: number
}

export function userUpdateAdminApi(data: userUpdateAdminRequest):Promise<baseResponse<string>>{
    return  useAxios.put("/api/user/admin", data)
}