import { Api } from "./Api";

const userUri = import.meta.env.VITE_USER_URI; 
const headers = {"Content-Type": "application/json"}
const credentials = "include";

const api = new Api(userUri, headers, credentials);

export function getAuthUser(){
    api.get("/user/auth-user");
} 

export function registerUser(registerPayload: Record<string, string>){
    api.post("/user", registerPayload, )
}

