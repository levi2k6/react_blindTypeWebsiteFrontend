import Box from "../class/Box"
import Box2 from "../class/Box2";
import Component2 from "../class/Component2";
import Element from "../class/Element";

class Test2 extends Box2{

    public constructor(){
	super("test2");
    }

    override structureElements(): Array<Component2>{
	return [
	    new Element("div", "body")
	]
    }

    override eventElements(): void {
    } 



}

export default Test2


