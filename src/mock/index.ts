import {userMock} from "@/mock/user_mock";


export function apiMock(){
    const env = import.meta.env
    if (env.VITE_MOCK !== "true"){
        return
    }
    userMock()
}