
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


