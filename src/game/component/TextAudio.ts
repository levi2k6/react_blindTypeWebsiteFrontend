import Box2 from "../../class/Box2";
import type Component2 from "../../class/Component2";
import  Element from "../../class/Element";
import TextAudioSystem from "../system/component_system/TextAudioSystem";
import GameSystem from "../system/game_system/GameSystem";

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

    override initComponent(): void {
	this.gameSystem = new GameSystem();
	this.textAudioSystem = new TextAudioSystem(); 
    }

    override initElements(): void{

	const audio = this.getChild("audio").self as HTMLAudioElement;
	audio.crossOrigin = "anonymous";

	const dingPath: string = "/ding.mp3";
	const wrongPath: string = "/wrong.wav";

	const audioDing = this.getChildSelf("audioDing") as HTMLAudioElement;
	audioDing.src = dingPath;
	audioDing.load();

	const audioWrong = this.getChildSelf("audioWrong") as HTMLAudioElement;
	audioWrong.src = wrongPath;
	audioWrong.load();
    }

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

	// this.addEvent("audio", "ended", () => {
	//     if(this.gameSystem?.getIsContinuous()){
	// 	console.log("TextAudio eventElements: ", this.gameSystem.getGame());
	// 	this.gameSystem.getGame()?.continuousAudioChange();
	//     }else{
	// 	//debug here
	//     }
	// })
    }

    override styleElements(){
	// this.style.display = "none";
	// this.style.border = "1px solid black";
	// this.style.height = "100px";
	// this.style.width = "100px";
    }
}

export default TextAudio;
