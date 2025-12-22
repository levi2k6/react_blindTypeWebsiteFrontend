import GameRouterSystem from "../system/component_system/GameRouterSystem.ts";
import TextAudio from "./TextAudio.ts";
import GameConfigModal from "./GameConfigModal.ts";
import GameConfigManager from "../system/game_config/GameConfigManager.ts";
import { ChallengeType } from "../../utils/enums/ChallengeTypeEnum.ts";
import Component2 from "../../class/Component2.ts";
import Box2 from "../../class/Box2.ts";
import Element from "../../class/Element.ts";
import Visualizer from "./Visualizer.ts";
import GameSystem from "../system/game_system/GameSystem.ts";
import Input from "../system/Input.ts";
import TextHolder from "./TextHolder.ts";
import type LifeCycleSystem from "../../systems/LifeCycleSystem.ts";

class GameRouter extends Box2{

    private lifCycleSystem: LifeCycleSystem;
    private gameConfigManager: GameConfigManager; 
    private gameSystem: GameSystem;
    private input: Input;
    private gameRouterSystem: GameRouterSystem; 

    // public testButton = createElement("button", "DESTROY");

    constructor(name: string, lifeCycleSystem: LifeCycleSystem){
	super(name);
	this.lifCycleSystem = lifeCycleSystem;
	this.gameConfigManager = new GameConfigManager(); 
	this.gameSystem = new GameSystem(this, this.gameConfigManager);
	this.input = new Input(this, this.gameSystem);
	this.gameRouterSystem = new GameRouterSystem(this, this.gameSystem, this.gameConfigManager, this.input);

	this.initCssRegistry();
    }

    private initCssRegistry(){
	if ((CSS as any).registerProperty) {
	    (CSS as any).registerProperty({
		name: "--upGradient",
		syntax: "<percentage>",
		inherits: false,
		initialValue: "0%"
	    });
	     (CSS as any).registerProperty({
		name: "--downGradient",
		syntax: "<percentage>",
		inherits: false,
		initialValue: "100%"
	    });
	}
    }

    get system(){
	return this.gameRouterSystem;
    }

