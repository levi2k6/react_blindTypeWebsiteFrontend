import type { GameConfig } from "./types";

export interface Response<T>{
    message: string;
    data: T;
}

export interface Challenge{
    id: number;
    difficulty: "easy" | "normal" | "hard";
    text: string;
    audioName: string; 
} 

export interface UserGameConfig{
    letterConfig: GameConfig;
    wordConfig: GameConfig;
    sentenceConfig: GameConfig;
}

