import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index";

export interface articleSearchType {
    "id": number
    "createdAt": string
    "updatedAt": string
    "title": string,
    "abstract": string
    "categoryID": number
    "tagList": string[]
    "cover": string
    "userID": number
    "lookCount": number
    "diggCount": number
    "commentCount": number
    "collectCount": number
    "openComment": boolean
    "status": number
    "adminTop": boolean
    "categoryTitle": string
    "userNickname": string
    "userAvatar": string
}

export interface articleSearchRequest extends paramsType {
    tag?: string
    type: number // 0 猜你喜欢  1 最新发布  2最多回复 3最多点赞 4最多收藏
}

export function articleSearchApi(params: articleSearchRequest): Promise<baseResponse<listResponse<articleSearchType>>> {
    return useAxios.get("/api/search/article", {params})
}

export interface tagListType{
    "tag": string,
    "articleCount": number
}
export interface tagListRequest extends paramsType{

}
export function tagListApi(params: tagListRequest):Promise<baseResponse<listResponse<tagListType>>>{
    return useAxios.get("/api/search/tags", {params})
}