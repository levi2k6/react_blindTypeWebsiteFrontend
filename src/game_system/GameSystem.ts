import Letter from "./Letter";
import input from "./Input";
import textHolder from "../components/game/GameTextHolder";
import game from "../routes/game";

class GameSystem{

    private letters: Array<Letter> = [];
    i: number = 0;


    init(text: string){
	for(let i = 0; i < text.length; i++){
	    this.letters.push( (new Letter(text[i].toLowerCase())) );
	}
    }

    getLetters(){
	return this.letters;
    }

    game(playerInput: string){
	let letter = this.letters[this.i];
	console.log("letter ", "[", letter.getChar , "]");
	if(letter.getChar === playerInput){
	    letter.turnGreen();
	    console.log("correct!");
	    this.i += 1;
	}else{
	    if(letter.getChar === " "){
		console.log("trigger");
		letter.turnBackgroundRed();
	    }else{
		letter.turnRed();
	    }
	    console.log("wrong");
	    this.i += 1;
	}

	if(this.i == this.letters.length){
	    console.log("game finished");
	    this.letters = [];
	    textHolder.removeLetters();
	    input.turnOffInput();
	    this.i = 0;
	    game.startButton.disabled = false;
	}
    }

} 

const gameSystem = new GameSystem();

export default gameSystem;
