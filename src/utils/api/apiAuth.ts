import { Api } from "./Api";

const uri = import.meta.env.VITE_URL; 
console.log("apiAuth uri: ", uri);
const headers = {"Content-Type": "application/json"}
const credentials = "include";

const api = new Api(uri, headers, credentials);

export function apiLogin(){
    api.get("/public/auth/login");
} 

export function apiLogout(){
    return api.get("/public/auth/logout")
}

export function apiRegister(payload: Record<string, string>){
    api.post("/public/auth/register", payload)
} 


