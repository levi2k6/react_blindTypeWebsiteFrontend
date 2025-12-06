import Box from "../../class/Box";
import Box2 from "../../class/Box2";
import type Component2 from "../../class/Component2";
import  Element from "../../class/Element";
import { createElement } from "../../ui_system/Element";
import TextAudioSystem from "../system/component_system/TextAudioSystem";
import type GameSystem from "../system/game_system/GameSystem";

class TextAudio extends Box2{

    private gameSystem?: GameSystem;
    private textAudioSystem: TextAudioSystem; 

    get system(){
	return this.textAudioSystem;
    }

    setGameSystem(gameSystem: GameSystem){
	this.gameSystem = gameSystem;
    }

    constructor(name : string){
	super(name)
	this.textAudioSystem = new TextAudioSystem(this);
    }

    override initElements(): void{
	const audio = this.getChild("audio") .self as HTMLAudioElement;
	audio.crossOrigin = "anonymous";
    }

    override structureElements(): Array<Component2> {
	const audio: Element = new Element("audio", "audio");
	const audioDing: Element = new Element("audio", "audioDing");
	const audioWrong: Element = new Element("audio", "audioWrong");

	return[
	    audio,
	    audioDing,
	    audioWrong
	]
    } 

	//    override connectElements(){
	// this.addChildren([
	//     this.audio,
	//     this.audioDing,
	//     this.audioWrong
	// ]);
	//    }

    override eventElements(){
	// this.getChild("audio").self.addEventListener("ended", ()=>{
	//     console.log("after audio done works");
	//     if(this.gameSystem?.getIsContinuous()){
	// 	console.log("TextAudio eventElements: ", this.gameSystem.getGame());
	// 	this.gameSystem.getGame()?.continuousAudioChange();
	//     }else{
	// 	//debug here
	//     }
	// });

	this.addEvent("audio", "ended", () => {
	    if(this.gameSystem?.getIsContinuous()){
		console.log("TextAudio eventElements: ", this.gameSystem.getGame());
		this.gameSystem.getGame()?.continuousAudioChange();
	    }else{
		//debug here
	    }
	})
    }

    override styleElements(){
	this.style.display = "none";
	this.style.border = "1px solid black";
	this.style.height = "100px";
	this.style.width = "100px";
    }
}

export default TextAudio;
