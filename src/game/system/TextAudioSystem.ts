import type TextAudio from "../component/TextAudio";

class TextAudioSystem{

    private textAudio: TextAudio; 

    constructor(textAudio: TextAudio){
	this.textAudio = textAudio;
    }

    addAudioSource(audioName: string, type: string){
	this.textAudio.audio.muted = false;

	const url  = `http://localhost:8080/Audio/${type}/${audioName}`;
	console.log("url: ", url);

	this.textAudio.audio.src = url; 
	this.textAudio.audio.load();
	this.textAudio.audio.play();
    }

    playAudioSource(){
	this.textAudio.audio.play();
    }

} 

export default TextAudioSystem;
