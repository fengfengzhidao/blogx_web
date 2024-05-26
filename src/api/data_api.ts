import type {baseResponse, optionsType} from "@/api/index";
import {useAxios} from "@/api/index";

export function dataStatisticApi():Promise<baseResponse<optionsType[]>>{
    return useAxios.get("/api/data/statistic")
}