export interface Response<T>{
    message: string;
    data: T;
}


export interface Challenge{
    id: number;
    difficulty: "easy" | "normal" | "hard";
    text: string;
} 


