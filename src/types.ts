export type CreatePaymentParams = {

    gaverId: number,
    receiverId: number,
    value: number,
}

export type PaymentParams = {
    id: number | undefined,
    receiverNick: string,
    receiverEmail: string,
    authorization: string,
    value: number
}

export type CreateUserParams = {
    id: number,
    nickName: string,
    email: string,
    password: string
}

export type AplicationError = {
    name: string,
    message: string,
    status: number
}

export type CreateSessionParams = {
    email: string,
    password: string
}

export type ApiUser = {
    id: number,
    nickName: string,
    email: string
}