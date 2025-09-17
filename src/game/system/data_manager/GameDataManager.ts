import type { Response, Challenge } from "../../../utils/interfaces"; 
import { apiFetch } from "../../../utils/apiUtils";
import { ChallengeType } from "../../../utils/enums";

export async function getChallenge(type: ChallengeType, amount: number) : Promise<Challenge[]>{
    try{
	// const response = await apiFetch<Challenge[]>("GET", `http://localhost:8080/Game/sentence/challenge?amount=${amount}`);
	//
	const typeString = ChallengeType[type].toLowerCase();
	const response: Response<Challenge[]> | undefined = await apiFetch("GET", `http://localhost:8080/Game/${typeString}/challenge?amount=${amount}`);
	return response.data; 
	
    }catch(err){
	console.log("fetch error: ", err);
	throw err;
    }
}
