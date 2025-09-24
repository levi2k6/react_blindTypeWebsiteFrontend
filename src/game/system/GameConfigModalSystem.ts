import Box from "../../class/Box";
import { createElement } from "../../ui_system/Element";
import GameConfigModal from "../component/GameConfigModal";
import type GameConfigManager from "./game_config/GameConfigManager";

class GameConfigModalSystem{

    gameType: string = "";
    gameConfigManager: GameConfigManager | undefined;
    gameConfigModal: GameConfigModal;

    constructor(gameConfigModal: GameConfigModal){
	this.gameConfigModal = gameConfigModal;
    }

    init(gameConfigManager: GameConfigManager){
	this.gameConfigManager = gameConfigManager;
	this.setDefaultConfig();
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

    setDefaultConfig(){
	const inputDifficulty = this.gameConfigModal.inputDifficulty.self.children[0] as HTMLSelectElement;
	console.log("inputDifficulty: ", inputDifficulty);
	// const currentGameConfig = this.gameConfigManager.getCurrentGameConfig();
	// inputDifficulty.value = currentGameConfig?.difficulty;
	// inputDifficulty.value = currentGameConfig?.multiple; 
	// inputDifficulty.value = currentGameConfig?.continuous;
    }
}
export default GameConfigModalSystem;
