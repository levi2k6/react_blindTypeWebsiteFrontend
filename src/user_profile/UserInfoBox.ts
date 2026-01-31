import Box2 from "../class/Box2";
import type Component2 from "../class/Component2";
import Element from "../class/Element";
import AuthState from "../utils/authState";
import type { User } from "../utils/interfaces";
import { capitalizeFirstLetter, toCamelCase } from "../utils/textUtil";
import UserInfoBoxSystem from "./system/UserInfoBoxSystem";

export type InfoData = {
    "label": string; 
    "info": string | boolean;
    "edit"?: boolean;
    "init"?: boolean;
};

class UserInfoBox extends Box2{

    private authUser?: User; 
    private data: Array<InfoData>;  
    private userInfoBoxSystem: UserInfoBoxSystem = new UserInfoBoxSystem(); 

    public constructor(name: string, data: Array<InfoData>){
	super(name);
	this.authUser = AuthState.getAuthUser();
	console.log("authUser data: ", this.authUser);
	this.data = data;
	this.userInfoBoxSystem.processData(data);
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

	for(const entry of this.data){
	    const labelText = capitalizeFirstLetter(entry.label);
	    const newLabel: Element = new Element("label", toCamelCase( "label " + entry.label), labelText + ":"); 
	    divLabel.addChild(newLabel);

	    if(typeof entry.info === "boolean"){
		throw new Error("Displaying data as boolean is invalid");
	    }
	    // const infoText = capitalizeFirstLetter(entry.info);
	    const newData: Element = new Element("label", "info" + labelText, entry.info);
	    divInfo.addChild(newData);

	    if(!entry.info && entry.init){
		const divAdd: Box2 = new Box2("divAdd" + labelText);
		    const addInfo: Element = new Element("button", "add" + labelText, "Add"); 
		divButton.addChild(
		    divAdd.addChild(addInfo)
		)
	    }else if( entry.info && entry.edit){
		const divEdit: Box2 = new Box2("divEdit" + labelText);
		    const editInfo: Element = new Element("button", "edit" + labelText, "Edit"); 
		divButton.addChild(
		    divEdit.addChild(editInfo)
		);
	    }	    

	}
    }

    styleElements(): void {
	this.style.display = "flex";
	// this.style.flexDirection = "flex";
	// this.style.justifyContent = "center";
	this.style.alignItems = "flex-start";
	// this.style.background = "black";
	// this.style.padding = "5rem";
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

export default UserInfoBox; 
