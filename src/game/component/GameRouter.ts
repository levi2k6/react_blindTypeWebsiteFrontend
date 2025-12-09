import GameRouterSystem from "../system/component_system/GameRouterSystem.ts";
import TextAudio from "./TextAudio.ts";
import GameConfigModal from "./GameConfigModal.ts";
import GameConfigManager from "../system/game_config/GameConfigManager.ts";
import { ChallengeType } from "../../utils/enums/ChallengeTypeEnum.ts";
import Component2 from "../../class/Component2.ts";
import Box2 from "../../class/Box2.ts";
import Element from "../../class/Element.ts";
import Visualizer from "./Visualizer.ts";

class GameRouter extends Box2{
    private gameConfigManager: GameConfigManager = new GameConfigManager(); 

    private gameConfigModal: GameConfigModal = new GameConfigModal(this.gameConfigManager);
    private gameRouterSystem: GameRouterSystem = new GameRouterSystem(this, this.gameConfigManager);


    // public testButton = createElement("button", "DESTROY");

    constructor( name: string ){
	super(name);
    }

    get system(){
	return this.gameRouterSystem;
    }

    override structureElements(): Array<Component2> {
	console.log("structureElements() GameRouter");

	const textAudio = new TextAudio("GameTextAudio"); 
	// const divGradient = new Box2("divGradient");
	console.log("textAudio: ", textAudio);
	const visualizer: Visualizer = new Visualizer(textAudio);
	const div1: Box2 = new Box2("div1");
	    const startButton: Element = new Element("button", "startButton", "Start"); 
	    const div2: Box2 = new Box2("div2");
		const divLetter: Box2 = new Box2("divLetter");
		    const letterSettings: Element = new Element("button", "letterSettings");
			const letterSettingsIcon: Element = new Element("i", "letterSettingsIcon"); 
		    const letterButton: Element = new Element("button", "letterButton", "letterButton");
		const divWord: Box2 = new Box2("divWord");
		    const wordSettings: Element = new Element("button", "wordSettings");
			const wordSettingsIcon: Element = new Element("i", "wordSettingsIcon");
		    const wordButton: Element = new Element("button", "Word", "wordButton");
		const divSentence: Box2 = new Box2("divSentence");
		    const sentenceSettings: Element = new Element("button", "sentenceSettings");
			const sentenceSettingsIcon: Element = new Element("i", "sentenceSettingsIcon");
		    const sentenceButton: Element = new Element("button", "Sentence", "sentenceButton");


	return [
	    textAudio,

	    div1.addChildren([
		startButton,
		div2.addChildren([
		    divLetter.addChildren([
			letterSettings.addChildren([letterSettingsIcon]),
			letterButton
		    ]),
		    divWord.addChildren([
			wordSettings.addChildren([wordSettingsIcon]),
			wordButton
		    ]),
		    divSentence.addChildren([
			sentenceSettings.addChildren([sentenceSettingsIcon]),
			sentenceButton
		    ]),
		]),
	    ]),
	    new Box2("boxxy2", "testin westing")
	]

	// const textAudio = new TextAudio("GameTextAudio"); 
	// const visualizer: Visualizer = new Visualizer(textAudio.getChildSelf("audio") as HTMLAudioElement);
	// const divGradient = new Box2("divGradient");
	// const textHolder = new TextHolder("TextHolder");
	//
	// const div1: Box2 = new Box2("div1");
	//     const startButton: Element = new Element("button", "Start"); 
	//     const div2: Box2 = new Box2("div2");
	// 	const divLetter: Box2 = new Box2("divLetter");
	// 	    const letterSettings: Element = new Element("button", "letterSettings");
	// 		const letterSettingsIcon: Element = new Element("i", "letterSettingsIcon"); 
	// 	    const letterButton: Element = new Element("button", "letterButton");
	// 	const divWord: Box2 = new Box2("divWord");
	// 	    const wordSettings: Element = new Element("button", "wordSettings");
	// 		const wordSettingsIcon: Element = new Element("i", "wordSettingsIcon");
	// 	    const wordButton: Element = new Element("button", "Word");
	// 	const divSentence: Box2 = new Box2("divSentence");
	// 	    const sentenceSettings: Element = new Element("button", "sentenceSettings");
	// 		const sentenceSettingsIcon: Element = new Element("i", "sentenceSettingsIcon");
	// 	    const sentenceButton: Element = new Element("button", "Sentence");
	//
	// return [
	//     visualizer,
	//     divGradient,
	//     textHolder,
	//     div1.addChildren([
	// 	startButton,
	// 	div2.addChildren([
	// 	    divLetter.addChildren([
	// 		letterSettings.addChildren([
	// 		    letterSettingsIcon
	// 		]),
	// 		letterButton
	// 	    ]),
	// 	    divWord.addChildren([
	// 		wordSettings.addChildren([
	// 		    wordSettings.addChildren([
	// 			wordSettingsIcon
	// 		    ])
	// 		]),
	// 		wordButton
	// 	    ]),
	// 	    divSentence.addChildren([
	// 		sentenceSettings.addChildren([
	// 		    sentenceSettingsIcon
	// 		]),
	// 		sentenceButton
	// 	    ])
	// 	])
	//     ])
	// ]

    }

