
import type { Component } from "../class/Component";
import VisualizerSystem from "./system/VisualizerSystem";

class Visualizer implements Component {

    audio: HTMLAudioElement;
    canvas: HTMLCanvasElement = document.querySelector<HTMLCanvasElement>("#visualizer")!; 

    private visualizerSystem: VisualizerSystem;

    constructor(audio: HTMLAudioElement){
	this.audio = audio;
	this.visualizerSystem = new VisualizerSystem(this.audio, this.canvas); 
	this.init()
    }

    get system(){
	return this.visualizerSystem;
    } 


    init(): void{
	this.initElements();
	this.connectElements();
	this.eventElements();
	this.styleElements();
    }

    initElements(): void{

    }

    connectElements(): void{
    }

    eventElements(): void{
	window.addEventListener("resize", () => this.visualizerSystem.resize());
	this.audio.addEventListener("play", async ()=> {
	    await this.visualizerSystem.getAudioCtx().resume();
	    this.visualizerSystem.draw();
	});
    }

    styleElements(): void{
	const style = this.canvas.style;

	// style.background = "red";
	style.position = "fixed"; 
	style.top = "0";
	style.left = "0";
	style.width = "100vw";
	style.height = "100vh";
	style.zIndex = "-1";
	style.pointerEvents = "none";
    }


}


export default Visualizer; 
