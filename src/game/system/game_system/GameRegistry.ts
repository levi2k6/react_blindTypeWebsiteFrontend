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

    public constructor(){

	this.games.set(ChallengeType.LETTER, new LetterGame());
	this.games.set(ChallengeType.WORD, new StringGame());
	this.games.set(ChallengeType.SENTENCE, new StringGame());

    }

    public getGame(type: ChallengeType){
	return this.games.get(type);
    }

}


export default GameRegistry;
