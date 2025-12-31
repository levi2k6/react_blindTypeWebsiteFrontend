import { Api } from "./Api";

const url = import.meta.env.VITE_URL; 
const headers = {"Content-Type": "application/json"}
const credentials = "include";

const api = new Api(url, headers, credentials);

export function login(){
    api.get("/public/auth0/login");
} 


