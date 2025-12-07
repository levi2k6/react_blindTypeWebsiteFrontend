import GameRouter from "../../component/GameRouter";
import GameSystem from "../game_system/GameSystem";
import Input from "../Input";
import { ChallengeType } from "../../../utils/enums/ChallengeTypeEnum";
import GameConfigManager from "../game_config/GameConfigManager";
import Visualizer from "../../component/Visualizer";
import type TextHolder from "../../component/TextHolder";

class GameRouterSystem{

    private gameRouter: GameRouter;

    private gameConfigManager: GameConfigManager;
    private gameSystem: GameSystem;
    private input: Input;

    public setGameTypeLetterHandler = () => this.setGameType(ChallengeType.LETTER)
    public setGameTypeWordHandler = () => this.setGameType(ChallengeType.WORD)
    public setGameTypeSentenceHandler = () => this.setGameType(ChallengeType.SENTENCE)

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
	// this.input.turnOnInput();
    }

    public reset(){

	const textHolder = this.gameRouter.getChild("textHolder") as TextHolder;
	textHolder.system.reset();
	this.gameSystem.gameReset();
	const startButton = this.gameRouter.getChildSelf("startButton") as HTMLButtonElement;
	startButton.disabled = true;
	this.gameRouter.getChild("div1").style.visibility = "hidden";
    }

    public setGameType(type: ChallengeType){
	const startButton = this.gameRouter.getChildSelf("startButton") as HTMLButtonElement;
	startButton.disabled = false;

	this.gameSystem.setType(type);
	this.gameSystem.switchGame(type);
    }

    public async startGame(){
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
	    this.gameRouter.getChild("divGradient").style.height = "50%";
	}else{
	    this.gameRouter.getChild("divGradient").style.height = "100%";
	}
    }

    setDivGradient(){
	if(this.gameSystem.getIsGaming()){
	    this.gameRouter.getChild("divGradient").style.setProperty("--upGradient", "40%");
	    this.gameRouter.getChild("divGradient").style.setProperty("--downGradient", "60%");
	}else{
	    this.gameRouter.getChild("divGradient").style.setProperty("--upGradient", "0%");
	    this.gameRouter.getChild("divGradient").style.setProperty("--downGradient", "100%");
	}

    }
}

export default GameRouterSystem; 

