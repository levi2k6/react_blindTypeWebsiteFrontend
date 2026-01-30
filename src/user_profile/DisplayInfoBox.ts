import Box2 from "../class/Box2";
import type Component2 from "../class/Component2";
import Element from "../class/Element";
import AuthState from "../utils/authState";
import type { User } from "../utils/interfaces";
import { capitalizeFirstLetter } from "../utils/textUtil";

export type InfoData = {
    "label": string; 
    "info": string;
    "editable": boolean;
};

class DisplayInfoBox extends Box2{

    private authUser?: User; 
    private data: Array<InfoData>;  

    public constructor(name: string){
	super(name);
	this.authUser = AuthState.getAuthUser();
	console.log("authUser data: ", this.authUser);
	this.data = [
	    {"label": "username", "info": this.authUser?.username ?? "", "editable": true},
	    {"label": "email", "info": this.authUser?.email ?? "", "editable": true},
	    {"label": "name", "info": this.authUser?.name ?? "", "editable": true},
	    {"label": "gender", "info": this.authUser?.gender ?? "", "editable": true},
	    {"label": "birthdate", "info": this.authUser?.birthdate ?? "", "editable": true},
	    {"label": "joined", "info": this.authUser?.createdAt ?? "", "editable": true}
	];
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

	    const divEdit: Box2 = new Box2("divEdit" + labelText);
		const editInfo: Element = new Element("button", "edit" + labelText, "Edit"); 
	    divButton.addChild(
		divEdit.addChild(editInfo)
	    );
	}
    }

    styleElements(): void {
	// this.style.display = "flex";
	this.style.flexDirection = "flex";
	// this.style.justifyContent = "center";
	this.style.alignItems = "flex-start";
	this.style.background = "black";
	this.style.height = "500px";
	this.style.padding = "5rem";
	this.style.gap = "10px";

	console.log("style UserInfoBox[]");
		
	const divLabel = this.getChild("divLabel"); 
	divLabel.style.border = "1px solid green"
	divLabel.style.display = "flex";
	divLabel.style.flexDirection = "column";
	divLabel.style.gap = "5px";

	divLabel.getChildren().forEach(child => {
	    console.log("UserInfoBox[] child: ", child);
	    child.style.display = "flex";
	    child.style.justifyContent = "center";
	    child.style.alignItems = "center";
	    child.style.fontSize = "1.3rem";
	    child.style.height = "3rem";
	    child.style.border = "1px solid red";
	});


	const divInfo = this.getChild("divInfo");
	divInfo.style.border = "1px solid green";
	divInfo.style.display = "flex";
	divInfo.style.flexDirection = "column";
	divInfo.style.gap = "5px";

	divInfo.getChildren().forEach(child => {
	    child.style.display = "flex";
	    child.style.justifyContent = "center";
	    child.style.alignItems = "center";
	    child.style.fontSize = "1.3rem";
	    child.style.height = "3rem";
	    child.style.border = "1px solid red";
	});

	const divButton = this.getChild("divButton"); 
	divButton.style.border = "1px solid green";
	divButton.style.display = "flex";
	divButton.style.flexDirection = "column";
	// divButton.style.padding = "5px";
	divButton.style.gap = "5px"

	divButton.getChildren().forEach(child => {
	    console.log("UserInfoBox[] child: ", child);
	    child.style.display = "flex";
	    child.style.justifyContent = "center";
	    child.style.alignItems = "center";
	    child.style.height = "3rem";
	    child.style.border = "1px solid red";
	});

    }

}

export default DisplayInfoBox; 
