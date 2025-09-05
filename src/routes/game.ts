import { createElement } from "../ui_system/Element";
import Input from "../game_system/Input.ts";
import Component from "../components/Component.ts";
import GameTextAudio from "../components/game/GameTextAudio.ts";
import TextHolder from "../components/game/GameTextHolder.ts";
import GameSystem from "../game_system/GameSystem.ts";
import { apiFetch } from "../utils/apiUtils.ts";

import type { Response, Challenge } from "../utils/interfaces.ts";
import textReader from "../game_system/TextReader.ts";


class Game extends Component{

    gameSystem: GameSystem = new GameSystem(this);
    input: Input = new Input(this.gameSystem);

    textHolder: TextHolder = new TextHolder("TextHolder");
    label: HTMLElement = createElement("label", "Hello this blue"); 
    startButton: HTMLButtonElement = createElement("button", "Start") as HTMLButtonElement; 
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
	     this.startButton,
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

	    this.gameTextAudio.addAudioSource(response.data.audioName);

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
    }

    styleElements(){
	const gameStyle = this.self.style;
	gameStyle.border = "1px solid red"
	gameStyle.width =  "100%";
	gameStyle.height = "100%";
	gameStyle.display = "flex"; 
	gameStyle.flexDirection = "column";
	gameStyle.justifyContent = "center";
	gameStyle.alignItems = "center";
    }

}

export default Game;
