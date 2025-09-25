import Box from "../../../class/Box";
import { createElement } from "../../../ui_system/Element";

function inputDiv(): Box{
    const div = new Box();
    div.style.border = "1px solid red";
    div.style.height = "30px";
    return div;
}

export function createModalLabel(labelName: string): Box{
    const div = inputDiv();
    const label = createElement("label"); 
    label.innerText = labelName;
    div.addChild(label);

    return div;
}

export function createModalInput(inputType: string): Box{
    const div = inputDiv();
    const input = createElement("input") as HTMLInputElement; 
    input.type = inputType;
    div.addChild(input);

    return div;
}

export function createModalSelect(optionData: Array<string>): Box{
    const div = inputDiv();
    const select = createElement("select");
    optionData.forEach(optionDatum => {
	const optionElement = createElement("option", optionDatum) as HTMLSelectElement; 
	optionElement.value = optionDatum; 
	select.appendChild(optionElement);
    })
    div.addChild(select);


    return div;
}

