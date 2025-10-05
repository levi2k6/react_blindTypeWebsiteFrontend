import type { Challenge } from "../../../../utils/interfaces";

abstract class Game{
    public abstract getName(): string; 
    public abstract gameInit(): void;
    public abstract gameReset(): void;
    public abstract gameEnd(): void; 
    public abstract guessLetter(playerInput: string): void;
    public abstract continuousAudioChange(): void;
}

export default Game;
