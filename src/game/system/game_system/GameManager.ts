import { ChallengeType } from "../../../utils/enums/ChallengeTypeEnum";
import type { Challenge } from "../../../utils/interfaces";
import GameSystem from "./GameSystem";
import Game from "./strategy/Game";

class GameManager{

    private games = new Map<ChallengeType, Game>;
    private gameSystem: GameSystem;

    public constructor(gameSystem: GameSystem){
	this.gameSystem = gameSystem;
    }

    public addGame(game: Game, type: ChallengeType){
	this.games.set(type, game);
    }

    public gameInit(challenges: Challenge[]){
	this.games.get(this.gameSystem.getType())!.gameInit(challenges);
    }

    public guessLetter(playerInput: string){
	this.games.get(this.gameSystem.getType())!.guessLetter(playerInput);
    }

}

export default GameManager; 
