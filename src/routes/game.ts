import { createElement } from "../ui_system/Element";
import input from "../game_system/Input.ts";

const div =  createElement("div");

const label = createElement("label", "Hello this blue"); 
const button = createElement("button", "home");

function game(): HTMLElement{

    connectElements();
    functionElements();
    styleElements();

    return div;
}

function connectElements(){
    div.appendChild( label );
    div.appendChild( button );
} 

function functionElements(){
    button.addEventListener("click", ()=>{
	input.turnOnInput();
    });
}

function styleElements(){

    const divStyle = div.style;
    divStyle.border = "1px solid red"
    divStyle.width =  "1000px";
    divStyle.height = "600px";
    divStyle.display = "flex"; 
    divStyle.justifyContent = "center";
    divStyle.alignItems = "center";
}

export default game;
