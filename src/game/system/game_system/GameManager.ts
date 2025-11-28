import { ChallengeType } from "../../../utils/enums/ChallengeTypeEnum";
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

    public gameInit(){
	this.games.get(this.gameSystem.getType())!.gameInit();
    }

    public guessLetter(playerInput: string){
	this.games.get(this.gameSystem.getType())!.guessLetter(playerInput);
    }

}

export default GameManager; 
