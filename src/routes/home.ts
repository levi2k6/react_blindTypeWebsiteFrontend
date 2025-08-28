import { createElement  } from "../ui_system/Element";

const div = createElement("div");

const label =  createElement("label", "textfield"); 
const button = createElement("button", "home");

function home(): HTMLElement{

    connectElements();
    styleElements();

    return div;
}

function connectElements(){
    div.appendChild( label );
    div.appendChild( button );
} 

function styleElements(){
    const divStyle = div.style;
    divStyle.background = "red";
    divStyle.width =  "300px";
    divStyle.height = "300px";
    divStyle.display = "flex"; 
    divStyle.justifyContent = "center";
    divStyle.alignItems = "center";
}

export default home;
