import { Api } from "./Api";

const userUri = import.meta.env.VITE_USER_URI; 
const headers = {"Content-Type": "application/json"}
const credentials = "include";

const api = new Api(userUri, headers, credentials);

export function apiLogin(){
    api.get("/auth/login");
} 

export function apiLogout(){
    api.get("/auth/logout")
}

export function apiRegister(payload: Record<string, string>){
    api.post("/auth/register", payload)
} 


