export interface jwtPayload {
    "username": string
    "nick_name": string
    "role": number
    "user_id": number
    "exp": number
    "iss": string
}

export function parseToken(token: string): jwtPayload{
    const payLoadString = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
    return JSON.parse(decodeURIComponent(escape(window.atob(payLoadString))))
}