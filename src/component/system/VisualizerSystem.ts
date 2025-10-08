
class VisualizerSystem{

    private isDrawing = false;

    private audio: HTMLAudioElement;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private audioCtx: AudioContext;
    private source: MediaElementAudioSourceNode;
    private analyser: AnalyserNode;
    private bufferLength: number;
    private dataArray: Uint8Array;


    constructor(audio: HTMLAudioElement, canvas: HTMLCanvasElement){
	this.audio = audio;
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d")!;   
	this.audioCtx = new AudioContext();
	this.source = this.audioCtx.createMediaElementSource(this.audio);
	this.analyser = this.audioCtx.createAnalyser();

	this.source.connect(this.analyser);
	this.analyser.connect(this.audioCtx.destination);

	this.bufferLength = this.analyser.frequencyBinCount;
	this.dataArray = new Uint8Array(this.bufferLength);

	this.resize();
    }

    getAudioCtx(){
	return this.audioCtx;
    }
	
    resize(){
	console.log("resized");
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;
    }

    draw = () => {
	if(!this.isDrawing){
	    this.isDrawing = true;
	    this.animate();
	}
    }

    animate = () => {
	requestAnimationFrame(this.animate);

	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

	this.analyser.getByteTimeDomainData(this.dataArray);

	this.ctx.lineWidth = 2;
	this.ctx.strokeStyle = "#00ffcc";
	this.ctx.beginPath();

	const sliceWidth = this.canvas.width / this.bufferLength;
	let x = 0;

	for (let i = 0; i < this.bufferLength; i++) {
	    const v = this.dataArray[i] / 128.0 - 1.0;

	    const y = (v * this.canvas.height) / 2 + this.canvas.height / 2;

	    if (i === 0) this.ctx.moveTo(x, y);
	    else this.ctx.lineTo(x, y);

	    x += sliceWidth;
	}

	this.ctx.stroke();
    };

}




export default VisualizerSystem;
