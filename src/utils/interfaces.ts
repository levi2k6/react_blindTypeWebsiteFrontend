import type { GameConfig } from "./types";

export interface Response<T>{
    message: string;
    data: T;
}

export interface Challenge{
    text: string;
}

export interface SentenceChallenge extends Challenge{
    id: number;
    difficulty: "easy" | "normal" | "hard";
    text: string;
    audioName: string;
}

export interface WordChallenge extends Challenge{
    id: number;
    difficulty: "easy" | "normal" | "hard";
    text: string;
} 

export interface LetterChallenge{
    id: number;
    text: string;
}

export interface UserGameConfig{
    letterConfig: GameConfig;
    wordConfig: GameConfig;
    sentenceConfig: GameConfig;
}


