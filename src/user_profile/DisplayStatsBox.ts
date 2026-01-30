import Box2 from "../class/Box2";
import type Component2 from "../class/Component2";

class DisplayStatsBox extends Box2{

    public constructor(name: string){
	super(name);
    } 

    
    override structureElements(): Array<Component2>{
	return[
	]
    } 

    override styleElements(): void {
	this.self.innerText = "DisplayStatsBox";
    }

} 

export default DisplayStatsBox;

