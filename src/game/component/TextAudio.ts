import { createElement } from "../../ui_system/Element";
import Component from "../../class/Component";
import TextAudioSystem from "../system/TextAudioSystem";

class TextAudio extends Component{

    public audio: HTMLAudioElement = createElement("audio") as HTMLAudioElement;
    public audioDing: HTMLAudioElement = createElement("audio") as HTMLAudioElement;
    public audioWrong: HTMLAudioElement = createElement("audio") as HTMLAudioElement;

    private textAudioSystem: TextAudioSystem = new TextAudioSystem(this);

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
	    this.audioDing,
	    this.audioWrong
	]);
    }

    styleElements(){
	this.style.border = "1px solid black";
	this.style.height = "100px";
	this.style.width = "100px";
    }
}

export default TextAudio;
