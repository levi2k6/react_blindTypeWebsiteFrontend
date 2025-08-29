import Letter from "./Letter";
import input from "./Input";
import textHolder from "../components/game/GameTextHolder";
import game from "../routes/game";

class GameSystem{

    private letters: Array<Letter> = [];
    i: number = 0;

    init(){
	for(let i = 0; i < 10; i++){
	    this.letters.push(new Letter());
	    console.log(this.letters[i].self.innerText);
	}
    }

    getLetters(){
	return this.letters;
    }

    game(playerInput: string){
	let letter = this.letters[this.i];
	console.log("letter ", letter.self.innerText);
	if(letter.self.innerText == playerInput){
	    letter.turnGreen();
	    console.log("correct!");
	    this.i += 1;
	}else{
	    letter.turnRed();
	    console.log("wrong");
	    this.i += 1;
	}

	if(this.i == this.letters.length){
	    console.log("game finished");
	    this.letters = [];
	    textHolder.removeLetters();
	    input.turnOffInput();
	    this.i = 0;
	    game.startButton.disabled = ;
	}
    }

} 

const gameSystem = new GameSystem();

export default gameSystem;
