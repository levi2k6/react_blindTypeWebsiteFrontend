import { ChallengeType } from "../../../utils/enums/ChallengeTypeEnum";
import type { GameConfigStrategy } from "./strategy/game_config/GameConfigStrategy";
import LetterGameConfig from "./strategy/game_config/LetterGameConfig";
import SentenceGameConfig from "./strategy/game_config/SentenceGameConfig";
import WordGameConfig from "./strategy/game_config/WordGameConfig";

class GameConfigRegistry{

    private gameConfigs = new Map<ChallengeType, GameConfigStrategy>

    public constructor(){

	this.gameConfigs.set(ChallengeType.LETTER, new LetterGameConfig() );
	this.gameConfigs.set(ChallengeType.WORD, new WordGameConfig() );
	this.gameConfigs.set(ChallengeType.SENTENCE, new SentenceGameConfig() );

    }

    public getGameConfig(type: ChallengeType){
	return this.gameConfigs.get(type);
    }

}


export default GameConfigRegistry;
