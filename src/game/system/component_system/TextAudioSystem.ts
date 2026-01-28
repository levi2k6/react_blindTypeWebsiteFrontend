import { ChallengeType } from "../../../utils/enums/ChallengeTypeEnum";
import { backendUrl } from "../../../utils/globals/UrlState";
import TextAudio from "../../component/TextAudio";

class TextAudioSystem{

    private textAudio: TextAudio; 
    private dingPath: string = "/ding.mp3";
    private wrongPath: string = "/wrong.wav";

    public constructor(textAudio: TextAudio){
	this.textAudio = textAudio;
    }

    init(){
	const audioDing = this.textAudio.getChildSelf("audioDing") as HTMLAudioElement;
	audioDing.src = this.dingPath;
	audioDing.load();

	const audioWrong = this.textAudio.getChildSelf("audioWrong") as HTMLAudioElement;
	audioWrong.src = this.wrongPath;
	audioWrong.load();
    }

    addAudioSource(audioName: string, type: ChallengeType){
	const audio = this.textAudio.getChildSelf("audio") as HTMLAudioElement;
	audio.muted = false;

	const typeString = ChallengeType[type].toLowerCase();
	let url;
	url  = backendUrl + `/audio/${typeString}/${audioName}`;

	audio.src = url; 
	audio.load();
	audio.play();
    }

    stopAudio(){
	const audio = this.textAudio.getChildSelf("audio") as HTMLAudioElement;
	audio.pause();
	audio.currentTime = 0;
    }

    ding(){
	const audioDing = this.textAudio.getChildSelf("audioDing") as HTMLAudioElement;
	audioDing.play();
    }

    wrong(){
	const audioWrong = this.textAudio.getChildSelf("audioWrong") as HTMLAudioElement;
	audioWrong.play();
    }

} 

export default TextAudioSystem;
