import GameRouter from "../../component/GameRouter";

import Timer from "../Timer";

import { ChallengeType } from "../../../utils/enums/ChallengeTypeEnum";
import type Game from "./strategy/Game";
import GameRegistry from "./GameRegistry";
import GameConfigManager from "../game_config/GameConfigManager";
import Visualizer from "../../component/Visualizer";
import type { GameConfig } from "../../../utils/types/GameConfigType";
import StringGame from "./strategy/StringGame";
import LetterGame from "./strategy/LetterGame";

class GameSystem{

    private currentGame: Game | undefined;
    private type : ChallengeType = ChallengeType.NONE;
    private isContinuous: boolean = false; 

    private gameConfigManager: GameConfigManager;
    private gameRouter: GameRouter;
    private isGaming: boolean = false;
    private gameRegistry: GameRegistry;

    private timer: Timer = new Timer(); 

    constructor(gameRouter: GameRouter, gameConfigManager: GameConfigManager){
	this.gameRouter = gameRouter;
	this.gameConfigManager = gameConfigManager;   
	this.gameRegistry = new GameRegistry();
    }

    public initSystem(){
	if(this.currentGame instanceof StringGame){
	    const stringGame = this.currentGame as StringGame;
	    stringGame.initSystem(this.gameRouter, this, this.gameConfigManager);
	}else if(this.currentGame instanceof LetterGame){
	    const letterGame = this.currentGame as LetterGame;
	    letterGame.initSystem(this.gameRouter, this, this.gameConfigManager, this.timer);

	}
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
	const currentGameConfig: GameConfig | undefined = this.gameConfigManager?.getCurrentGameConfig(); 
	if(currentGameConfig == undefined){
	    console.error("Failed to ");
	    return;
	}
	this.isContinuous = currentGameConfig.continuous;
	console.log("isContinuous: ", this.isContinuous);

	this.gameInit();
	this.isGaming = true;
    }

    gameInput(playerInput: string){
	this.currentGame!.guessLetter(playerInput);
    }  

    async gameEnd(){
	if(!this.gameRouter) return;

	const visualizer = this.gameRouter.getChild("visualizer") as Visualizer;
	visualizer.system?.startDisappear();

	const textHolder = this.gameRouter.getChild("textHolder");
	textHolder.style.visibility = "visible";

	const startButton = this.gameRouter.getChildSelf("startButton") as HTMLButtonElement;
	startButton.disabled = false;

	this.isGaming = false; 
	this.gameRouter.getChild("div1").style.visibility = "visible";

	if(!this.gameRouter.system) return;
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
