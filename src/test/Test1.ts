import Box from "../class/Box"
import Box2 from "../class/Box2";
import Component2 from "../class/Component2";
import Element from "../class/Element";

import LifeCycleSystem from "../systems/LifeCycleSystem";
import { createElement } from "../ui_system/Element";

class Test1 extends Component2{

    private lifeCycleSystem: LifeCycleSystem = new LifeCycleSystem();

    override structureElements(): Array<Component2>{
	return [
	    new Box2("box2").addChildren([new Box2("hello")]),
	    new Element("div", "body")
	]
    }

    override eventElements(): void {
    } 



}

export default Test1


