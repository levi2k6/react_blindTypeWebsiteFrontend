import GameRouter from "../../component/GameRouter";

import StringGame from "./strategy/StringGame";
import LetterGame from "./strategy/LetterGame";

import type { Challenge } from "../../../utils/interfaces";

import Timer from "../Timer";
import GameManager from "./GameManager";

import { ChallengeType } from "../../../utils/enums";
import type Game from "./strategy/Game";
import GameRegistry from "./GameRegistry";


class GameSystem{

    private currentGame: Game | undefined;
    private type : ChallengeType = ChallengeType.NONE;

    private gameRouter: GameRouter;

    private gameState: boolean = false;
    private gameRegistry: GameRegistry;
    private timer: Timer = new Timer(); 


    constructor(gameRouter: GameRouter){
	this.gameRouter = gameRouter;
	this.gameRegistry = new GameRegistry(gameRouter, this, this.timer);
    }

    getGame(){
	return this.currentGame;
    }

    switchGame(type: ChallengeType){
	this.currentGame = this.gameRegistry.getGame(type);
    };

    init(challenges: Challenge[]){
	this.currentGame!.gameInit(challenges);
    }

    gameInput(playerInput: string){
	this.currentGame!.guessLetter(playerInput);
    }  

    gameEnd(){
	this.gameRouter.textHolder.style.display = "flex";
	this.gameRouter.startButton.disabled = false;
	this.gameState = false; 
	this.gameRouter.div1.style.display = "flex";
	// this.gameRouter.system.getInput().turnOffInput();
    }

    get isGaming(){
    return this.gameState;
    }
    set isGaming(gameState: boolean){
	this.gameState = gameState;
    }
    setType(type: ChallengeType){
	this.type = type;
    }
    getType(){
       return this.type;
    }

} 

export default GameSystem;
