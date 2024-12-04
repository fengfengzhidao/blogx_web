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