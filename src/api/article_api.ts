import {type baseResponse, type listResponse, type optionsType, type paramsType, useAxios} from "@/api/index";

export interface articleListType {
    "id": number
    "createdAt": string
    "updatedAt": string
    "title": string
    "abstract": string
    "categoryID"?: number
    "categoryTitle"?: string
    "tagList": string[]
    "cover": string
    "userID": number
    "lookCount": number
    "diggCount": number
    "commentCount": number
    "collectCount": number
    "openComment": boolean // 是否开启评论
    "status": number // 状态  1草稿 2审核中  3已发布
    "userTop": boolean,
    "adminTop": boolean
    "userNickname": string
    "userAvatar": string
}

export interface articleListRequest extends paramsType {
    type: 1 | 2 | 3
    userID?: number
    collectID?: number
    status?: number
}

export function articleListApi(params: articleListRequest): Promise<baseResponse<listResponse<articleListType>>> {
    return useAxios.get("/api/article", {params})
}

export interface articleDetailType {
    "id": number
    "createdAt": string
    "updatedAt": string
    "title": string
    "abstract": string
    "content": string
    "categoryID"?: number,
    categoryTitle?: string
    "tagList": string[]
    "cover": string
    "userID": number
    "lookCount": number
    "diggCount": number
    "commentCount": number
    "collectCount": number
    "openComment": false,
    "status": number
    "username": string
    "nickname": string
    "userAvatar": string
}

export function articleDetailApi(id: number): Promise<baseResponse<articleDetailType>> {
    return useAxios.get("/api/article/" + id.toString())
}

export interface articleExamineRequest {
    "articleID": number
    "status": number // 3 审核通过 4 不通过
    msg: string
}

export function articleExamineApi(data: articleExamineRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/article/examine", data)
}

export interface articleHistoryListType {
    "id": number
    "lookDate": string
    "title": string
    "cover": string
    "nickname": string
    "avatar": string
    "userID": number
    "articleID": number
}

export interface articleHistoryListRequest extends paramsType {
    type: 1 | 2
}

export function articleHistoryListApi(params: articleHistoryListRequest): Promise<baseResponse<listResponse<articleHistoryListType>>> {
    return useAxios.get("/api/article/history", {params})
}

export function articleHistoryRemoveApi(idList: number[]): Promise<baseResponse<string>> {
    return useAxios.delete("/api/article/history", {data: {idList}})
}


export interface articleAddType {
    "title": string
    "content": string
    abstract: string
    "status": 1 | 2
    "categoryID"?: number
    "cover": string
    "tagList": string[]
    "openComment": boolean
}

export function articleAddApi(data: articleAddType): Promise<baseResponse<string>> {
    return useAxios.post("/api/article", data)
}

export function articleCategoryOptionsApi(): Promise<baseResponse<optionsType[]>> {
    return useAxios.get("/api/category/options")
}

export function articleTagOptionsApi(): Promise<baseResponse<optionsType[]>> {
    return useAxios.get("/api/article/tag/options")
}
export interface articleEditType extends articleAddType {
    id: number
}
export function articleUpdateApi(data: articleEditType):Promise<baseResponse<string>>{
    return  useAxios.put("/api/article", data)
}
export function articleRemoveApi(id: number):Promise<baseResponse<string>>{
    return useAxios.delete("/api/article/" + id.toString())
}