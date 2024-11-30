import type {optionsType} from "@/api";

export interface optionsColorType extends optionsType {
    color?: string
}

export const articleStatusOptions = [
    {label: "草稿", value: 1, color: "green"},
    {label: "审核中", value: 2, color: "red"},
    {label: "已发布", value: 3, color: "blue"},
    {label: "审核拒绝", value: 4, color: "red"},
]

export const roleOptions = [
    {label: "管理员", value: 1, color: "blue"},
    {label: "用户", value: 2, color: "green"},
    {label: "访客", value: 3, color: "red"},
]