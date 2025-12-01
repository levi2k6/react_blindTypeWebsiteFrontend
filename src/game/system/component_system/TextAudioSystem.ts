import { ChallengeType } from "../../../utils/enums/ChallengeTypeEnum";
import TextAudio from "../../component/TextAudio";

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

    addAudioSource(audioName: string, type: ChallengeType){
	this.textAudio.audio.muted = false;

	const typeString = ChallengeType[type].toLowerCase();
	let url;
	url  = `http://localhost:8080/api/v1/public/audio/${typeString}/${audioName}`;

	this.textAudio.audio.src = url; 
	this.textAudio.audio.load();
	this.textAudio.audio.play();
    }

    stopAudio(){
	this.textAudio.audio.pause();
	this.textAudio.audio.currentTime = 0;
    }

    ding(){
	this.textAudio.audioDing.play();
    }

    wrong(){
	this.textAudio.audioWrong.play();
    }


} 

export default TextAudioSystem;
