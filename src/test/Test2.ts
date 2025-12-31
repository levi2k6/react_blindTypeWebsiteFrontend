import Box from "../class/Box"
import Box2 from "../class/Box2";
import Component2 from "../class/Component2";
import Element from "../class/Element";
import RouteSystem2 from "../route/RouteSystem2";
import LifeCycleSystem from "../systems/LifeCycleSystem";

class Test2 extends Box2{

    private lifeCycleSystem: LifeCycleSystem; 
    private routeSystem?: RouteSystem2;

    public constructor(lifeCycleSystem: LifeCycleSystem){
	super("test2");
	this.lifeCycleSystem = lifeCycleSystem; 
    }

    public setRouteSystem(routeSystem: RouteSystem2){
	this.routeSystem = routeSystem;
    }

    override structureElements(): Array<Component2>{
	return [
	    new Element("div", "body", "this is test2"),
	    new Element("button", "button1", "click test2 button"),
	    new Element("button", "button2", "destroy")
	]
    }

    override eventElements(): void {
	if(!this.routeSystem) throw new Error(`RouteSystem is undefined`);

	this.style.border = "3px solid green";
	
	this.addEvent("button1", "click", () => this.routeSystem!.navigate("/"))


    } 

    override styleElements(): void {
	this.style.background = "red";
    }

}

export default Test2


