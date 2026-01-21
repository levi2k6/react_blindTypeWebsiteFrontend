import type { Challenge, Response } from "../interfaces";
import { Api } from "./Api";

const url = import.meta.env.VITE_URL; 
const headers = {"Content-Type": "application/json"}
const credentials = "include";

const api = new Api(url, headers, credentials);


export function getRandomGameChallenge(type: string, amount: number): Promise<Response<Challenge[]>>{
    return api.get(`/game/${type.toLowerCase()}/challenge/random?amount=${amount}`)
}

// export function getRandomLetter(amount: number){
//     api.get(`/game/letter/challenge/random?amount=${amount}`);
// }; 
//
// export function getRandomWord(amount: number){
//     api.get(`/game/word/challenge/random?amount=${amount}`);
// };
//
// export function getSentence(amount: number){
//     api.get(`/game/sentence/challenge/random?amount=${amount}`);
// };

