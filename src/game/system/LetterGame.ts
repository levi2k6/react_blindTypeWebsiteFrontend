import System from "../../class/System";
import type { LetterChallenge } from "../../utils/interfaces";
import type GameRouter from "../component/GameRouter";
import type GameSystem from "./GameSystem";


class LetterGame extends System{

    private gameRouter: GameRouter;
    private gameSystem: GameSystem;

    private challenges: LetterChallenge[] = [];

    constructor(gameRouter: GameRouter, gameSystem: GameSystem){
	super()
	this.gameRouter = gameRouter;
	this.gameSystem = gameSystem;
    }

    gameInit(challenges: LetterChallenge[]){
	this.challenges = challenges;
    }

    guessLetter(userInput: string){
    }


}


export default LetterGame;
