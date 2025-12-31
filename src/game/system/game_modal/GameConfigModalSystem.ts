import Box from "../../../class/Box";
import { createElement } from "../../../ui_system/Element";
import { ChallengeType } from "../../../utils/enums/ChallengeTypeEnum";
import type { GameConfig } from "../../../utils/types/GameConfigType";
import GameConfigModal from "../../component/GameConfigModal";
import GameConfigManager from "../game_config/GameConfigManager";

class GameConfigModalSystem{

    gameType: string = "";
    gameConfigManager?: GameConfigManager;
    gameConfigModal?: GameConfigModal;


    initSystem(gameConfigManager: GameConfigManager, gameConfigModal: GameConfigModal){
	this.gameConfigManager = gameConfigManager;
	this.gameConfigModal = gameConfigModal;
    }

    private assertInitialized(): asserts this is GameConfigModalSystem & {
	gameConfigManager: GameConfigManager;
	gameConfigModal: GameConfigModal;
    }{
	if(!this.gameConfigManager || !this.gameConfigModal){
	    throw new Error("GameConfigModalSystem is not initialized");
	}
    }


    public setDefaultConfigLetterHandler = () => {
	this.assertInitialized();

	this.gameConfigModal.style.display = "flex";
	this.setDefaultConfig(ChallengeType.LETTER);
    }

    public setDefaultConfigWordHandler = () => {
	this.assertInitialized();

	this.gameConfigModal.style.display = "flex";
	this.setDefaultConfig(ChallengeType.WORD);
    }
    public setDefaultConfigSentenceHandler = () => {
	this.assertInitialized();

	this.gameConfigModal.style.display = "flex";
	this.setDefaultConfig(ChallengeType.SENTENCE);
    }


    private inputDiv(): Box{
	const div = new Box();
	div.style.border = "1px solid red";
	div.style.height = "30px";
	return div;
    }

    createLabel(labelName: string): Box{
	const div = this.inputDiv();
	const label = createElement("label"); 
	label.innerText = labelName;
	div.addChild(label);

	return div;
    }

    createInput(inputType: string): Box{
	const div = this.inputDiv();
	const input = createElement("input") as HTMLInputElement; 
	input.type = inputType;
	div.addChild(input);

	return div;
    }

    createSelect(optionData: Array<string>): Box{
	const div = this.inputDiv();
	const select = createElement("select");
	optionData.forEach(optionDatum => {
	    const optionElement = createElement("option", optionDatum) as HTMLSelectElement; 
	    optionElement.value = optionDatum; 
	    select.appendChild(optionElement);
	})
	div.addChild(select);


	return div;
    }

    applyNewConfig(gameConfig: GameConfig){
	this.gameConfigManager?.setChallengeGameConfig(gameConfig);
    }

    public setDefaultConfig(challengeType: ChallengeType){
	this.assertInitialized();
	
	const divInput = this.gameConfigModal.getChild("div1").getChild("divForm").getChild("divInput");
	console.log("divInput1", divInput.getChild("divInput1"));

	const inputDifficulty = divInput.getChild("divInput1").getChildSelf("inputDifficulty").children[0] as HTMLSelectElement;
	const inputMultiple = divInput.getChild("divInput2").getChildSelf("inputMultiple") as HTMLInputElement;
	const inputContinuous = divInput.getChild("divInput3").getChildSelf("inputContinuous").children[0] as HTMLSelectElement;

	this.gameConfigManager?.setGameConfig(challengeType); 
	console.log("gameconfigmanager: ",this.gameConfigManager?.getCurrentGameConfig());
	const currentGameConfig = this.gameConfigManager?.getCurrentGameConfig();
	if(currentGameConfig == undefined){
	    return;
	}

	inputDifficulty.value = currentGameConfig.difficulty;
	inputMultiple.value = currentGameConfig.multiple.toString();

	let continuousValue: "true" | "false";   
	if(currentGameConfig.continuous){
	    continuousValue = "true";
	}else{
	    continuousValue = "false";
	}
	inputContinuous.value = continuousValue;

	this.gameConfigModal.style.display = "flex";
    }



}
export default GameConfigModalSystem;
