import Box2 from "../class/Box2";
import type Component2 from "../class/Component2";

class RegisterRouter extends Box2{

    public constructor(name: string){
	super(name)
    }

    override structureElements(): Array<Component2>{
	const div = new Box2("div", "This is Register"); 

	return[
	    div
	]
    } 

}


export default RegisterRouter;

