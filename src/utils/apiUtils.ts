import type { Response } from "../utils/interfaces.ts"

export async function apiFetch<T>(method: string, url: string) : Promise<Response<T>>{
    try{
	const res = await fetch(url, {
	    method: method,
	    headers: {
		"Content-Type": "application/json",
	    },
	    credentials: "include"
	}); 

	if(!res.ok){
	    throw new Error(`HTTP error! status: ${res.status}`);
	}

	const data: Response<T> = await res.json();
	return data;
    }catch(err){
	console.log("fetch error: ", err);
	throw err;
    }
}

export async function apiToken(url: string, tokenType: string) {
    try {
	const res = await fetch(url , {
	method: "GET",
	credentials: 'include', 
    });

    if (!res.ok) {
	if (res.status === 401) {
	    console.error(`${tokenType} is invalid or expired`);
	    return false;
	}
	throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();
    console.log("Token is valid:", data);
    return data;

    } catch (err) {
	console.error(`Error checking ${tokenType}:`, err);
	console.error("You are not authenticated");
	return false; 
    }
}

export async function checkAccessToken(){
    const response = await apiToken("http://localhost:8080/api/v1/private/auth0/checkToken", "access_token");

    return response; 
}

export async function refreshToken() {
    const  response = await apiToken("http://localhost:8080/api/v1/public/auth0/refresh", "refresh_token");
    return response;
}



