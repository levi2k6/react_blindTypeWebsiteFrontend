import type { SentenceChallenge } from "../../utils/interfaces";
import { apiFetch } from "../../utils/apiUtils";


export async function getSentenceChallenge<T>(amount: string) : Promise<SentenceChallenge>{
    try{
	const response = await apiFetch<SentenceChallenge[]>("GET", `http://localhost:8080/Game/sentence/challenge?amount=${amount}`);
	return response.data; 
	
    }catch(err){
	console.log("fetch error: ", err);
	throw err;
    }
}
