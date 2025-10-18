import type { GameConfig } from "./types";

export interface Response<T>{
    message: string;
    data: T;
}

export interface Challenge{
    text: string;
}

export interface StringChallenge extends Challenge{
    id: number;
    difficulty: "easy" | "normal" | "hard";
    text: string;
    audioName: string;
}

export interface LetterChallenge extends Challenge{
    id: number;
    text: string;
}

export interface UserGameConfig{
    letterConfig: GameConfig;
    wordConfig: GameConfig;
    sentenceConfig: GameConfig;
}

export interface User{
    id: string;
    name: string;
    email: string;
}


