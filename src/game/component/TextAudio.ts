import Box from "../../class/Box";
import type { Component } from "../../class/Component";
import { createElement } from "../../ui_system/Element";
import TextAudioSystem from "../system/component_system/TextAudioSystem";

class TextAudio extends Box implements Component{

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
	this.connectElements();
	this.styleElements();
    }

    initElements(): void{
    }

    connectElements(){
	this.addChildren([
	    this.audio,
	    this.audioDing,
	    this.audioWrong
	]);
    }

    eventElements(){
    }

    styleElements(){
	this.style.border = "1px solid black";
	this.style.height = "100px";
	this.style.width = "100px";
    }
}

export default TextAudio;
