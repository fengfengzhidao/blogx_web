import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index";

export interface commentListType {
    "id": number
    "createdAt": string
    "content": string
    "userID": number
    "userNickname": string
    "userAvatar": string
    "articleID": number
    "articleTitle": string
    "articleCover": string
    "diggCount": number
    "relation"?: 1 | 2 | 3 | 4  // 陌生人 已关注  粉丝  好友
    "isMe": true
    visible?: boolean
}

export interface commentListRequest extends paramsType {
    type: 1 | 2 | 3
}

export function commentListApi(params: commentListRequest): Promise<baseResponse<listResponse<commentListType>>> {
    return useAxios.get("/api/comment", {params})
}

export function commentRemoveApi(id: number):Promise<baseResponse<string>>{
    return  useAxios.delete("/api/comment/" + id.toString())
}


export interface commentCreateRequest {
    "content": string
    "articleID": number
    "parentID"?: number
}

export function commentCreateApi(data: commentCreateRequest):Promise<baseResponse<string>>{
    return useAxios.post("/api/comment", data)
}

export interface commentTreeType {
    "id": number
    "createdAt": string
    "content": string
    "userID": number
    "userNickname": string
    "userAvatar": string
    "articleID": number
    "parentID"?: number
    "diggCount":number
    "applyCount": number
    "subComments": commentTreeType[]
}

export function commentTreeApi(id: number):Promise<baseResponse<listResponse<commentTreeType>>>{
    return useAxios.get("/api/comment/tree/" + id.toString())
}