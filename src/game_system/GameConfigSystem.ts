import type { Response, UserConfig, UserGameConfig } from "../utils/interfaces";
import type { GameConfig } from "../utils/types";
import type Game from "./Game";

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
	multiple: 5,
	continuous: false
    } 

    constructor(){
    }

    setUserConfig(userConfig: Response<UserGameConfig>){
	console.log(userConfig);
	this.letterConfig = userConfig.data.letterConfig;
	this.wordConfig = userConfig.data.wordConfig;
	this.sentenceConfig = userConfig.data.sentenceConfig;
    }

}

export default GameConfigSystem; 
