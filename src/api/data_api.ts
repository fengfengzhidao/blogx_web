import type {baseResponse} from "@/api/index";
import {useAxios} from "@/api/index";

export interface weatherType {
    "province": string
    "city": string
    "adcode": string
    "weather": string // 天气
    "temperature": string // 温度
    "winddirection": string
    "windpower": string
    "humidity": string
    "reporttime": string
    "temperature_float": string
    "humidity_float": string
}

export interface dataSumType {
    "flowCount": number
    "userCount": number
    "articleCount": number
    "messageCount": number
    "commentCount": number
    "newLoginCount": number
    "newSignCount": number
}

export interface dataLoginStatisticType {
    date_list: string[]
    login_data: number[]
    sign_data: number[]
}

export function dataSumApi(): Promise<baseResponse<dataSumType>> {
    return useAxios.get("/api/data/sum")
}

export interface dataGrowthType {
    "growthRate": number
    "growthNum": number
    "countList": number[]
    "dateList": number[]
}

export function dataGrowthApi(type: 1 | 2 | 3): Promise<baseResponse<dataGrowthType>> {
    return useAxios.get("/api/data/growth", {params: {type}})
}

export function dataArticleGrowthApi(): Promise<baseResponse<dataGrowthType>> {
    return useAxios.get("/api/data/article/year")
}