import { ChallengeType } from "../../../utils/enums";
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

    public setGameConfig(type: ChallengeType){
	this.currentGameConfig = this.gameConfigRegistry.getGameConfig(type); 
    }

    public getAmountRequest(){
	return this.currentGameConfig?.getGameConfig().multiple;
    }

}


export default GameConfigManager; 

