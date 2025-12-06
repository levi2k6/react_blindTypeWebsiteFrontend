import Component2 from "../../class/Component2";
import  Element from "../../class/Element";
import VisualizerSystem from "../system/visualizer/VisualizerSystem";

class Visualizer extends Component2{

    audio: HTMLAudioElement;

    private visualizerSystem: VisualizerSystem;

    constructor(audio: HTMLAudioElement){
	const element: HTMLElement = new Element("canvas", "Visualizer").self; 
	super(element, "Visualizer");
	this.audio = audio;
	this.visualizerSystem = new VisualizerSystem(this.audio, this.self as HTMLCanvasElement); 
    }

    get system(){
	return this.visualizerSystem;
    } 

    override structureElements(): Array<Component2> {
	return[
	]
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

}


export default Visualizer; 
