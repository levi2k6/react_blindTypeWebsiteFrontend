import { Api } from "./Api";

const userUri = import.meta.env.VITE_GAME_URI; 
const headers = {"Content-Type": "application/json"}
const credentials = "include";

const api = new Api(userUri, headers, credentials);


export function getRandomLetter(amount: number){
    api.get(`/letter/challenge/random?amount=${amount}`);
}; 

export function getRandomWord(amount: number){
    api.get(`/word/challenge/random?amount=${amount}`);
};

export function getSentence(amount: number){
    api.get(`/sentence/challenge/random?amount=${amount}`);
};

