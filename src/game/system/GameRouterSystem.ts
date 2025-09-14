
import type { Response, Challenge, SentenceChallenge } from "../../utils/interfaces";
import { apiFetch } from "../../utils/apiUtils";
import type GameRouter from "../component/GameRouter";
import GameSystem from "./GameSystem";
import Input from "./Input";
import GameConfigSystem from "./GameConfigSystem";

class GameRouterSystem{

    private gameRouter: GameRouter;

    private gameConfigSystem: GameConfigSystem = new GameConfigSystem(); 
    private gameSystem: GameSystem;
    private input: Input;

    getGameSystem(): GameSystem{
	return this.gameSystem;
    }
    getInput(): Input{
	return this.input; 
    }

    constructor(gameRouter: GameRouter){
	this.gameRouter = gameRouter;
	this.gameSystem = new GameSystem(gameRouter); 
	this.input = new Input(this.gameRouter, this.gameSystem);
    }

    async startGame(){
	this.gameRouter.textHolder.system.removeLetters();
	this.gameRouter.textHolder.style.display = "none";
	this.gameRouter.startButton.disabled = true;
	this.gameRouter.div1.style.display = "none"

	let amount: number = 0;

	if(this.gameSystem.getType() === "letter"){ 
	    amount = this.gameConfigSystem.letterConfig.multiple; 
	}else if(this.gameSystem.getType() === "word"){ 
	    amount = this.gameConfigSystem.wordConfig.multiple; 
	}else if(this.gameSystem.getType() === "sentence"){ 
	    amount = this.gameConfigSystem.sentenceConfig.multiple; 
	}else{
	    return
	}

	const response: Response<Challenge[]> | undefined = await apiFetch("GET", `http://localhost:8080/Game/${this.gameSystem.getType()}/challenge?amount=${amount}`);

	if(response === undefined){
	    console.log("challenge response is undefiend");
	    return;
	}

	console.log("response: ", response);

	this.gameSystem.init(response.data);
    }

    setGameType(type: string){
	if(!this.gameSystem.getType()){
	    this.input.turnOnInput();
	}

	this.gameSystem.setType(type);
	if(this.gameSystem.getType()){
	    this.gameRouter.startButton.disabled = false;
	}
    }

}

export default GameRouterSystem; 

