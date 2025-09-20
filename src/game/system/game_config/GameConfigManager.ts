import { ChallengeType } from "../../../utils/enums";
import GameConfigRegistry from "./GameConfigRegistry";
import type { GameConfigStrategy } from "./strategy/GameConfigStrategy";

import LetterGameConfig from "./strategy/LetterGameConfig";
import SentenceGameConfig from "./strategy/SentenceGameConfig";
import WordGameConfig from "./strategy/WordGameConfig";

class GameConfigManager{

    private currentGameConfig: GameConfigStrategy | undefined;
    private gameConfigRegistry: GameConfigRegistry;

    public constructor(){
	this.gameConfigRegistry = new GameConfigRegistry();
    }

    setGameConfig(type: ChallengeType){
	this.currentGameConfig = this.gameConfigRegistry.getGameConfig(type); 
    }

    public getAmountRequest(){
	return this.currentGameConfig?.getGameConfig().multiple;
    }

}


export default GameConfigManager; 

