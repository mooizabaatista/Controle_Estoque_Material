import { User } from "./user";

export interface LoginResponse {
    result: User,
    token: string
}
