import type { GameConfig } from "../../../utils/types";
import type { GameConfigStrategy } from "./strategy/game_config/GameConfigStrategy";

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
