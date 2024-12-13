import {type baseResponse, useAxios} from "@/api/index";


export interface feedbackCreateRequest {
    email: string
    content: string
}

export function feedbackCreateApi(data: feedbackCreateRequest):Promise<baseResponse<string>>{
    return useAxios.post("/api/feedback", data)
}