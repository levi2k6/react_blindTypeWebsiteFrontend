import Box2 from "../class/Box2";
import type Component2 from "../class/Component2";

class AboutRouter extends Box2{

    public constructor(name: string){
	super(name);
    }

    override structureElements(): Array<Component2>{

	const div1: Box2 = new Box2("div1", "This is about"); 

	return [
	    div1
	]

    }


    override styleElements(){

	const div1 = this.styleChild("div1");
	div1.height = "100px";
	div1.width = "100px";
    }

}


export default AboutRouter;
