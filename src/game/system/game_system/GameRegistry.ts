import { ChallengeType } from "../../../utils/enums";
import GameRouter from "../../component/GameRouter";
import Timer from "../Timer";
import GameSystem from "./GameSystem";
import Game from "./strategy/Game";
import LetterGame from "./strategy/LetterGame";
import StringGame from "./strategy/StringGame";


class GameRegistry{

    private games = new Map<ChallengeType, Game> 

    public constructor(gameRouter: GameRouter, gameSystem: GameSystem, timer: Timer){

	this.games.set(ChallengeType.LETTER, new LetterGame( gameRouter, gameSystem, timer ));
	this.games.set(ChallengeType.WORD, new StringGame( gameRouter, gameSystem ));
	this.games.set(ChallengeType.SENTENCE, new StringGame( gameRouter, gameSystem ));

    }

    public getGame(type: ChallengeType){
	return this.games.get(type);
    }

}


export default GameRegistry;
