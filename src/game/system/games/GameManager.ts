import type Game from "./Game";

class GameManager{

    private games = new Map<string, Game>;

    public addGame(game: Game){
	this.games.set(game.getName(), game);
    }

    public getGame(){
    }

}
export default GameManager; 
