import Box2 from "../class/Box2";
import Component2 from "../class/Component2";
import Element from "../class/Element";

class Test1 extends Box2{

    public constructor(){
	super("Test1");
    }

    override structureElements(): Array<Component2>{
	return [
	    new Box2("box2").addChildren([new Box2("henry")]),
	    new Element("button", "button1", "click")
	]
    }

    override initElements(): void {
	this.getChild("box2").self.innerText = "hello";
    }

    override eventElements(): void {
	this.getChild("button1").self.addEventListener("click", ()=>{
	    console.log("event Elements working");
	});
    } 

    override styleElements(): void {
	console.log("test1 styling");
	this.style.color = "blue";
	this.styleChild("box2").border = "1px solid yellow";
	this.getChild("box2").getChild("henry").self.innerText = "HELLO AGAIN";
	this.getChild("box2").styleChild("henry").height = "100px";
    }

}

export default Test1


