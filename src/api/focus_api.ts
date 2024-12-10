import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index";

export interface userListType {
    "userID": number
    "userNickname": string
    "userAvatar": string
    "userAbstract": string
    "relationship": 1 | 2 | 3 | 4
    "createdAt": string
}

export interface fansListRequest extends paramsType {
    userID?: number
    isMe: boolean

}

export function fansListApi(params: fansListRequest): Promise<baseResponse<listResponse<userListType>>> {
    if (params.isMe) {
        params.userID = undefined
    }
    return useAxios.get("/api/focus/my_fans", {params})
}

export function focusListApi(params: fansListRequest): Promise<baseResponse<listResponse<userListType>>> {
    if (params.isMe) {
        params.userID = undefined
    }
    return useAxios.get("/api/focus/my_focus", {params})
}