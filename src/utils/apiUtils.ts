
import type { Response, Challenge } from "../utils/interfaces.ts"

export async function apiFetch(requestType: string, url: string) : Promise<Response<Challenge> | undefined>{
    try{
	const res = await fetch(url, {
	    method: requestType,
	    headers: {
		"Content-Type": "application/json",
	    }
	}); 
	const data: Response<Challenge> = await res.json();
	return data;
    }catch(err){
	console.log("fetch error: ", err);
    }
}



