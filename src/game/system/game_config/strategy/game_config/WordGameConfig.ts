import type { GameConfig } from "../../../../../utils/types/GameConfigType";
import type { GameConfigStrategy } from "./GameConfigStrategy";

class WordGameConfig implements GameConfigStrategy{

    wordConfig: GameConfig = {
	difficulty: "easy",
	multiple: 3,
	continuous: false
    } 

    getGameConfig(): GameConfig{
	return this.wordConfig;
    }

    setGameConfig(gameConfig: GameConfig){
	this.wordConfig = gameConfig;
    }
}

export default WordGameConfig;
