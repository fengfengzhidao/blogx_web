import {type baseResponse, useAxios} from "@/api/index";


export function imageUploadApi(file: File): Promise<baseResponse<string>> {

    const form = new FormData()
    form.append("file", file)
    return useAxios.post("/api/images", form, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export async function onUploadImg(files: File[], callback: (urls: string[])=>void) {
    const resList = await Promise.all(files.map(file => imageUploadApi(file)))
    const urlList:string[] = resList.map((item) => item.data)
    callback(urlList)
}