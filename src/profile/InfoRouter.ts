import Box2 from "../class/Box2";
import type Component2 from "../class/Component2";
import Element from "../class/Element";

class InfoRouter extends Box2{

    public constructor(name: string){
	super(name);
    } 

    public structureElements(): Array<Component2> {
	const divInfo: Box2 = new Box2("divInfo");
	    const divLabel: Box2 = new Box2("divLabel"); 
		const labelName: Element = new Element("label", "labelName", "Name:"); 
		const labelEmail: Element = new Element("label", "labelEmail", "Label:") 
	    const divData: Box2 = new Box2("divData"); 
		const dataName: Element = new Element("label", "dataName", "datName"); 
		const dataEmail: Element = new Element("label", "dataEmail", "dataEmail");
	    const divIcon: Box2 = new Box2("divIcon");
		const editName: Element = new Element("i", "editName");
		const editEmail: Element = new Element("i", "editEmail");

	const divStats: Box2 = new Box2("divStats");

        return[
	    divInfo.addChildren([
		divLabel.addChildren([
		    labelName,
		    labelEmail
		]),
		divData.addChildren([
		    dataName,
		    dataEmail
		]),
		divIcon.addChildren([
		    editName,
		    editEmail
		])
	    ]),
	    divStats
	]
    } 

    public initSystems(): void {

    }

    public initElements(): void {
	const divIcon = this.getChild("divInfo").getChild("divIcon");
	divIcon.getChildSelf("editName").classList.add("fa-solid", "fa-gear"); 
	divIcon.getChildSelf("editEmail").classList.add("fa-solid", "fa-gear");;
    }

    public eventElements(): void {
        
    }

    public styleElements(): void {
	this.style.padding = "50px";

	const divInfo = this.getChild("divInfo")
	divInfo.style.display = "flex";
	divInfo.style.flexDirection = "flex";
	// divInfo.style.justifyContent = "center";
	divInfo.style.alignItems = "flex-start";
	divInfo.style.background = "black";
	divInfo.style.height = "500px";
	divInfo.style.width = "500px";
	divInfo.style.padding = "30px";
	divInfo.style.gap = "10px";
	
	const divLabel = divInfo.getChild("divLabel"); 
	divLabel.style.border = "1px solid green"
	divLabel.style.display = "flex";
	divLabel.style.flexDirection = "column";
	divLabel.style.gap = "5px";

	const divData = divInfo.getChild("divData");
	divData.style.border = "1px solid green";
	divData.style.display = "flex";
	divData.style.flexDirection = "column";
	divData.style.gap = "5px";

	const divIcon = divInfo.getChild("divIcon"); 
	divIcon.style.border = "1px solid green";
	divIcon.style.display = "flex";
	divIcon.style.flexDirection = "column";
	divIcon.style.padding = "5px";
	divIcon.style.gap = "10px"

    }


}

export default InfoRouter;
