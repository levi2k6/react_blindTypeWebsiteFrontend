import { createElement } from "../ui_system/Element";
import Box from "../class/Box.ts";
import { apiFetch } from "../utils/apiUtils.ts";

class Home extends Box{

    label: HTMLElement = createElement("label", "Hello this blue"); 
    startButton: HTMLButtonElement = createElement("button", "Start") as HTMLButtonElement; 

     constructor(name: string){
	 super(name);
	 this.init();
     }

     init(){
	 this.connectElements();
	 this.eventElements();
	 this.styleElements();
     }

    connectElements(){
	 this.addChildren([
	     this.label,
	     this.startButton
	 ]);
     }


    eventElements(){
	this.startButton.addEventListener("click", ()=>{
	    apiFetch("GET", "http://localhost:8080/Game/challenge/")
	    .then(data => console.log(data));
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

const home = new Home("Game");

export default home;
