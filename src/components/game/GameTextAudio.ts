import { createElement } from "../../ui_system/Element";
import Component from "../Component";

class GameTextAudio extends Component{

    private audio: HTMLAudioElement = createElement("audio") as HTMLAudioElement;
    private pp: HTMLElement = createElement("pp", "what hell is going on here");

    constructor(name : string){
	super(name)
	console.log("Game text audio created");
	this.init();
    }

    init(){
	this.connecElements()
	this.styleElements()
    }

    addAudioSource(audioName: string, type: string){
	this.audio.muted = false;

	const url  = `http://localhost:8080/${type}/Audio/${audioName}`;
	console.log("url: ", url);

	this.audio.src = url; 
	this.audio.load();
	this.audio.play();
    }

    playAudioSource(){
	this.audio.play();
    }

    connecElements(){
	this.addChildren([
	    this.audio,
	    this.pp
	]);
    }

    styleElements(){
	const selfS = this.self.style;
	selfS.border = "1px solid black";
	selfS.height = "100px";
	selfS.width = "100px";
    }
}

export default GameTextAudio;

