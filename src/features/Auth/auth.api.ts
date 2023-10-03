import {instance} from "../../common/api/common.api";
import {LoginDataType, MeType} from "./auth.types";

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
