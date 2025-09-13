import { createElement } from "../../ui_system/Element.ts";

import Box from "../../class/Box.ts";

import GameRouterSystem from "../system/GameRouterSystem.ts";
import TextHolder from "./TextHolder.ts";
import TextAudio from "./TextAudio.ts";
import type { Component } from "../../class/Component.ts";

class GameRouter extends Box implements Component{

    textHolder = new TextHolder("TextHolder");

    div1: Box = new Box("div1");
	startButton: HTMLButtonElement = createElement("button", "Start") as HTMLButtonElement; 
	div2: Box = new Box("div2");
	    letterButton: HTMLButtonElement = createElement("button", "Letter") as HTMLButtonElement;
	    wordButton: HTMLButtonElement = createElement("button", "Word") as HTMLButtonElement;
	    sentenceButton: HTMLButtonElement = createElement("button", "Sentence") as HTMLButtonElement;

    textAudio = new TextAudio("GameTextAudio");
    dingAudio = new TextAudio("");

    private gameRouterSystem: GameRouterSystem = new GameRouterSystem(this);

    constructor(name: string){
	super(name);
	this.init();
    }

    get system(){
	return this.gameRouterSystem;
    }

    init(){
	this.connectElements();
	this.functionElements();
	this.styleElements();
    }

     connectElements(){
	 this.addChildren([
	     this.textHolder,
	     this.div1.addChildren([
		 this.startButton,
		 this.div2.addChildren([
		     this.letterButton,
		     this.wordButton,
		     this.sentenceButton
		 ]),
	     ]),
	     this.textAudio
	 ]);
     }


     functionElements(){
	this.startButton.addEventListener("click", ()=>{
	    this.gameRouterSystem.startGame();
	});

	this.letterButton.addEventListener("click", ()=>{
	    this.gameRouterSystem.setGameType("letter");
	})

	this.wordButton.addEventListener("click", ()=>{
	    this.gameRouterSystem.setGameType("word");
	})

	this.sentenceButton.addEventListener("click", ()=>{
	    this.gameRouterSystem.setGameType("sentence");
	})
    }

    styleElements(){
	this.style.border = "1px solid red"
	this.style.width =  "100%";
	this.style.height = "100%";
	this.style.display = "flex"; 
	this.style.flexDirection = "column";
	this.style.justifyContent = "center";
	this.style.alignItems = "center";

	this.div1.style.height = "200px";
	this.div1.style.width = "500px";
	this.div1.style.border = "1px solid white";
	this.div1.style.display = "flex";
	this.div1.style.flexDirection = "column";
	this.div1.style.justifyContent = "center";
	this.div1.style.alignItems = "center";

	this.startButton.disabled = true;
    }


}

export default GameRouter;
