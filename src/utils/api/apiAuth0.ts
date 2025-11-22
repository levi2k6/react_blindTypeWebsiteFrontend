import { Api } from "./Api";

const userUri = import.meta.env.VITE_AUTH0_URI; 
const headers = {"Content-Type": "application/json"}
const credentials = "include";

const api = new Api(userUri, headers, credentials);

export function login(){
    api.get("/auth0/login");
} 


