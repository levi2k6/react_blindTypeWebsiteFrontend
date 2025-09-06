import type { GameConfig } from "../utils/types";


class Game{

    private gameConfig: GameConfig | null = null; 

    setGameConfig(gameConfig: GameConfig){
	this.gameConfig = gameConfig;
    }

    getGameConfig(){
	return this.gameConfig;
    }

}

export default Game;

