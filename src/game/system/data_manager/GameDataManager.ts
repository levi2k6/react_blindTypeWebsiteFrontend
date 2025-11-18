import type { Response, Challenge } from "../../../utils/interfaces"; 
import { apiFetch } from "../../../utils/apiUtils";
import { ChallengeType } from "../../../utils/enums";

export async function getStringChallenge(type: ChallengeType, amount: number) : Promise<Challenge[]>{
    try{
	const typeString = ChallengeType[type].toLowerCase();
	const response: Response<Challenge[]> | undefined = await apiFetch("GET", `http://localhost:8080/api/v1/public/game/${typeString}/challenge/random?amount=${amount}`);
	return response.data; 
	
    }catch(err){
	console.log("fetch error: ", err);
	throw err;
    }
}


