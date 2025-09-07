class TextReader{

    readText(text: string){
	console.log("reading right now");
	const utterance = new SpeechSynthesisUtterance(text);
	utterance.lang = "en-US";
	utterance.rate = 1;
	utterance.pitch = 1;
	window.speechSynthesis.speak(utterance);
    }

}

const textReader = new TextReader();

export default textReader;
