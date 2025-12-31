import Component2 from "../../class/Component2";
import  Element from "../../class/Element";
import VisualizerSystem from "../system/visualizer/VisualizerSystem";
import type TextAudio from "./TextAudio";

class Visualizer extends Component2{

    private audio?: HTMLAudioElement;

    private visualizerSystem?: VisualizerSystem;

    constructor(){
	const element: HTMLElement = new Element("canvas", "Visualizer").self; 
	super(element, "visualizer");
    }

    get system(){
	return this.visualizerSystem;
    } 

    initComponent(audio: HTMLAudioElement, ): void {
	this.audio = audio;
	this.visualizerSystem = new VisualizerSystem(); 
    }

    public setAudio(audio: HTMLAudioElement){
	this.audio = audio;
    }

    override structureElements(): Array<Component2> {
	return[
	]
    } 

    override initSystems(): void {
    }

    override initElements(): void{
	if(!this.audio) return;
	if(!this.visualizerSystem) throw new Error("Failed to initialized Visualizer");
	this.visualizerSystem.initSystem(this.audio, this.self as HTMLCanvasElement);
    }

    override eventElements(): void{
	if(!this.audio) throw new Error("Audio is undefined during add event to visualizer's element");
	if(!this.visualizerSystem) throw new Error("Failed to initialized Visualizer");

	window.addEventListener("resize", () => this.visualizerSystem?.resize());
	this.audio.addEventListener("play", async ()=> {
	    await this.visualizerSystem?.getAudioCtx()?.resume();
	    this.visualizerSystem?.startAppear();
	});
    }

    override styleElements(): void{
	// this.style.background = "red";
	this.style.position = "fixed"; 
	this.style.top = "0";
	this.style.left = "0";
	this.style.width = "100vw";
	this.style.height = "100vh";
	this.style.zIndex = "0";
	this.style.pointerEvents = "none";
    }

}


export default Visualizer; 
