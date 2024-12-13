import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index";

export interface bannerListType {
    "id": number
    "createdAt": string
    "updatedAt": string
    "show": boolean
    "cover": string
    "href": string
}

export interface bannerListParams extends paramsType {
    type?: 1 | 2
}

export function bannerListApi(params?: bannerListParams): Promise<baseResponse<listResponse<bannerListType>>> {
    return useAxios.get("/api/banner", {params})
}

export interface bannerType {
    id?: number
    "cover": string
    "href": string
    "show": boolean
}

export function bannerUpdateApi(data: bannerType): Promise<baseResponse<string>> {
    if (data.id) {
        return useAxios.put("/api/banner/" + data.id.toString(), data)
    }
    return useAxios.post("/api/banner", data)
}