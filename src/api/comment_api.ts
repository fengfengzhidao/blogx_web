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
}

export interface commentListRequest extends paramsType {
    type: 1 | 2 | 3
}

export function commentListApi(params: commentListRequest): Promise<baseResponse<listResponse<commentListType>>> {
    return useAxios.get("/api/comment", {params})
}