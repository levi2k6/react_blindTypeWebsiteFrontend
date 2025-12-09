import Box2 from "../class/Box2";
import Component2 from "../class/Component2";
import Element from "../class/Element";
import type RouteSystem2 from "../route/RouteSystem2";

class Test1 extends Box2{

    private routeSystem?: RouteSystem2; 

    public constructor(){
	super("Test1");

    }

    public setRouteSystem(routeSystem: RouteSystem2){
	this.routeSystem = routeSystem; 
    }

    override structureElements(): Array<Component2>{
	console.log("when was this even triggered");
	return [
	    new Box2("box2").addChildren([new Box2("henry")]),
	    new Element("button", "button1", "click")
	]
    }

    override initElements(): void {
	this.getChild("box2").self.innerText = "hello";
    }

    override eventElements(): void {
	if(!this.routeSystem) throw new Error(`RouteSystem is undefined`);

	this.addEvent("button1", "click", () => this.routeSystem?.navigate("/game"));
    } 

    override styleElements(): void {
	// this.style.border = "1px solid green";
	this.style.color = "blue";
	this.styleChild("box2").border = "1px solid yellow";
	this.getChild("box2").getChild("henry").self.innerText = "HELLO AGAIN";
	this.getChild("box2").styleChild("henry").height = "100px";
    }

}

export default Test1


