import { ChallengeType } from "../../../utils/enums";
import type { GameConfigStrategy } from "../game_config/strategy/GameConfigStrategy";
import LetterGameConfig from "../game_config/strategy/LetterGameConfig";
import SentenceGameConfig from "../game_config/strategy/SentenceGameConfig";
import WordGameConfig from "../game_config/strategy/WordGameConfig";

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
