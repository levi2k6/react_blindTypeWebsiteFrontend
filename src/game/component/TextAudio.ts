import { createElement } from "../../ui_system/Element";
import Component from "../../class/Component";
import TextAudioSystem from "../system/TextAudioSystem";

class TextAudio extends Component{

    private textAudioSystem: TextAudioSystem = new TextAudioSystem(this);
    public audio: HTMLAudioElement = createElement("audio") as HTMLAudioElement;

    get system(){
	return this.textAudioSystem;
    }

    constructor(name : string){
	super(name)
	this.init();
    }

    init(){
	this.connecElements()
	this.styleElements()
    }

    connecElements(){
	this.addChildren([
	    this.audio,
	]);
    }

    styleElements(){
	this.style.border = "1px solid black";
	this.style.height = "100px";
	this.style.width = "100px";
    }
}

export default TextAudio;
