import {instance} from "../../common/api/common.api";

const base = 'auth'

export const authApi = {
    me() {
        return instance.get<MeType>(`/${base}/me`)
    },
    login(data: LoginDataType) {
        return instance.post(`/${base}/login`, data)
    },
    logout() {
        return instance.delete(`/${base}/login`)
    }
}


type MeType = {
    data: MeDataType
    messages: []
    fieldsErrors: []
    resultCode: number
}

type MeDataType = {
    id: number
    login: string
    email: string
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}