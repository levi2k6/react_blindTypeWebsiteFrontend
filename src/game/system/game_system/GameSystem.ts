import GameRouter from "../../component/GameRouter";

import Timer from "../Timer";

import { ChallengeType } from "../../../utils/enums";
import type Game from "./strategy/Game";
import GameRegistry from "./GameRegistry";
import GameConfigManager from "../game_config/GameConfigManager";
import type Visualizer from "../../../component/Visualizer";

class GameSystem{

    private currentGame: Game | undefined;
    private type : ChallengeType = ChallengeType.NONE;
    private isContinuous: boolean = false; 

    private gameConfigManager: GameConfigManager;
    private gameRouter: GameRouter;
    private visualizer: Visualizer;
    private isGaming: boolean = false;
    private gameRegistry: GameRegistry;

    private timer: Timer = new Timer(); 

    constructor(gameRouter: GameRouter, gameConfigManager: GameConfigManager, visualizer: Visualizer){
	this.gameRouter = gameRouter;
	this.gameConfigManager = gameConfigManager;   
	this.gameRegistry = new GameRegistry(gameRouter, this, gameConfigManager , this.timer );
	this.visualizer = visualizer;
    }

    getGame(){
	return this.currentGame;
    }

    switchGame(type: ChallengeType){
	this.currentGame = this.gameRegistry.getGame(type);
    };

    gameInit(){
	this.currentGame!.gameInit();
    }

    gameReset(){
	this.currentGame!.gameReset();
    }

    async gameStart(){
	//gameConfigManager setup
	this.gameConfigManager.setGameConfig(this.type);
	this.isContinuous = this.gameConfigManager.getCurrentGameConfig().continuous;
	console.log("isContinuous: ", this.isContinuous);

	this.gameInit();
	this.isGaming = true;
    }

    gameInput(playerInput: string){
	this.currentGame!.guessLetter(playerInput);
    }  

    async gameEnd(){
	this.visualizer.system.startDisappear();
	this.gameRouter.textHolder.style.visibility = "visible";
	this.gameRouter.startButton.disabled = false;
	this.isGaming = false; 
	this.gameRouter.div1.style.visibility = "visible";
	this.gameRouter.system.setDivGradient();
	// this.gameRouter.system.getInput().turnOffInput();
    }

    getIsContinuous(){
	return this.isContinuous;
    }
    setIsContinuous(state: boolean){
	this.isContinuous = state;
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
