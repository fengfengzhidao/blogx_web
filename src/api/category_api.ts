import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index";

export interface categoryListRequest extends paramsType {
    type: 1 | 2 | 3
    userID: number
}

export interface categoryListType {
    "id": number
    "createdAt": string
    "updatedAt": string
    "title": string
    "userID": number
    "articleCount": number
}

export function categoryListApi(params: categoryListRequest): Promise<baseResponse<listResponse<categoryListType>>> {
    return useAxios.get("/api/category", {params})
}

export interface categoryCreateRequest {
    id: number
    title: string
}

export function categoryCreateApi(data: categoryCreateRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/category", data)
}

export function categoryRemoveApi(idList: number[]): Promise<baseResponse<string>> {
    return useAxios.delete("/api/category", {data: {idList}})
}