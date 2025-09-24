import type { Component } from "../../class/Component";
import Box from "../../class/Box";
import { createElement } from "../../ui_system/Element";
import GameConfigModalSystem from "../system/GameConfigModalSystem";
import GameConfigManager from "../system/game_config/GameConfigManager";

class GameConfigModal extends Box implements Component{

    gameConfigManager: GameConfigManager = new GameConfigManager();
    gameConfigModalSystem: GameConfigModalSystem = new GameConfigModalSystem(this);

    divForm = new Box();

    div1 = new Box();
	divLabel = new Box();
	    labelDifficulty = this.gameConfigModalSystem.createLabel("Difficulty");
	    labelMultiple  = this.gameConfigModalSystem.createLabel("Multiple");
	    labelContinuous = this.gameConfigModalSystem.createLabel("Continuous");

	divInput = new Box(); 
	    inputDifficulty = this.gameConfigModalSystem.createSelect(["easy", "normal", "hard"]);
	    inputMultiple = this.gameConfigModalSystem.createInput("number");
	    inputContinuous = this.gameConfigModalSystem.createSelect(["true", "false"]);

    div2 = new Box();
	divButtons = new Box();
	    apply = createElement("button", "apply"); 
	    close = createElement("button", "close");

    constructor(gameConfigManager: GameConfigManager){
	super();
	console.log("HEEEERERERERER: ", gameConfigManager);
	this.gameConfigManager = gameConfigManager; 
	this.gameConfigModalSystem.init(gameConfigManager);
	this.init();
    }

    setGameConfig(gameConfig: string){
	// this.gameConfigManager.setGameConfig(gameConfig)
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
	// const inputDifficulty = this.inputDifficulty.self.children[0] as HTMLSelectElement;
	// console.log("currentGameConfig: ", this.gameConfigManager );
	// // inputDifficulty.value = this.gameConfigManager.getCurrentGameConfig.difficulty;
    }

    eventElements(): void {
	this.close.addEventListener("click", ()=>{
	    this.style.display = "none";
	});
    }

    styleElements(): void {
	this.style.position = "fixed"
	this.style.height = "400px";
	this.style.width = "400px";
	this.style.border = "1px solid green";
	this.style.backgroundColor = "green";
	this.style.display = "flex";
	this.style.flexDirection = "column";
	this.style.justifyContent = "center";
	this.style.alignItems = "center";

	this.div1.style.border = "1px solid yellow";
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

