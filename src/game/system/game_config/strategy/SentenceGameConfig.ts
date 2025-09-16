import type { GameConfig } from "../../../../utils/types";
import type { GameConfigStrategy } from "./GameConfigStrategy";

class SentenceGameConfig implements GameConfigStrategy{

    sentenceConfig: GameConfig = {
	difficulty: "easy",
	multiple: 3,
	continuous: false
    } 

    getGameConfig(): GameConfig{
	return this.sentenceConfig;
    }

    setGameConfig(gameConfig: GameConfig){
	this.sentenceConfig = gameConfig;
    }
}

export default SentenceGameConfig;
