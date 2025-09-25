import Box from "../../../class/Box";
import { createElement } from "../../../ui_system/Element";
import { ChallengeType } from "../../../utils/enums";
import type { GameConfig } from "../../../utils/types";
import GameConfigModal from "../../component/GameConfigModal";
import GameRouter from "../../component/GameRouter";
import GameConfigManager from "../game_config/GameConfigManager";

class GameConfigModalSystem{

    gameType: string = "";
    gameConfigManager: GameConfigManager | undefined;
    gameConfigModal: GameConfigModal;

    constructor(gameConfigModal: GameConfigModal, gameConfigManager: GameConfigManager){
	this.gameConfigModal = gameConfigModal;
	this.gameConfigManager = gameConfigManager;
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

    setDefaultConfig(challengeType: ChallengeType){
	const inputDifficulty = this.gameConfigModal.inputDifficulty.self.children[0] as HTMLSelectElement;
	const inputMultiple = this.gameConfigModal.inputMultiple.self.children[0] as HTMLInputElement;
	const inputContinuous = this.gameConfigModal.inputContinuous.self.children[0] as HTMLSelectElement;
	console.log("one: ", inputDifficulty);
	console.log("two: ", inputMultiple);
	console.log("one: ", inputContinuous);

	this.gameConfigManager?.setGameConfig(challengeType); 
	console.log("gameconfigmanager: ",this.gameConfigManager?.getCurrentGameConfig());
	inputDifficulty.value = this.gameConfigManager?.getCurrentGameConfig().difficulty;
	inputMultiple.value = this.gameConfigManager?.getCurrentGameConfig().multiple;
	inputContinuous.value = this.gameConfigManager?.getCurrentGameConfig().continuous;
    }

}
export default GameConfigModalSystem;
