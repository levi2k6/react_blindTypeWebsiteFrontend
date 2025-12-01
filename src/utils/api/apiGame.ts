import type { Challenge, Response } from "../interfaces";
import { Api } from "./Api";

const url = import.meta.env.VITE_URL; 
const headers = {"Content-Type": "application/json"}
const credentials = "include";

const api = new Api(url, headers, credentials);


export function getRandomGameText(type: string, amount: number): Promise<Response<Challenge[]>>{
    return api.get(`/public/game/${type.toLowerCase()}/challenge/random?amount=${amount}`)
}

// export function getRandomLetter(amount: number){
//     api.get(`/public/game/letter/challenge/random?amount=${amount}`);
// }; 
//
// export function getRandomWord(amount: number){
//     api.get(`/public/game/word/challenge/random?amount=${amount}`);
// };
//
// export function getSentence(amount: number){
//     api.get(`/public/game/sentence/challenge/random?amount=${amount}`);
// };

