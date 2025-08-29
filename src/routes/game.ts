import { createElement } from "../ui_system/Element";
import input from "../game_system/Input.ts";
import Component from "../components/Component.ts";
import textHolder from "../components/game/GameTextHolder.ts";
import gameSystem from "../game_system/GameSystem.ts";
import { configCheck } from "../game_system/GameDataManager.ts";

class Game extends Component{

    label: HTMLElement = createElement("label", "Hello this blue"); 
    startButton: HTMLButtonElement = createElement("button", "Start") as HTMLButtonElement; 

     constructor(name: string){
	 super(name);
	 this.init();
     }

     init(){
	 this.connectElements();
	 this.functionElements();
	 this.styleElements();
     }

     connectElements(){
	 this.addChildren([
	     textHolder,
	     this.label,
	     this.startButton
	 ]);
     }

     functionElements(){
	this.startButton.addEventListener("click", ()=>{
	    gameSystem.init();
	    input.turnOnInput();
	    textHolder.addLetters(gameSystem.getLetters());
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

const game = new Game("Game");

export default game;
