import type { Response, User } from "../interfaces";
import { Api } from "./Api";

const url = import.meta.env.VITE_URL; 
const headers = {"Content-Type": "application/json"}
const credentials = "include";

const api = new Api(url, headers, credentials);

export function getAuthUser(): Promise<Response<User>>{
    return api.get("/private/user/auth-user");
} 

export function registerUser(registerPayload: Record<string, string>){
    api.post("/private/user/register", registerPayload, )
}

