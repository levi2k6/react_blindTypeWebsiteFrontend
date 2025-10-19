
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

export async function checkToken() {
    try {
    const res = await fetch('http://localhost:8080/api/private/auth/checkToken', {
	method: "GET",
	credentials: 'include', 
    });

    if (!res.ok) {
	if (res.status === 401) {
	    console.log("Token is invalid or expired");
	    return false;
	}
	throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();
    console.log("Token is valid:", data);
    return data;

    } catch (err) {
	console.error("Error checking token:", err);
	return false; 
    }
}
 

