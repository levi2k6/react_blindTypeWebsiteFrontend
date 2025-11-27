import { ChallengeType } from "../../../utils/enums/ChallengeTypeEnum";
import GameRouter from "../../component/GameRouter";
import type GameConfigManager from "../game_config/GameConfigManager";
import Timer from "../Timer";
import GameSystem from "./GameSystem";
import Game from "./strategy/Game";
import LetterGame from "./strategy/LetterGame";
import StringGame from "./strategy/StringGame";


class GameRegistry{

    private games = new Map<ChallengeType, Game> 

    public constructor(gameRouter: GameRouter, gameSystem: GameSystem, gameConfigManager: GameConfigManager ,timer: Timer){

	this.games.set(ChallengeType.LETTER, new LetterGame( gameRouter, gameSystem, gameConfigManager, timer ));
	this.games.set(ChallengeType.WORD, new StringGame( gameRouter, gameSystem, gameConfigManager));
	this.games.set(ChallengeType.SENTENCE, new StringGame( gameRouter, gameSystem, gameConfigManager));

    }

    public getGame(type: ChallengeType){
	return this.games.get(type);
    }

}


export default GameRegistry;
