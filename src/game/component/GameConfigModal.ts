import Box from "../../class/Box";
import { createElement } from "../../ui_system/Element";
import GameConfigModalSystem from "../system/game_modal/GameConfigModalSystem";
import GameConfigManager from "../system/game_config/GameConfigManager";

import InputCreator from "../../ui_system/InputCreator";
import type InputElementCreator from "../../ui_system/InputCreator";
import type { GameConfig } from "../../utils/types/GameConfigType";
import Box2 from "../../class/Box2";
import Element from "../../class/Element";
import Select from "../../class/Select";
import SelectComponent from "../../class/Select";
import type Component2 from "../../class/Component2";
import InputComponent from "../../class/InputComponent";

class GameConfigModal extends Box2{

    public gameConfigManager?: GameConfigManager;
    public gameConfigModalSystem?: GameConfigModalSystem;

    constructor(){
	super("gameConfigModal");
    }

    get system(){
	return this.gameConfigModalSystem;
    }

    public initComponent(gameConfigManager: GameConfigManager){
	console.log("GameConfigModal[] initComponent");
	this.gameConfigManager = gameConfigManager;
	this.gameConfigModalSystem = new GameConfigModalSystem();
    }

    private assertInitialized(): asserts this is GameConfigModal & {
	gameConfigManager: GameConfigManager;
    }{
	if(!this.gameConfigManager){
	    throw new Error("GameConfigModal is not initialized");
	}
    }

    override structureElements(): Array<Component2> {
	// this.addChildren([
	//     this.div1.addChild(
	// 	this.divForm.addChildren([
	// 	    this.divLabel.addChildren([
	// 		this.labelDifficulty,
	// 		this.labelMultiple,
	// 		this.labelContinuous
	// 	    ]),
	// 	    this.divInput.addChildren([
	// 		this.inputDifficulty,
	// 		this.inputMultiple,
	// 		this.inputContinuous
	// 	    ])
	// 	])
	//     ),
	//     this.div2.addChild(
	// 	this.divButtons.addChildren([
	// 	    this.apply,
	// 	    this.close
	// 	])
	//     )
	// ])
	

	const div1 = new Box2("div1");
	    const divForm = new Box2("divForm");
		const divLabel = new Box2("divLabel");
		    const divLabel1 = new Box2("divLabel1");
			const labelDifficulty = new Element("label", "labelDifficulty", "Difficulty");
		    const divLabel2 = new Box2("divLabel2");
			const labelMultiple  = new Element("label", "labelMultiple", "Multiple");
		    const divLabel3 = new Box2("divLabel3");
			const labelContinuous = new Element("label", "labelContinuous", "Continuous");

		const divInput = new Box2("divInput"); 
		    const divInput1 = new Box2("divInput1");
			const inputDifficulty = new Select("difficulty", ["easy", "normal", "hard"]);
		    const divInput2 = new Box2("divInput2");
			const inputMultiple = new InputComponent("inputMultiple", "number");
		    const divInput3 = new Box2("divInput3");
			const inputContinuous = new SelectComponent("continuous", ["true", "false"]);

	const div2 = new Box2("div2");
	    const divButtons = new Box2("divButtons");
		const apply = new Element("button", "apply", "apply"); 
		const close = new Element("button", "close", "close");

	return [
	    div1.addChildren([
		divForm.addChildren([
		    divLabel.addChildren([
			divLabel1.addChildren([labelDifficulty]),
			divLabel2.addChildren([labelMultiple]),
			divLabel3.addChildren([labelContinuous])
		    ]),
		    divInput.addChildren([
			divInput1.addChildren([inputDifficulty]),
			divInput2.addChildren([inputMultiple]),
			divInput3.addChildren([inputContinuous])
		    ])
		])
	    ]),
	    div2.addChildren([
		divButtons.addChildren([
		    apply,
		    close
		])
	    ])
	]
    }

    override initSystems(): void{
	console.log("GameConfigModal: initElements");
	console.log("gameConfigManger: ", this.gameConfigManager);
	console.log("gameConfigModalSystem: ", this.gameConfigModalSystem);
	this.assertInitialized();

	this.system?.initSystem(this.gameConfigManager, this);
    }

    override initElements(): void{
	const inputMultiple = this.getChild("div1").getChild("divForm").getChild("divInput").getChild("divInput2").getChildSelf("inputMultiple") as HTMLInputElement; 
	inputMultiple.defaultValue = "3";
	inputMultiple.min = "1"; 
	inputMultiple.max = "10"; 
    }

    override eventElements(): void {
	const div2 = this.getChild("div2");

	div2.getChild("divButtons").addEvent("apply", "click", () => {
	    const divInput = this.getChild("div1").getChild("divInput"); 
	    const divInputDifficulty = divInput.getChildSelf("inputDifficulty") as HTMLSelectElement;
	    const divInputMultiple =  divInput.getChildSelf("divInputMultiple") as HTMLInputElement;
	    const divInputContinuous = divInput.getChildSelf("divInputContinuous") as HTMLInputElement; 

	    const difficutlyData = divInputDifficulty.value as "easy" | "normal" | "hard";
	    const multipleData = Number(divInputMultiple.value);
	    const continuousData = divInputContinuous.value === "true";

	    const newGameConfig: GameConfig = {
		difficulty: difficutlyData,
		multiple: multipleData,
		continuous: continuousData 
	    }
	    // console.log("newGameConfig: ", newGameConfig);
	    this.gameConfigModalSystem?.applyNewConfig(newGameConfig)
	    this.style.display = "none";
	});

	div2.getChild("divButtons").addEvent("close", "click", () => {
	    this.style.display = "none";
	});
    }



    override styleElements(): void {
	this.style.position = "fixed"
	this.style.height = "400px";
	this.style.width = "400px";
	this.style.border = "1px solid green";
	this.style.backgroundColor = "black";
	this.style.display = "flex";
	this.style.flexDirection = "column";
	this.style.justifyContent = "center";
	this.style.alignItems = "center";

	const div1 = this.getChild("div1");
	// this.div1.style.border = "1px solid yellow";
	    div1.style.display = "flex";
	    div1.style.alignItems = "center";
	    div1.style.justifyContent = "center";
	    div1.style.flex = "2";
	    div1.style.width = "100%";


	const divForm = div1.getChild("divForm"); 
	    divForm.style.border = "1px solid black";
	    divForm.style.display = "flex";

	const divLabel = divForm.getChild("divLabel");
	    divLabel.style.border = "1px solid white";
	    divLabel.style.display = "flex";
	    divLabel.style.flexDirection = "column";

	const divInput = divForm.getChild("divInput");
	    divInput.style.border = "1px solid white";
	    divInput.style.width = "100px";
	    divInput.style.display = "flex";
	    divInput.style.flexDirection = "column";


	const div2 = this.getChild("div2");
	    div2.style.border = "1px solid yellow";
	    div2.style.display = "flex";
	    div2.style.alignItems = "center";
	    div2.style.justifyContent = "center";
	    div2.style.flex = "1";
	    div2.style.width = "100%";

	const divButtons = div2.getChild("divButtons");
	    divButtons.style.border = "1px solid red";
    }

}

export default GameConfigModal;

