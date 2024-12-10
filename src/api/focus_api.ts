import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index";

export interface fansListType {
    "fansUserID": number
    "fansUserNickname": string
    "fansUserAvatar": string
    "fansUserAbstract": string
    "createdAt": string
}

export interface fansListRequest extends paramsType {
    userID?: number
    isMe: boolean

}

export function fansListApi(params: fansListRequest): Promise<baseResponse<listResponse<fansListType>>> {
    if (params.isMe) {
        params.userID = undefined
    }
    return useAxios.get("/api/focus/my_fans", {params})
}

export interface focusListType {
    "focusUserID": number
    "focusUserNickname": string
    "focusUserAvatar": string
    "focusUserAbstract": string
    "createdAt": string
}

export function focusListApi(params: fansListRequest): Promise<baseResponse<listResponse<focusListType>>> {
    if (params.isMe) {
        params.userID = undefined
    }
    return useAxios.get("/api/focus/my_focus", {params})
}