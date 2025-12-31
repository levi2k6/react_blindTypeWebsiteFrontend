import Box from "../../class/Box";
import { createElement } from "../../ui_system/Element";
import TextAudioSystem from "../system/component_system/TextAudioSystem";
import type GameSystem from "../system/game_system/GameSystem";

class TextAudio extends Box{

    public audio: HTMLAudioElement = createElement("audio") as HTMLAudioElement;
    public audioDing: HTMLAudioElement = createElement("audio") as HTMLAudioElement;
    public audioWrong: HTMLAudioElement = createElement("audio") as HTMLAudioElement;

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
	this.init();
    }

    override initElements(): void{
	this.audio.crossOrigin = "anonymous";
    }

    override connectElements(){
	this.addChildren([
	    this.audio,
	    this.audioDing,
	    this.audioWrong
	]);
    }

    override eventElements(){
	this.audio.addEventListener("ended", ()=>{
	    console.log("after audio done works");
	    if(this.gameSystem?.getIsContinuous()){
		console.log("TextAudio eventElements: ", this.gameSystem.getGame());
		this.gameSystem.getGame()?.continuousAudioChange();
	    }else{
		//debug here
	    }
	});
    }

    override styleElements(){
	this.style.display = "none";
	this.style.border = "1px solid black";
	this.style.height = "100px";
	this.style.width = "100px";
    }
}

export default TextAudio;
