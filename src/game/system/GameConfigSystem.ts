import type { UserGameConfig } from "../../utils/interfaces";
import type { GameConfig } from "../../utils/types";

class GameConfigSystem{

    letterConfig: GameConfig = {
	difficulty: "easy",
	multiple: 8,
	continuous: false
    }

    wordConfig: GameConfig = {
	difficulty: "easy",
	multiple: 8,
	continuous: false 
    }

    sentenceConfig: GameConfig = {
	difficulty: "easy",
	multiple: 3,
	continuous: false
    } 

    constructor(){
    }

    setUserConfig(userConfig: UserGameConfig){
	console.log(userConfig);
	this.letterConfig = userConfig.letterConfig;
	this.wordConfig = userConfig.wordConfig;
	this.sentenceConfig = userConfig.sentenceConfig;
    }

}

export default GameConfigSystem; 