    override structureElements(): Array<Component2> {
	console.log("structureElements() GameRouter");

	const gameConfigModal = new GameConfigModal();

	const textAudio = new TextAudio(); 
	const divGradient = new Box2("divGradient");
	const visualizer: Visualizer = new Visualizer();
	const textHolder: TextHolder = new TextHolder();
	const div1: Box2 = new Box2("div1");
	    const startButton: Element = new Element("button", "startButton", "Start"); 
	    const divSettings: Box2 = new Box2("divSettings");
		const divLetter: Box2 = new Box2("divLetter");
		    const letterSettings: Element = new Element("button", "letterSettings");
			const letterSettingsIcon: Element = new Element("i", "letterSettingsIcon"); 
		    const letterButton: Element = new Element("button", "letterButton", "letterButton");
		const divWord: Box2 = new Box2("divWord");
		    const wordSettings: Element = new Element("button", "wordSettings");
			const wordSettingsIcon: Element = new Element("i", "wordSettingsIcon");
		    const wordButton: Element = new Element("button", "wordButton", "wordButton");
		const divSentence: Box2 = new Box2("divSentence");
		    const sentenceSettings: Element = new Element("button", "sentenceSettings");
			const sentenceSettingsIcon: Element = new Element("i", "sentenceSettingsIcon");
		    const sentenceButton: Element = new Element("button", "sentenceButton", "sentenceButton");


	return [
	    gameConfigModal,
	    textAudio,
	    visualizer,
	    divGradient,
	    textHolder,
	    div1.addChildren([
		startButton,
		divSettings.addChildren([
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
	    new Element("button", "testButton", "text click")
	]

	// const textAudio = new TextAudio("GameTextAudio"); 
	// const visualizer: Visualizer = new Visualizer(textAudio.getChildSelf("audio") as HTMLAudioElement);
	// const divGradient = new Box2("divGradient");
	// const textHolder = new TextHolder("TextHolder");
	//
	// const div1: Box2 = new Box2("div1");
	//     const startButton: Element = new Element("button", "Start"); 
	//     const divSettings: Box2 = new Box2("div2");
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
	// 	divSettings.addChildren([
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

    override initSystems(): void {
	console.log("GameRouter initSystems")
	this.gameSystem.initSystem();

	const gameConfigModal = this.getChild("gameConfigModal") as GameConfigModal;
	gameConfigModal.initComponent(this.gameConfigManager);

	const textAudio = this.getChild("textAudio") as TextAudio;
	textAudio.initComponent(this.gameSystem);

	const visualizer = this.getChild("visualizer") as Visualizer; 
	const audio = textAudio.getChildSelf("audio") as HTMLAudioElement;
	visualizer.initComponent(audio);

	const textHolder = this.getChild("textHolder") as TextHolder;
	textHolder.initcomponent(this.lifCycleSystem);
    } 

    override async initElements(){
	this.styleChild("gameConfigModal").display = "none";

	const divSettings = this.getChild("div1").getChild("divSettings");
	divSettings.getChild("divLetter").getChild("letterSettings").getChildSelf("letterSettingsIcon").classList.add("fa-solid", "fa-gear");
	divSettings.getChild("divWord").getChild("wordSettings").getChildSelf("wordSettingsIcon").classList.add("fa-solid", "fa-gear");
	divSettings.getChild("divSentence").getChild("sentenceSettings").getChildSelf("sentenceSettingsIcon").classList.add("fa-solid", "fa-gear");

	const startButton = this.getChild("div1").getChild("startButton").self as HTMLButtonElement;
	startButton.disabled = true;
    }


     override eventElements(){
	this.getChild("div1").addEvent("startButton", "click", () => {
	    this.gameRouterSystem?.startGame()
	    this.input.turnOnInput();
	});

	const divSettings = this.getChild("div1").getChild("divSettings");
	divSettings.getChild("divLetter").addEvent("letterButton", "click", () => this.gameRouterSystem?.setGameType(ChallengeType.LETTER))
	divSettings.getChild("divWord").addEvent("wordButton", "click", () => this.gameRouterSystem?.setGameType(ChallengeType.WORD));
	divSettings.getChild("divSentence").addEvent("sentenceButton", "click", () => this.gameRouterSystem?.setGameType(ChallengeType.SENTENCE));

	const gameConfigModal = this.getChild("gameConfigModal") as GameConfigModal;

	divSettings.getChild("divLetter").addEvent("letterSettings", "click", () => gameConfigModal.system?.setDefaultConfig(ChallengeType.LETTER) );
	divSettings.getChild("divWord").addEvent("wordSettings", "click", () => gameConfigModal.system?.setDefaultConfig(ChallengeType.WORD));
	divSettings.getChild("divSentence").addEvent("sentenceSettings", "click", () => gameConfigModal.system?.setDefaultConfig(ChallengeType.SENTENCE));

	this.addEvent("testButton", "click", () => this.getChild("textHolder").deleteChildren);
    }

    
    override styleElements(): void{


	this.style.position = "relative";
	// this.style.border = "5px solid pink"
	this.style.width =  "100%";
	this.style.height = "100%";
	this.style.display = "flex"; 
	this.style.gap = "20px";
	this.style.flexDirection = "column";
	this.style.justifyContent = "center";
	this.style.alignItems = "center";

	const divGradient = this.getChild("divGradient");

	divGradient.style.position = "absolute"; 
	// divGradient.style.border = "3px solid red";
	divGradient.style.zIndex = "0";
	divGradient.style.pointerEvents = "none";
	divGradient.style.height = "100%";
	divGradient.style.width = "100%";
	divGradient.style.transition = "height 1s ease-in-out, width 1s ease-in-out, --upGradient 1s ease-in-out, --downGradient 1s ease-in-out";
	divGradient.style.background = `
	       linear-gradient(
	           to bottom,
	           #121212 0%,
	           transparent var(--upGradient),
	           transparent var(--downGradient),
	           #121212 100%
	       )
	`;

	const div1 = this.getChild("div1");

	div1.style.height = "20vh";
	div1.style.marginTop = "50px";
	div1.style.width = "500px";
	div1.style.border = "1px solid white";
	div1.style.display = "flex";
	div1.style.flexDirection = "column";
	div1.style.justifyContent = "center";
	div1.style.alignItems = "center";
	div1.style.gap = "10px";
		

	const divSettings = this.getChild("div1").styleChild("divSettings");
	divSettings.display = "flex";
	divSettings.gap = "4px";

    }
    
}

export default GameRouter;
