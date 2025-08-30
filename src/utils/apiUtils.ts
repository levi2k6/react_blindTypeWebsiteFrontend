
import type { ChallengeResponse } from "../utils/interfaces.ts"

export async function apiFetch(requestType: string, url: string) : Promise<ChallengeResponse | undefined>{
    try{
	const res = await fetch(url, {
	    method: requestType,
	    headers: {
		"Content-Type": "application/json",
	    }
	}); 
	const data: ChallengeResponse = await res.json();
	return data;
    }catch(err){
	console.log("fetch error: ", err);
    }
}



