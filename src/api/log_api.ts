import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index";

export interface logListType {
    "id": number
    "createdAt": string
    "updatedAt": string
    "logType": number
    "title": string
    "content": string
    "level": number
    "userID": number
    "ip": string
    "addr": string
    "isRead": boolean,
    "loginStatus": boolean,
    "username": string
    "pwd": string
    "loginType": number
    "serviceName": string
    "userNickname": string
    "userAvatar": string
}

export interface logListParams extends paramsType {
    logType: 1 | 2 | 3
}

export function logListApi(params: logListParams):Promise<baseResponse<listResponse<logListType>>>{
    return  useAxios.get("/api/logs", {params})
}

export function logReadApi(id: number):Promise<baseResponse<string>>{
    return useAxios.get("/api/logs/" + id.toString())
}