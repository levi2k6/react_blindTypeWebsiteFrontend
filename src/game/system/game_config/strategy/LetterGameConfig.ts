import type { GameConfig } from "../../../../utils/types";
import type { GameConfigStrategy } from "./GameConfigStrategy";

class LetterGameConfig implements GameConfigStrategy{

    letterConfig: GameConfig = {
	difficulty: "easy",
	multiple: 3,
	continuous: false
    } 

    getGameConfig(): GameConfig{
	return this.letterConfig;
    }

    setGameConfig(gameConfig: GameConfig){
	this.letterConfig = gameConfig;
    }
}

export default LetterGameConfig;
