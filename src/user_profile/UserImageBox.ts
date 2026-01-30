import Box2 from "../class/Box2";
import type Component2 from "../class/Component2";
import Element from "../class/Element";
import profile from '../../public/user/profile.png'; 

class UserImageBox extends Box2{

    public constructor(name: string){
	super(name);
    } 

    override structureElements(): Array<Component2> {
	const divImage: Box2 = new Box2("divImage"); 
	    const image: Element = new Element("img", "image"); 
	    const infoBox: Box2 = new Box2("infoBox");
		const divName: Box2 = new Box2("divName"); 
		    const h1Name: Element = new Element("label", "h1Name", "NAME HERE HELLO");
		const milestone: Box2 = new Box2("milestone");
		    const divTotalHours: Box2 = new Box2("divTotalHours"); 
			const labelTotalHours: Element = new Element("label", "labelTotalHours", "Total Hours: "); 
			const numberTotalHours: Element = new Element("label", "numberTotalHours", "ome nillion");
		    const divTotalGames: Box2 = new Box2("divTotalGames");
			const labelTotalGames: Element = new Element("label", "labelTotalGames", "Total Games: "); 
			const numberTotalGames: Element = new Element("label", "numberTotalGames", "ome nillion");


	return[
	    divImage.addChildren([
		image,
		infoBox.addChildren([
		    divName.addChild(h1Name),
		    milestone.addChildren([
			divTotalHours.addChildren([
			    labelTotalHours,
			    numberTotalHours
			]),
			divTotalGames.addChildren([
			    labelTotalGames,
			    numberTotalGames
			]),
		    ])
		]),
	    ])
	]
    }

    override initElements(): void {
	const image = this.getChild("divImage").getChildSelf("image") as HTMLImageElement;
	image.src = profile;
    }

    override styleElements(): void{
	const divImage = this.getChild("divImage");
	divImage.style.display = "flex";
	divImage.style.backgroundColor = "black";
	divImage.style.border = "1px solid red";
	divImage.style.padding = "2rem";
	divImage.style.gap = "3rem";

	const image = divImage.getChildSelf("image");
	image.style.display = "flex";
	image.style.width = "200px";

	const infoBox = divImage.getChild("infoBox"); 
	infoBox.style.border = "1px solid green";
	infoBox.style.display = "flex";
	infoBox.style.flexDirection = "column";
	infoBox.style.width = "100%";

	const divName = infoBox.getChild("divName");
	divName.style.display = "flex";
	divName.style.padding = "0.5rem";
	divName.style.border = "1px solid red";
	    // const h1Name = divName.getChildSelf("h1Name");
	    // h1Name.style.border = "1px solid red"

	const milestone = infoBox.getChild("milestone"); 
	milestone.style.display = "flex";
	milestone.style.border = "1px solid yellow";
	milestone.style.height = "100%";
	    const divTotalHours = milestone.getChild("divTotalHours");
	    divTotalHours.style.display = "flex";
	    divTotalHours.style.justifyContent = "center";
	    divTotalHours.style.alignItems = "center";
	    divTotalHours.style.flex = "1";
	    divTotalHours.style.border = "1px solid green";
		const labelTotalHours = divTotalHours.getChild("labelTotalHours"); 
		const numberTotalHours = divTotalHours.getChild("numberTotalHours"); 
	    const divTotalGames = milestone.getChild("divTotalGames");
	    divTotalGames.style.display = "flex";
	    divTotalGames.style.justifyContent = "center";
	    divTotalGames.style.alignItems = "center";
	    divTotalGames.style.flex = "1";
	    divTotalGames.style.flex = "1";
	    divTotalGames.style.border = "1px solid green";

    }

}

export default UserImageBox;
