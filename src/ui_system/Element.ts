export function createElement(type: string) : HTMLElement;
export function createElement(type: string, innerText: string) : HTMLElement;
export function createElement(type: string, innerText: string = "") : HTMLElement{
    let element = document.createElement(type);
    element.innerText = innerText;
    return element;
}


