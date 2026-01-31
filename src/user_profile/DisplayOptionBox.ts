import Box2 from "../class/Box2";
import Component2 from "../class/Component2";
import Element from "../class/Element";
import AuthState from "../utils/authState";
import type { User } from "../utils/interfaces";
import DisplayInfoBox from "./DisplayInfoBox";
import DisplayStatsBox from "./DisplayStatsBox";
    
class DisplayOptionBox extends Box2{

    private authUser?: User; 

    public constructor(name: string){
	super(name);
	this.authUser = AuthState.getAuthUser();
    } 

   public updateDisplay(option: string){
	const divDisplay = this.getChild("divDisplay");
	const children = divDisplay.getChildren();
	for(const child of children.values()){
	    if(!child){
		throw new Error("Option does not exist during ProfileOptionBox update");
	    }
	    if(child.getName() == option){
		child.style.display = "flex";
	    }else{
		child.style.display = "none";
	    }
	}
    }

    override structureElements(): Array<Component2> {
	const divOptions: Box2 = new Box2("divOptions"); 
	    const infoButton: Element = new Element("button", "infoButton", "Info"); 
	    const statsButton: Element = new Element("button", "statsButton", "Stats");
	const divDisplay: Box2 = new Box2("divDisplay");
		const displayInfoBox: DisplayInfoBox = new DisplayInfoBox("displayInfoBox");
		const displayStatsBox: DisplayStatsBox = new DisplayStatsBox("displayStatsBox");  

	return [
	    divOptions.addChildren([
		infoButton,
		statsButton
	    ]),
	    divDisplay.addChildren([
		displayInfoBox,
		displayStatsBox
	    ])
	];
    } 

    override initElements(): void {
	console.log("init is working");
	console.log("init is working");
    }

    override eventElements(): void {
        const divOptions = this.getChild("divOptions");
	divOptions.addEvent("infoButton", "click", ()=>{
	    this.updateDisplay("displayInfoBox");
	});
	divOptions.addEvent("statsButton", "click", ()=>{
	    this.updateDisplay("displayStatsBox");
	});

    }

    override styleElements(): void {
        const divOptions = this.getChild("divOptions");
	divOptions.style.display = "flex";

	const divDisplay = this.getChild("divDisplay");
	divDisplay.style.border = "1px solid green";

	const children = divDisplay.getChildren();
	for(const child of children.values()){
	    console.log("child: ", child);
	    if(!child){
		throw new Error("Option does not exist during ProfileOptionBox init");
	    }
	    // child.style.display = "none";
	    this.updateDisplay("displayInfoBox");
	}

	// const displayInfoBox = divDisplay.getChild("displayInfoBox"); 
	// displayInfoBox.style.display = "none";

    }

}

export default DisplayOptionBox;
