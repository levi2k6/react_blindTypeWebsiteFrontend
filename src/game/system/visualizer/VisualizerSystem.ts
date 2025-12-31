class VisualizerSystem {
  private audio: HTMLAudioElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private audioCtx: AudioContext;
  private source: MediaElementAudioSourceNode;
  private analyser: AnalyserNode;
  private bufferLength: number;
  private dataArray: Uint8Array;

  private progress = 0; 
  private speed = 0.02;
  private isAppearing = false;
  private isDisappearing = false;
  private animating = false;

  constructor(audio: HTMLAudioElement, canvas: HTMLCanvasElement) {
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

  getAudioCtx() {
    return this.audioCtx;
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  startAppear() {
    this.isAppearing = true;
    this.isDisappearing = false;
    this.animating = true;
    this.progress = 0;
    this.animate();
  }

  startDisappear() {
    this.isDisappearing = true;
    this.isAppearing = false;
    this.animating = true;
  }

  animate = () => {
    if (!this.animating) return;

    requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.analyser.getByteTimeDomainData(this.dataArray);

    if (this.isAppearing) {
      this.progress += this.speed;
      if (this.progress >= 1) {
        this.progress = 1;
        this.isAppearing = false;
      }
    } else if (this.isDisappearing) {
      this.progress -= this.speed;
      if (this.progress <= 0) {
        this.progress = 0;
        this.isDisappearing = false;
        this.animating = false;
      }
    }

    this.drawWave(this.progress);
  };

  drawWave(progress: number) {
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "white";
    this.ctx.beginPath();

    const sliceWidth = this.canvas.width / this.bufferLength;
    let x = 0;

    const visibleLength = Math.floor(this.bufferLength * progress);

    for (let i = 0; i < visibleLength; i++) {
      const v = this.dataArray[i] / 128.0 - 1.0;
      const y = (v * this.canvas.height) / 2 + this.canvas.height / 2;

      if (i === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);

      x += sliceWidth;
    }

    this.ctx.stroke();
  }

  appear() {
    this.startAppear();
  }

  disappear() {
    this.startDisappear();
  }
}

export default VisualizerSystem;



