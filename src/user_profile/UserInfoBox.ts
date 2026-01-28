import Box2 from "../class/Box2";
import type Component2 from "../class/Component2";
import Element from "../class/Element";
import { capitalizeFirstLetter } from "../utils/textUtil";

export type InfoData = {
    "label": string; 
    "info": string
};

class UserInfoBox extends Box2{

    private data: Array<InfoData>;
    public constructor(name: string, data: Array<InfoData>){
	super(name);
	this.data = data;
    } 

    public structureElements(): Array<Component2> {
	const divLabel: Box2 = new Box2("divLabel"); 
	const divInfo: Box2 = new Box2("divInfo"); 
	const divButton: Box2 = new Box2("divButton");

        return[
	    divLabel,
	    divInfo,
	    divButton
	]
    }

    override initElements(): void {
	const divLabel = this.getChild("divLabel");
	const divInfo = this.getChild("divInfo");
	const divButton = this.getChild("divButton");

	for(let i = 0; i < this.data.length; i++){
	    const labelText = capitalizeFirstLetter(this.data[i].label);
	    const newLabel: Element = new Element("label", "label" + labelText, labelText + ":"); 
	    divLabel.addChild(newLabel);

	    const infoText = capitalizeFirstLetter(this.data[i].info);
	    const newData: Element = new Element("label", "info" + labelText, infoText);
	    divInfo.addChild(newData);

	    const editInfo: Element = new Element("button", "edit" + labelText, "Edit"); 
	    divButton.addChild(editInfo);
	}
    }

    styleElements(): void {
	this.style.display = "flex";
	this.style.flexDirection = "flex";
	// this.style.justifyContent = "center";
	this.style.alignItems = "flex-start";
	this.style.background = "black";
	this.style.height = "500px";
	this.style.width = "500px";
	this.style.padding = "30px";
	this.style.gap = "10px";

	const divLabel = this.getChild("divLabel"); 
	divLabel.style.border = "1px solid green"
	divLabel.style.display = "flex";
	divLabel.style.flexDirection = "column";
	divLabel.style.gap = "5px";

	const divInfo = this.getChild("divInfo");
	divInfo.style.border = "1px solid green";
	divInfo.style.display = "flex";
	divInfo.style.flexDirection = "column";
	divInfo.style.gap = "5px";

	const divButton = this.getChild("divButton"); 
	divButton.style.border = "1px solid green";
	divButton.style.display = "flex";
	divButton.style.flexDirection = "column";
	divButton.style.padding = "5px";
	divButton.style.gap = "10px"
    }

}

export default UserInfoBox; 
