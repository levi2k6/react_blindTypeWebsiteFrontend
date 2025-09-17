import type { Challenge } from "../../../../utils/interfaces";

abstract class Game{
    public abstract getName(): string; 
    public abstract gameInit(challenges: Challenge[]): void;
    public abstract gameReset():void;
    public abstract guessLetter(playerInput: string): void;
}

export default Game;