    override async initElements(){
	// const textAudio = this.getChild("textAudio") as TextAudio;
	// textAudio.setGameSystem(this.gameRouterSystem.getGameSystem());
	//
	// this.gameConfigModal.style.display = "none";
	//
	
	const div2 = this.getChild("div1").getChild("div2");
	div2.getChild("divLetter").getChild("letterSettings").getChildSelf("letterSettingsIcon").classList.add("fa-solid", "fa-gear");
	div2.getChild("divWord").getChild("wordSettings").getChildSelf("wordSettingsIcon").classList.add("fa-solid", "fa-gear");
	div2.getChild("divSentence").getChild("sentenceSettings").getChildSelf("sentenceSettingsIcon").classList.add("fa-solid", "fa-gear");

	// const startButton = this.getChild("startButton").self as HTMLButtonElement;
	// startButton.disabled = true;
    }


     override eventElements(){
	// this.addEvent("startButton", "click", () => this.gameRouterSystem.startGame());
	//
	// this.addEvent("letterButton", "click", () => this.gameRouterSystem.setGameType(ChallengeType.LETTER))
	//
	// this.addEvent("wordButton", "click", () => this.gameRouterSystem.setGameType(ChallengeType.WORD));
	//
	// this.addEvent("sentenceButton", "click", () => this.gameRouterSystem.setGameType(ChallengeType.SENTENCE));
	//
	// this.addEvent("letterSettings", "click", () => this.gameConfigModal.system.setDefaultConfig(ChallengeType.LETTER) );
	//
	// this.addEvent("wordSettings", "click", () => this.gameConfigModal.system.setDefaultConfig(ChallengeType.WORD));
	//
	// this.addEvent("letterSettings", "click", () => this.gameConfigModal.system.setDefaultConfig(ChallengeType.SENTENCE));
    }

    
    override styleElements(): void{

	// if ((CSS as any).registerProperty) {
	//     (CSS as any).registerProperty({
	// 	name: "--upGradient",
	// 	syntax: "<percentage>",
	// 	inherits: false,
	// 	initialValue: "0%"
	//     });
	//      (CSS as any).registerProperty({
	// 	name: "--downGradient",
	// 	syntax: "<percentage>",
	// 	inherits: false,
	// 	initialValue: "100%"
	//     });
	// }
	//
	//
	this.style.position = "relative";
	// this.style.border = "5px solid pink"
	this.style.width =  "100%";
	this.style.height = "100%";
	this.style.display = "flex"; 
	this.style.gap = "20px";
	this.style.flexDirection = "column";
	this.style.justifyContent = "center";
	this.style.alignItems = "center";
	//
	//
	// const divGradient = this.getChild("divGradient");
	//
	// this.getChild("divGradient").style.position = "absolute"; 
	// // this.divGradient.style.border = "3px solid red";
	// divGradient.style.zIndex = "-1";
	// divGradient.style.height = "100%";
	// divGradient.style.width = "100%";
	// divGradient.style.transition = "height 1s ease-in-out, width 1s ease-in-out, --upGradient 1s ease-in-out, --downGradient 1s ease-in-out";
	// divGradient.style.background = `
	//        linear-gradient(
	//            to bottom,
	//            #121212 0%,
	//            transparent var(--upGradient),
	//            transparent var(--downGradient),
	//            #121212 100%
	//        )
	// `;
	// this.div1.style.height = "100px";
	
	const div1 = this.styleChild("div1");
	div1.marginTop = "50px";
	div1.width = "500px";
	div1.border = "1px solid white";
	div1.display = "flex";
	div1.flexDirection = "column";
	div1.justifyContent = "center";
	div1.alignItems = "center";
	div1.gap = "10px";
		
	const div2 = this.getChild("div1").styleChild("div2");
	div2.display = "flex";
	div2.gap = "4px";

    }
    
}

export default GameRouter;
