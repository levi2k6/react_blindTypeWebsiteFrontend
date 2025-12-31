import Component from "../../class/Component";
import { createElement } from "../../ui_system/Element";
import VisualizerSystem from "../system/visualizer/VisualizerSystem";

class Visualizer extends Component {

    audio: HTMLAudioElement;

    private visualizerSystem: VisualizerSystem;

    constructor(audio: HTMLAudioElement){
	const mainElement: HTMLCanvasElement = createElement("canvas") as HTMLCanvasElement; 
	console.log("MainElement: ", mainElement);
	mainElement.id = "visualizer";
	super(mainElement);
	this.audio = audio;
	this.visualizerSystem = new VisualizerSystem(this.audio, this.self as HTMLCanvasElement); 
	this.init();
    }

    get system(){
	return this.visualizerSystem;
    } 

    override initElements(): void{

    }

    override connectElements(): void{
    }

    override eventElements(): void{
	window.addEventListener("resize", () => this.visualizerSystem.resize());
	this.audio.addEventListener("play", async ()=> {
	    await this.visualizerSystem.getAudioCtx().resume();
	    this.visualizerSystem.startAppear();
	});
    }

    override styleElements(): void{
	// this.style.background = "red";
	this.style.position = "fixed"; 
	this.style.top = "0";
	this.style.left = "0";
	this.style.width = "100vw";
	this.style.height = "100vh";
	this.style.zIndex = "-1";
	this.style.pointerEvents = "none";
    }


    override preDestroy(): void {
    }
}


export default Visualizer; 
