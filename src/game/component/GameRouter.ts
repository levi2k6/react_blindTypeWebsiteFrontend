import { createElement } from "../../ui_system/Element.ts";

import Box from "../../class/Box.ts";

import GameRouterSystem from "../system/component_system/GameRouterSystem.ts";
import TextHolder from "./TextHolder.ts";
import TextAudio from "./TextAudio.ts";
import GameConfigModal from "./GameConfigModal.ts";
import GameConfigManager from "../system/game_config/GameConfigManager.ts";
import Visualizer from "./Visualizer.ts";
import { ChallengeType } from "../../utils/enums/ChallengeTypeEnum.ts";

class GameRouter extends Box{

    public divGradient = new Box("divGradient");
    public textHolder = new TextHolder("TextHolder");

    public div1: Box = new Box("div1");
	public startButton: HTMLButtonElement = createElement("button", "Start") as HTMLButtonElement; 
	public div2: Box = new Box("div2");
	    public divLetter: Box = new Box();
		public letterSettings: HTMLButtonElement = createElement("button") as HTMLButtonElement;
		    public letterSettingsIcon: HTMLElement = createElement("i"); 
		public letterButton: HTMLButtonElement = createElement("button", "Letter") as HTMLButtonElement;
	    public divWord: Box = new Box();
		public wordSettings: HTMLButtonElement = createElement("button") as HTMLButtonElement;
		    public wordSettingsIcon: HTMLElement = createElement("i");
		public wordButton: HTMLButtonElement = createElement("button", "Word") as HTMLButtonElement;
	    public divSentence: Box = new Box();
		public sentenceSettings: HTMLButtonElement = createElement("button") as HTMLButtonElement;
		    public sentenceSettingsIcon: HTMLElement = createElement("i");
		public sentenceButton: HTMLButtonElement = createElement("button", "Sentence") as HTMLButtonElement;

    public textAudio = new TextAudio("GameTextAudio"); 
    public visualizer: Visualizer = new Visualizer(this.textAudio.audio);

    private gameConfigManager: GameConfigManager = new GameConfigManager(); 

    private gameConfigModal: GameConfigModal = new GameConfigModal(this.gameConfigManager);
    private gameRouterSystem: GameRouterSystem = new GameRouterSystem(this, this.gameConfigManager, this.visualizer);


    public testButton = createElement("button", "DESTROY");

    constructor( name: string ){
	super(name);
	this.init();
    }

    get system(){
	return this.gameRouterSystem;
    }

    override initChildrenEvents(): void {
	this.gameRouterSystem.getInput().turnOnInput();
    }

    override preDestroy(){
	this.gameRouterSystem.getInput().turnOffInput();
    }

    override async initElements(){

	this.textAudio.setGameSystem(this.gameRouterSystem.getGameSystem());

	this.gameConfigModal.style.display = "none";

	this.letterSettingsIcon.classList.add("fa-solid", "fa-gear");
	this.wordSettingsIcon.classList.add("fa-solid", "fa-gear");
	this.sentenceSettingsIcon.classList.add("fa-solid", "fa-gear");
	console.log("letterSettings: ", this.letterSettings);

    }

    connectElements(){
	 this.addChildren([
	     this.visualizer,
	     this.divGradient,
	     this.textHolder,
	     this.div1.addChildren([
		 this.startButton,
		 this.div2.addChildren([
		     this.divLetter.addChildren([
			 this.letterSettings,
			 this.letterButton,
		     ]),
		     this.divWord.addChildren([
			 this.wordSettings,
			 this.wordButton,
		     ]),
		     this.divSentence.addChildren([
			 this.sentenceSettings,
			 this.sentenceButton
		     ])
		 ]),
	     ]),
	     this?.textAudio,
	     this.gameConfigModal,
	     this.testButton
	 ]);

	 this.letterSettings.appendChild(this.letterSettingsIcon);
	 this.wordSettings.appendChild(this.wordSettingsIcon);
	 this.sentenceSettings.appendChild(this.sentenceSettingsIcon);
     }

     override eventElements(){
	this.startButton.addEventListener("click", () => this.gameRouterSystem.startGame(), {signal: this.abortController?.signal});

	this.letterButton.addEventListener("click", () => this.gameRouterSystem.setGameType(ChallengeType.LETTER), {signal: this.abortController?.signal});
	this.wordButton.addEventListener("click", () => this.gameRouterSystem.setGameType(ChallengeType.WORD), {signal: this.abortController?.signal});
	this.sentenceButton.addEventListener("click", () => this.gameRouterSystem.setGameType(ChallengeType.SENTENCE), {signal: this.abortController?.signal});

	this.letterSettings.addEventListener("click", () => this.gameConfigModal.gameConfigModalSystem.setDefaultConfig(ChallengeType.LETTER), {signal: this.abortController?.signal});
	this.wordSettings.addEventListener("click", () => this.gameConfigModal.gameConfigModalSystem.setDefaultConfig(ChallengeType.WORD), {signal: this.abortController?.signal});
	this.sentenceSettings.addEventListener("click", () => this.gameConfigModal.gameConfigModalSystem.setDefaultConfig(ChallengeType.SENTENCE), {signal: this.abortController?.signal});

	this.testButton.addEventListener("click", () => this.preDestroy());
    }

    
    override styleElements(): void{

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


	this.style.position = "relative";
	// this.style.border = "5px solid pink"
	this.style.width =  "100%";
	this.style.height = "100%";
	this.style.display = "flex"; 
	this.style.gap = "20px";
	this.style.flexDirection = "column";
	this.style.justifyContent = "center";
	this.style.alignItems = "center";

	this.divGradient.style.position = "absolute"; 
	// this.divGradient.style.border = "3px solid red";
	this.divGradient.style.zIndex = "-1";
	this.divGradient.style.height = "100%";
	this.divGradient.style.width = "100%";
	this.divGradient.style.transition = "height 1s ease-in-out, width 1s ease-in-out, --upGradient 1s ease-in-out, --downGradient 1s ease-in-out";
	this.divGradient.style.background = `
        linear-gradient(
            to bottom,
            #121212 0%,
            transparent var(--upGradient),
            transparent var(--downGradient),
            #121212 100%
        )
	`;
	// this.div1.style.height = "100px";
	this.div1.style.marginTop = "50px";
	this.div1.style.width = "500px";
	// this.div1.style.border = "1px solid white";
	this.div1.style.display = "flex";
	this.div1.style.flexDirection = "column";
	this.div1.style.justifyContent = "center";
	this.div1.style.alignItems = "center";
	this.div1.style.gap = "10px";

	this.div2.style.display = "flex";
	this.div2.style.gap = "4px";

	this.startButton.disabled = true;
    }
    


    


}

export default GameRouter;
