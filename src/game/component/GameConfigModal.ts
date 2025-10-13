import type { Component } from "../../class/Component";
import Box from "../../class/Box";
import { createElement } from "../../ui_system/Element";
import GameConfigModalSystem from "../system/game_modal/GameConfigModalSystem";
import GameConfigManager from "../system/game_config/GameConfigManager";

    import InputCreator from "../../ui_system/InputCreator";
import type InputElementCreator from "../../ui_system/InputCreator";
import type { GameConfig } from "../../utils/types";

class GameConfigModal extends Box implements Component{

    gameConfigManager: GameConfigManager | undefined;
    gameConfigModalSystem: GameConfigModalSystem | undefined;
    inputElementCreator: InputElementCreator = new InputCreator().setDivBorder("1px solid blue").setDivHeight("30px").setDivWidth("100%");

    divForm = new Box();

    div1 = new Box();
	divLabel = new Box();
	    labelDifficulty = this.inputElementCreator.createLabel("Difficulty");
	    labelMultiple  = this.inputElementCreator.createLabel("Multiple");
	    labelContinuous = this.inputElementCreator.createLabel("Continuous");

	divInput = new Box(); 
	    inputDifficulty = this.inputElementCreator.createSelect(["easy", "normal", "hard"]);
		inputDifficultyChild = this.inputDifficulty.self.children[0] as HTMLSelectElement;
	    inputMultiple = this.inputElementCreator.createInput("number");
		inputMultipleChild = this.inputMultiple.self.children[0] as HTMLInputElement;
	    inputContinuous = this.inputElementCreator.createSelect(["true", "false"]);
		inputContinuousChild = this.inputContinuous.self.children[0] as HTMLSelectElement;

    div2 = new Box();
	divButtons = new Box();
	    apply = createElement("button", "apply"); 
	    close = createElement("button", "close");

    constructor(gameConfigManager: GameConfigManager){
	super();
	console.log("HEEEERERERERER: ", gameConfigManager);
	this.gameConfigManager = gameConfigManager; 
	this.gameConfigModalSystem = new GameConfigModalSystem(this, this.gameConfigManager);
	this.init();
    }



    init(){
	this.initElements();
	this.connectElements();
	this.eventElements();
	this.styleElements();
    }

    connectElements(): void {
	this.addChildren([
	    this.div1.addChild(
		this.divForm.addChildren([
		    this.divLabel.addChildren([
			this.labelDifficulty,
			this.labelMultiple,
			this.labelContinuous
		    ]),
		    this.divInput.addChildren([
			this.inputDifficulty,
			this.inputMultiple,
			this.inputContinuous
		    ])
		])
	    ),
	    this.div2.addChild(
		this.divButtons.addChildren([
		    this.apply,
		    this.close
		])
	    )
	])

    }

    initElements(): void{
	this.inputMultipleChild.min = "1"; 
	this.inputMultipleChild.max = "10"; 
    }

    eventElements(): void {
	this.apply.addEventListener("click", ()=>{
	    const difficutlyData = this.inputDifficultyChild.value as "easy" | "normal" | "hard";
	    const multipleData = Number(this.inputMultipleChild.value);
	    const continuousData = this.inputContinuousChild.value === "true";

	    const newGameConfig: GameConfig = {
		difficulty: difficutlyData,
		multiple: multipleData,
		continuous: continuousData 
	    }
	    // console.log("newGameConfig: ", newGameConfig);
	    this.gameConfigModalSystem?.applyNewConfig(newGameConfig)
	    this.style.display = "none";
	});
	this.close.addEventListener("click", ()=>{
	    this.style.display = "none";
	});
    }

    styleElements(): void {
	this.style.position = "fixed"
	this.style.height = "400px";
	this.style.width = "400px";
	// this.style.border = "1px solid green";
	this.style.backgroundColor = "black";
	this.style.display = "flex";
	this.style.flexDirection = "column";
	this.style.justifyContent = "center";
	this.style.alignItems = "center";

	// this.div1.style.border = "1px solid yellow";
	this.div1.style.display = "flex";
	this.div1.style.alignItems = "center";
	this.div1.style.justifyContent = "center";
	this.div1.style.flex = "2";
	this.div1.style.width = "100%";

	    this.divForm.style.border = "1px solid black";
	    this.divForm.style.display = "flex";

		this.divLabel.style.border = "1px solid white";
		this.divLabel.style.display = "flex";
		this.divLabel.style.flexDirection = "column";

		this.divInput.style.border = "1px solid white";
		this.divInput.style.width = "100px";
		this.divInput.style.display = "flex";
		this.divInput.style.flexDirection = "column";

		this.inputDifficultyChild.style.width = "10vh";
		this.inputMultipleChild.style.width = "10vh";
		this.inputContinuousChild.style.width = "10vh";
	
	this.div2.style.border = "1px solid yellow";
	this.div2.style.display = "flex";
	this.div2.style.alignItems = "center";
	this.div2.style.justifyContent = "center";
	this.div2.style.flex = "1";
	this.div2.style.width = "100%";

	this.divButtons.style.border = "1px solid red";

    }

}

export default GameConfigModal;

