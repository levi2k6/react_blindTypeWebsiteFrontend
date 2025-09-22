import type { Component } from "../../class/Component";
import Box from "../../class/Box";
import { createElement } from "../../ui_system/Element";

class GameConfigModal extends Box implements Component{

    divForm = new Box();

    divLabel = new Box();
	labelDifficulty = createElement("label", "Difficulty: ");
	labelMultiple  = createElement("label", "Multiple: ");
	labelContinuous = createElement("label", "Continuous: ");

    divInput = new Box(); 
	divDifficulty = new Box();
	    inputDifficulty: HTMLElement = createElement("select");
		optionEasy = createElement("option", "Easy"); 
		optionNormal = createElement("option", "Normal");
		optionHard = createElement("option", "Hard");
	divMultiple = new Box();
	    inputMultiple = createElement("input");
	divContinuous = new Box();
	    inputContinuous = createElement("select");
		optionTrue = createElement("option", "True");
		optionFalse = createElement("option", "False");

    divButtons = new Box();
	apply = createElement("button", "apply"); 
	close = createElement("button", "close");

    constructor(){
	super();
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
	    this.divForm.addChildren([
		this.divLabel.addChildren([
		    this.labelDifficulty,
		    this.labelMultiple,
		    this.labelContinuous
		]),
		this.divInput.addChildren([
		    this.divDifficulty.addChild(this.inputDifficulty),
		    this.divMultiple.addChild(this.inputMultiple),
		    this.divContinuous.addChild(this.inputContinuous)
		])
	    ]),
	    this.divButtons.addChildren([
		this.apply,
		this.close
	    ])
	])

	this.inputDifficulty.appendChild(this.optionEasy);
	this.inputDifficulty.appendChild(this.optionNormal);
	this.inputDifficulty.appendChild(this.optionHard);

	this.inputContinuous.appendChild(this.optionTrue);
	this.inputContinuous.appendChild(this.optionFalse);

    }

    initElements(): void{

	const optionEasy = this.optionEasy as HTMLOptionElement;
	optionEasy.value = "easy";
	const optionNormal = this.optionHard as HTMLOptionElement;
	optionNormal.value = "normal";
	const optionHard = this.optionHard as HTMLOptionElement;
	optionHard.value = "hard";

	const inputMultiple = this.inputMultiple as HTMLInputElement;
	inputMultiple.type = "number";
	inputMultiple.value = "1";
	inputMultiple.min = "1";
	inputMultiple.max = "10";

	const optionTrue = this.optionTrue as HTMLOptionElement;
	optionTrue.value = "true";
	const optionFalse = this.optionFalse  as HTMLOptionElement;
	optionFalse.value = "false";

    }

    eventElements(): void {
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

	this.divForm.style.border = "1px solid black";
	this.divForm.style.display = "flex";
	this.divForm.style.gap = "1vh";

	this.divLabel.style.border = "1px solid white";
	this.divLabel.style.display = "flex";
	this.divLabel.style.flexDirection = "column";
	this.divLabel.style.fontSize = "25px";

	this.divInput.style.border = "1px solid white";
	this.divInput.style.width = "100px";
	this.divInput.style.display = "flex";
	this.divInput.style.flexDirection = "column";

	this.divDifficulty.style.border = "1px solid red";
	this.divDifficulty.style.height = "30px";
	this.divDifficulty.style.display = "flex";
	this.divDifficulty.style.justifyContent = "center";
	this.divDifficulty.style.alignItems = "center";
	this.divDifficulty.style.flex = "1";
	    this.inputDifficulty.style.fontSize = "20px";
	    this.inputDifficulty.style.width = "100%";

	this.divMultiple.style.border = "1px solid red";
	this.divMultiple.style.display = "flex";
	this.divMultiple.style.alignItems = "center";
	this.divMultiple.style.justifyContent = "center";

	this.divMultiple.style.flex = "1";
	    this.inputMultiple.style.fontSize = "20px";
	    this.inputMultiple.style.width = "100%";

	this.divContinuous.style.borderColor = "1px solid red";
	this.divContinuous.style.display = "flex";
	this.divContinuous.style.alignItems = "center";
	this.divContinuous.style.justifyContent = "center";
	this.divContinuous.style.flex = "1";
	    this.inputContinuous.style.fontSize = "20px";
	    this.inputContinuous.style.width = "100%";

    }

}

export default GameConfigModal;

