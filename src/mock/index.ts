import {userMock} from "@/mock/user_mock";
import {dataMock} from "@/mock/data_mock";


export function apiMock(){
    const env = import.meta.env
    if (env.VITE_MOCK !== "true"){
        return
    }
    userMock()
    dataMock()
}