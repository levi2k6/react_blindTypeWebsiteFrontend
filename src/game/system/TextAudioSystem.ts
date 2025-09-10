import type TextAudio from "../component/TextAudio";


class TextAudioSystem{

    private textAudio: TextAudio; 
    private dingPath: string = "/ding.mp3";
    private wrongPath: string = "/wrong.wav";

    constructor(textAudio: TextAudio){
	this.textAudio = textAudio;
	this.init();
    }

    init(){
	this.textAudio.audioDing.src = this.dingPath;
	this.textAudio.audioDing.load();

	this.textAudio.audioWrong.src = this.wrongPath;
	this.textAudio.audioWrong.load()
    }

    addAudioSource(audioName: string, type: string){
	this.textAudio.audio.muted = false;

	const url  = `http://localhost:8080/Audio/${type}/${audioName}`;
	console.log("url: ", url);

	this.textAudio.audio.src = url; 
	this.textAudio.audio.load();
	this.textAudio.audio.play();
    }

    ding(){
	this.textAudio.audioDing.play();
    }

    wrong(){
	this.textAudio.audioWrong.play();
    }


} 

export default TextAudioSystem;
