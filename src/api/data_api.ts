import type {baseResponse, optionsType} from "@/api/index";
import {useAxios} from "@/api/index";

export function dataStatisticApi(): Promise<baseResponse<optionsType[]>> {
    return useAxios.get("/api/data/statistic")
}

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

export function dataWeatherApi(): Promise<baseResponse<weatherType>> {
    return useAxios.get("/api/data/weather")
}