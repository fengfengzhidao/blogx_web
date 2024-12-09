import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index";

export interface collectListType {
    "id": number
    "createdAt": string
    "updatedAt": string
    "title": string
    "abstract": string
    "cover": string
    "userID": number
    "isDefault": boolean
    "articleCount": number
}

export interface collectListRequest extends paramsType {
    type: 1 | 2 | 3
    userID?: number
}

export function collectListApi(params: collectListRequest): Promise<baseResponse<listResponse<collectListType>>> {
    return useAxios.get("/api/collect", {params})
}

export interface collectCreateRequest {
    "id": number
    "title": string
    "abstract": string
}

export function collectCreateApi(data: collectCreateRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/collect", data)
}

export function collectRemoveApi(idList: number[]): Promise<baseResponse<string>> {
    return useAxios.delete("/api/collect", {data: {idList}})
}