import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index";

export interface bannerListType {
    "id": number
    "createdAt": string
    "updatedAt": string
    "show": boolean
    "cover": string
    "href": string
}

export function bannerListApi(params?: paramsType):Promise<baseResponse<listResponse<bannerListType>>>{
    return useAxios.get("/api/banner", {params})
}