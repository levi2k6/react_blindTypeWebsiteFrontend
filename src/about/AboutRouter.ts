import Box2 from "../class/Box2";
import type Component2 from "../class/Component2";
import Element from "../class/Element";

class AboutRouter extends Box2{

    public constructor(name: string){
	super(name);
    }

    override structureElements(): Array<Component2>{

	const div1: Box2 = new Box2("div1"); 
	    const h1About: Element = new Element("h1", "h1About", "About"); 
	    const pAbout: Element = new Element("p", "pAbout", "This website is about improving your key placement intuition");

	return [
	    div1.addChildren([
		h1About,
		pAbout	
	    ])
	]

    }

    override styleElements(){

	this.style.display = "flex";
	this.style.flexDirection = "column";
	this.style.justifyContent = "center";
	this.style.alignItems = "center";
	this.style.border = "1px solid yellow";
	this.style.height = "100%";

	const div1 = this.getChild("div1");

	div1.style.height = "300px";
	div1.style.width = "300px";
	div1.style.border = "1px solid green";

	// const h1About = div1.getChild("h1About");
	
    }

}


export default AboutRouter;
