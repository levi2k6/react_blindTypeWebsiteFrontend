import GameRouter from "../../component/GameRouter";
import GameSystem from "../game_system/GameSystem";
import Input from "../Input";
import { ChallengeType } from "../../../utils/enums";
import GameConfigManager from "../game_config/GameConfigManager";

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

    public constructor(gameRouter: GameRouter, gameConfigManager: GameConfigManager){
	this.gameRouter = gameRouter;
	this.gameConfigManager = gameConfigManager;
	this.gameSystem = new GameSystem(gameRouter, this.gameConfigManager); 
	this.input = new Input(this.gameRouter, this.gameSystem);
	this.input.turnOnInput();
    }

    public reset(){
	this.gameRouter.textHolder.system.reset();
	this.gameSystem.gameReset();
	this.gameRouter.startButton.disabled = true;
	this.gameRouter.div1.style.display = "none"
    }

    setGameType(type: ChallengeType){
	this.gameRouter.startButton.disabled = false;
	this.gameSystem.setType(type);
	this.gameSystem.switchGame(type);
    }


    async startGame(){
	this.reset();
	this.gameSystem.gameStart();
    }

}

export default GameRouterSystem; 

