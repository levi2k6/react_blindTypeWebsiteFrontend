import Box2 from "./Box2";
import type Component2 from "./Component2";
import Element from "./Element";
import SelectComponent from "./Select";

class SelectBoxComponent extends Box2{
    private selectLabelDiv: Box2;
    private label: Element;  
    private select: SelectComponent; 

    public constructor(name: string, options: Array<string>){
	super(`${name}Div`);
	this.selectLabelDiv = new Box2(`${name}LabelDiv`);
	this.label = new Element("label", `${name}Label`, this.capitalizeLabel(name));  
	this.select = new SelectComponent(`${name}Input`, options); 
    };

    public getLabel(): Element{
	return this.label;
    };

    public getInput(): SelectComponent{
	return this.select;
    } 

    private capitalizeLabel(s: string): string {
      const [first, ...rest] = [...s]
      return first ? first.toLocaleUpperCase() + rest.join("") : s
    }

    override structureElements(): Array<Component2> {
	const selectLabelDiv = this.selectLabelDiv;
	    const inputLabel = this.label;
	const select = this.select;

 	return [ 
	    selectLabelDiv.addChildren([
		inputLabel
	    ]),
	    select
	]
       
    }

}

export default SelectBoxComponent;

