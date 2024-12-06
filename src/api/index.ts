import axios from "axios";
import {Message} from "@arco-design/web-vue";
import {userStorei} from "@/stores/user_store";
import type {Ref} from "vue";

export interface baseResponse<T> {
    code: number
    msg: string
    data: T
}

export interface listResponse<T> {
    list: T[]
    count: number
}

export interface paramsType {
    key?: string
    limit?: number
    page?: number
    sort?: string
    [key: string]: any
}

export const useAxios = axios.create({
    timeout: 6000,
    baseURL: "", // 在使用前端代理的情况下，这里必须留空，不然会跨域
})

useAxios.interceptors.request.use((config) => {
    const userStore = userStorei()
    config.headers.set("token", userStore.userInfo.token)
    return config
})

useAxios.interceptors.response.use((res) => {
    if (res.status === 200) {
        return res.data
    }
    return res
}, (res) => {
    Message.error(res.message)
})

export function defaultDeleteApi(url: string, idList: number[]): Promise<baseResponse<string>> {
    return useAxios.delete(url, {data: {idList}})
}
export function defaultPostApi(url: string, data: any): Promise<baseResponse<string>> {
    return useAxios.post(url, data)
}

export function defaultPutApi(url: string, data: any): Promise<baseResponse<string>> {
    return useAxios.put(url, data)
}
export interface optionsType {
    label: string
    value: number | string
}

export type optionsFunc = (params?: paramsType) => Promise<baseResponse<optionsType[]>>

export function getOptions(ref: Ref<optionsType[]>, func: optionsFunc, params?: paramsType){
    func(params).then((res)=>{
        ref.value = res.data
    })
}