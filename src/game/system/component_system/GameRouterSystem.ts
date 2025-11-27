import GameRouter from "../../component/GameRouter";
import GameSystem from "../game_system/GameSystem";
import Input from "../Input";
import { ChallengeType } from "../../../utils/enums/ChallengeTypeEnum";
import GameConfigManager from "../game_config/GameConfigManager";
import type Visualizer from "../../../component/Visualizer";

class GameRouterSystem{

    private gameRouter: GameRouter;

    private gameConfigManager: GameConfigManager;
    private gameSystem: GameSystem;
    private input: Input;

    getGameSystem(): GameSystem{
	return this.gameSystem;
    }
    getInput(): Input{
	return this.input; 
    }

    public constructor(gameRouter: GameRouter, gameConfigManager: GameConfigManager, visualizer: Visualizer){
	this.gameRouter = gameRouter;
	this.gameConfigManager = gameConfigManager;
	this.gameSystem = new GameSystem(gameRouter, this.gameConfigManager, visualizer); 
	this.input = new Input(this.gameRouter, this.gameSystem);
	this.input.turnOnInput();
    }

    public reset(){
	this.gameRouter.textHolder.system.reset();
	this.gameSystem.gameReset();
	this.gameRouter.startButton.disabled = true;
	this.gameRouter.div1.style.visibility = "hidden";
    }

    setGameType(type: ChallengeType){
	this.gameRouter.startButton.disabled = false;
	this.gameSystem.setType(type);
	this.gameSystem.switchGame(type);
    }


    async startGame(){
	this.reset();
	this.gameSystem.gameStart();
	this.gameRouter.system.setDivGradient();
    }

    setRootBackgroundColor(){
	if(this.gameSystem.getIsGaming()){
	    document.documentElement.style.background = "black";
	}else{
	    document.documentElement.style.background = "#242424";
	}
    }

    setDivGradientSize(){

	if(this.gameSystem.getIsGaming()){
	    this.gameRouter.divGradient.style.height = "50%";
	}else{
	    this.gameRouter.divGradient.style.height = "100%";
	}

    }

    setDivGradient(){
	if(this.gameSystem.getIsGaming()){
	    this.gameRouter.divGradient.style.setProperty("--upGradient", "40%");
	    this.gameRouter.divGradient.style.setProperty("--downGradient", "60%");
	}else{
	    this.gameRouter.divGradient.style.setProperty("--upGradient", "0%");
	    this.gameRouter.divGradient.style.setProperty("--downGradient", "100%");
	}

    }
}

export default GameRouterSystem; 

