import { ChallengeType } from "../../../utils/enums";
import type { GameConfig } from "../../../utils/types";
import GameConfigRegistry from "./GameConfigRegistry";
import type { GameConfigStrategy } from "./strategy/game_config/GameConfigStrategy";

class GameConfigManager{

    private currentGameConfig: GameConfigStrategy | undefined;
    private gameConfigRegistry: GameConfigRegistry;

    public constructor(){
	this.gameConfigRegistry = new GameConfigRegistry();
    }

    public getCurrentGameConfig(){
	return this.currentGameConfig?.getGameConfig(); 
    } 

    public setChallengeGameConfig(gameConfig: GameConfig){
	console.log("gameConfig: ", gameConfig);
	this.currentGameConfig?.setGameConfig(gameConfig); 
    } 

    public setGameConfig(type: ChallengeType){
	console.log("type: ", type);
	this.currentGameConfig = this.gameConfigRegistry.getGameConfig(type); 
    }

    public getGameConfigMultiple(){
	return this.currentGameConfig?.getGameConfig().multiple;
    }

}


export default GameConfigManager; 

