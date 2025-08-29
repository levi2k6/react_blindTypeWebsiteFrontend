import Component from "../components/Component";
import { createElement  } from "../ui_system/Element";

const Home = new Component("Home");
const label =  createElement("label", "textfield"); 
const button = createElement("button", "home");

const connectElements = ()=>{
    Home.addChildren([
	label,
	button
    ]);
}

const styleElements = () => {
    const homeStyle = Home.style;
    homeStyle.background = "red";
    homeStyle.width =  "300px";
    homeStyle.height = "300px";
    homeStyle.display = "flex"; 
    homeStyle.justifyContent = "center";
    homeStyle.alignItems = "center";
}

Home.init([
    connectElements,
    styleElements
]);

export default Home;
