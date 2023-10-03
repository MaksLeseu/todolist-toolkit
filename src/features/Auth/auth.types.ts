export type MeType = {
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