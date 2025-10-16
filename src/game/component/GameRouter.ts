import { createElement } from "../../ui_system/Element.ts";
import { ChallengeType } from "../../utils/enums.ts";

import Box from "../../class/Box.ts";

import GameRouterSystem from "../system/component_system/GameRouterSystem.ts";
import TextHolder from "./TextHolder.ts";
import TextAudio from "./TextAudio.ts";
import type { Component } from "../../class/Component.ts";
import GameConfigModal from "./GameConfigModal.ts";
import GameConfigManager from "../system/game_config/GameConfigManager.ts";
import Visualizer from "../../component/Visualizer.ts";
import Auth0 from "../../auth/Oauth0/Auth0.ts";

class GameRouter extends Box implements Component{

    divGradient = new Box("divGradient");
    textHolder = new TextHolder("TextHolder");

    div1: Box = new Box("div1");
	startButton: HTMLButtonElement = createElement("button", "Start") as HTMLButtonElement; 
	div2: Box = new Box("div2");
	    divLetter: Box = new Box();
		letterSettings: HTMLButtonElement = createElement("button") as HTMLButtonElement;
		    letterSettingsIcon: HTMLElement = createElement("i"); 
		letterButton: HTMLButtonElement = createElement("button", "Letter") as HTMLButtonElement;
	    divWord: Box = new Box();
		wordSettings: HTMLButtonElement = createElement("button") as HTMLButtonElement;
		    wordSettingsIcon: HTMLElement = createElement("i");
		wordButton: HTMLButtonElement = createElement("button", "Word") as HTMLButtonElement;
	    divSentence: Box = new Box();
		sentenceSettings: HTMLButtonElement = createElement("button") as HTMLButtonElement;
		    sentenceSettingsIcon: HTMLElement = createElement("i");
		sentenceButton: HTMLButtonElement = createElement("button", "Sentence") as HTMLButtonElement;

    textAudio = new TextAudio("GameTextAudio"); 
    visualizer: Visualizer = new Visualizer(this.textAudio.audio);


    private gameConfigManager: GameConfigManager = new GameConfigManager(); 

    private gameConfigModal: GameConfigModal = new GameConfigModal(this.gameConfigManager);
    private gameRouterSystem: GameRouterSystem = new GameRouterSystem(this, this.gameConfigManager, this.visualizer);


    constructor( name: string ){
	super(name);
	this.init();
    }

    get system(){
	return this.gameRouterSystem;
    }

    init(){
	this.initElements();
	this.connectElements();
	this.eventElements();
	this.styleElements();
    }

    async initElements(){

	this.textAudio.setGameSystem(this.gameRouterSystem.getGameSystem());

	this.gameConfigModal.style.display = "none";

	this.letterSettingsIcon.classList.add("fa-solid", "fa-gear");
	this.wordSettingsIcon.classList.add("fa-solid", "fa-gear");
	this.sentenceSettingsIcon.classList.add("fa-solid", "fa-gear");
	console.log("letterSettings: ", this.letterSettings);
    }

    connectElements(){
	 this.addChildren([
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
	     this.gameConfigModal
	 ]);

	 this.letterSettings.appendChild(this.letterSettingsIcon);
	 this.wordSettings.appendChild(this.wordSettingsIcon);
	 this.sentenceSettings.appendChild(this.sentenceSettingsIcon);
     }

     eventElements(){
	this.startButton.addEventListener("click", ()=>{
	    this.gameRouterSystem.startGame();
	});

	this.letterButton.addEventListener("click", ()=>{
	    this.gameRouterSystem.setGameType(ChallengeType.LETTER);
	})

	this.wordButton.addEventListener("click", ()=>{
	    this.gameRouterSystem.setGameType(ChallengeType.WORD);
	})

	this.sentenceButton.addEventListener("click", ()=>{
	    this.gameRouterSystem.setGameType(ChallengeType.SENTENCE);
	})

	this.letterSettings.addEventListener("click", ()=>{
	    this.gameConfigModal.style.display =  "flex";
	    this.gameConfigModal.gameConfigModalSystem?.setDefaultConfig(ChallengeType.LETTER);
	})

	this.wordSettings.addEventListener("click", ()=>{
	    this.gameConfigModal.style.display = "flex";
	    this.gameConfigModal.gameConfigModalSystem?.setDefaultConfig(ChallengeType.WORD);
	})

	this.sentenceSettings.addEventListener("click", ()=>{
	    this.gameConfigModal.style.display = "flex";
	    this.gameConfigModal.gameConfigModalSystem?.setDefaultConfig(ChallengeType.SENTENCE);
	})
    }

    styleElements(): void{

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
