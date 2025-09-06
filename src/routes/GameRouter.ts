import { createElement } from "../ui_system/Element.ts";
import Input from "../game_system/Input.ts";
import Component from "../components/Component.ts";
import GameTextAudio from "../components/game/GameTextAudio.ts";
import TextHolder from "../components/game/GameTextHolder.ts";
import GameSystem from "../game_system/GameSystem.ts";
import { apiFetch } from "../utils/apiUtils.ts";

import type { Response, Challenge } from "../utils/interfaces.ts";

class GameRouter extends Component{

    gameSystem: GameSystem = new GameSystem(this);
    input: Input = new Input(this.gameSystem);

    textHolder: TextHolder = new TextHolder("TextHolder");
    label: HTMLElement = createElement("label", "Hello this blue");

    div1: Component = new Component("div1");
	startButton: HTMLButtonElement = createElement("button", "Start") as HTMLButtonElement; 
    div2: Component = new Component("div2");
	letterButton: HTMLButtonElement = createElement("button", "Letter") as HTMLButtonElement;
	wordButton: HTMLButtonElement = createElement("button", "Word") as HTMLButtonElement;
	sentenceButton: HTMLButtonElement = createElement("button", "Button") as HTMLButtonElement;

    gameTextAudio = new GameTextAudio("audioText"); 


    constructor(name: string){
	super(name);
	this.init();
    }

    init(){
	this.connectElements();
	this.functionElements();
	this.styleElements();
    }

    getGameSystem(){
	return this.gameSystem;
    }

    getTextHolder(){
	return this.textHolder; 
    }

     connectElements(){
	 this.addChildren([
	     this.textHolder,
	     this.label,
	     this.div1.addChildren([
		 this.startButton,
		 this.div2.addChildren([
		     this.letterButton,
		     this.wordButton,
		     this.sentenceButton
		 ]),
	     ]),
	     this.gameTextAudio.self
	 ]);
     }


     functionElements(){
	this.startButton.addEventListener("click", async()=>{
	    const response: Response<Challenge> | undefined = await apiFetch("GET", "http://localhost:8080/Game/challenge/");
	    if(response === undefined){
		console.log("challenge response is undefiend");
		return;
	    }

	    console.log("response: ", response);

	    this.gameTextAudio.addAudioSource(response.data.audioName, this.gameSystem.getType());
	    this.gameSystem.init(
		response.data.text, 
		"sentence"
	    );

	    this.input.turnOnInput();

	    if(this.gameSystem.getType() == "sentence"){
		if(!this.gameSystem.getStringGame()){
		    return;
		}
		this.textHolder.addLetters(this.gameSystem.getStringGame().getLetters());
	    }

	    this.startButton.disabled = true;
	});

	this.letterButton.addEventListener("click", ()=>{
	})

	this.wordButton.addEventListener("click", ()=>{
	})

	this.sentenceButton.addEventListener("click", ()=>{
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
    }


}

export default GameRouter;
