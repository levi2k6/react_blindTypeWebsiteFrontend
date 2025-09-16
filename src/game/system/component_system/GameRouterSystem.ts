import type { Response, Challenge } from "../../../utils/interfaces";
import { apiFetch } from "../../../utils/apiUtils";
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

    public constructor(gameRouter: GameRouter){
	this.gameRouter = gameRouter;
	this.gameSystem = new GameSystem(gameRouter); 
	this.gameConfigManager = new GameConfigManager();
	this.input = new Input(this.gameRouter, this.gameSystem);
    }

    async startGame(){
	this.gameRouter.textHolder.system.removeLetters();
	this.gameRouter.textHolder.style.display = "none";
	this.gameRouter.startButton.disabled = true;
	this.gameRouter.div1.style.display = "none"

	this.gameConfigManager.setGameConfig(this.gameSystem.getType());
	const amount = this.gameConfigManager.getAmountRequest();

	const typeString = ChallengeType[this.gameSystem.getType()].toLowerCase();

	const response: Response<Challenge[]> | undefined = await apiFetch("GET", `http://localhost:8080/Game/${typeString}/challenge?amount=${amount}`);

	if(response === undefined){
	    console.log("challenge response is undefiend");
	    return;
	}

	console.log("response: ", response);

	this.gameSystem.init(response.data);
    }

    setGameType(type: ChallengeType){
	this.gameRouter.startButton.disabled = false;
	this.gameSystem.setType(type);
	this.gameSystem.switchGame(type);
    }

}

export default GameRouterSystem; 

