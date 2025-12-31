import Box2 from "../../class/Box2";
import type Component2 from "../../class/Component2";
import type LifeCycleSystem from "../../systems/LifeCycleSystem";
import TextHolderSystem from "../system/component_system/TextHolderSystem";

class TextHolder extends Box2{

    private lifeCycleSystem?: LifeCycleSystem;

    private textHoldersystem?: TextHolderSystem;

     constructor(){
	 super("textHolder");
     }

     get system(){
	 return this.textHoldersystem;
     }

     override structureElements(): Array<Component2> {
	 return [];
     }

     public initcomponent(lifeCycleSystem: LifeCycleSystem){
	 this.lifeCycleSystem = lifeCycleSystem;
	 this.textHoldersystem = new TextHolderSystem(this, this.lifeCycleSystem);
     };

     override initSystems(): void {
	 // if(!this.lifeCycleSystem) throw new Error("lifeCycleSystem is undefined"); 
	 // this.textHoldersystem = new TextHolderSystem(this, this.lifeCycleSystem);
     }

    override initElements(){};

    override eventElements(){}

    override styleElements(){
	console.log("TextHolder styleElements()");
	this.style.border = "1px solid yellow";
	this.style.marginTop = "10px";
	this.style.background = "linear-gradient(to bottom, #1a1a1a 0%, transparent 10%,transparent 10%, transparent 50%, transparent 90%, transparent 90%, #1a1a1a 100%)";
	this.style.width = "100vw";
	this.style.height = "400px";
	this.style.minHeight = "300px"; 
	this.style.display = "flex"; 
	// this.style.visibility = "hidden";

	this.style.flexDirection = "column";
	this.style.overflowY = "auto";
	this.style.justifyContent = "center"; 
	this.style.alignItems = "center";
	this.style.whiteSpace = "normal";
    }
}

export default TextHolder;

