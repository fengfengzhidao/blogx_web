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

export const logLevelOptions = [
    {label: "info", value: 1, color: "blue"},
    {label: "warn", value: 2, color: "orange"},
    {label: "error", value: 3, color: "red"},
]

export const registerSourceOptions = [
    {label: "邮箱注册", value: 1, color: "blue"},
    {label: "QQ注册", value: 2, color: "orange"},
    {label: "命令行注册", value: 3, color: "red"},
]

export const relationOptions = [
    {label: "陌生人", value: 1, color: "red"},
    {label: "已关注", value: 2, color: "orange"},
    {label: "粉丝", value: 3, color: "green"},
    {label: "好友", value: 4, color: "blue"},
]