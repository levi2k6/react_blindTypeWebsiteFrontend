import GameRouter from "../../component/GameRouter";


import Timer from "../Timer";

import { getChallenge } from "../data_manager/GameDataManager"; 
import { ChallengeType } from "../../../utils/enums";
import type { Challenge } from "../../../utils/interfaces";
import type Game from "./strategy/Game";
import GameRegistry from "./GameRegistry";
import GameConfigManager from "../game_config/GameConfigManager";

class GameSystem{

    private currentGame: Game | undefined;
    private type : ChallengeType = ChallengeType.NONE;

    private gameConfigManager: GameConfigManager;
    private gameRouter: GameRouter;
    private isGaming: boolean = false;
    private gameRegistry: GameRegistry;

    private timer: Timer = new Timer(); 


    constructor(gameRouter: GameRouter, gameConfigManager: GameConfigManager){
	this.gameRouter = gameRouter;
	this.gameRegistry = new GameRegistry(gameRouter, this, this.timer);
	this.gameConfigManager = gameConfigManager;   
    }

    getGame(){
	return this.currentGame;
    }

    switchGame(type: ChallengeType){
	this.currentGame = this.gameRegistry.getGame(type);
    };

    gameInit(challenges: Challenge[]){
	this.currentGame!.gameInit(challenges);
    }

    gameReset(){
	this.currentGame!.gameReset();
    }

    async gameStart(){
	console.log("look at type here: ", this.type);
	this.gameConfigManager.setGameConfig(this.type);
	const amount = this.gameConfigManager.getAmountRequest();
	if(!amount){
	    console.log("Game amount has no data");
	    return;
	}
	const response: Challenge[] = await getChallenge(this.type, amount);
	if(response === undefined){
	    console.log("challenge response is undefiend");
	    return;
	}

	this.gameInit(response);
	this.isGaming = true;

    }

    gameInput(playerInput: string){
	this.currentGame!.guessLetter(playerInput);
    }  

    gameEnd(){
	this.gameRouter.textHolder.style.display = "flex";
	this.gameRouter.startButton.disabled = false;
	this.isGaming = false; 
	this.gameRouter.div1.style.display = "flex";
	// this.gameRouter.system.getInput().turnOffInput();
    }

    getIsGaming(){
    return this.isGaming;
    }
    setIsGaming(state: boolean){
	console.log("isgaming setted");
	this.isGaming = state;
    }
    setType(type: ChallengeType){
	this.type = type;
    }
    getType(){
       return this.type;
    }

} 

export default GameSystem;
