import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index";

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