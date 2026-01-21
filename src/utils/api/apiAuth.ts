import { Api } from "./Api";

const uri = import.meta.env.VITE_URL; 
console.log("apiAuth uri: ", uri);
const headers = {"Content-Type": "application/json"}
const credentials = "include";

const api = new Api(uri, headers, credentials);

export function apiLogin(payload: Record<string, string>){
    return api.post("/auth/login", payload);
} 

export function apiLogout(){
    return api.get("/auth/logout");
}

export function apiRegister(payload: Record<string, string>){
    return api.post("/auth/register", payload);
} 

export function apiRefresh(){
    return api.get("/auth/refresh");
} 


