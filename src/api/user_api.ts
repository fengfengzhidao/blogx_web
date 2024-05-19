import {type baseResponse, useAxios} from "@/api/index";


export interface emailLoginRequest {
    user_name: string
    password: string
}

export function emailLoginApi(data: emailLoginRequest): Promise<baseResponse<string>>{
    return useAxios.post("/api/email_login", data)
}