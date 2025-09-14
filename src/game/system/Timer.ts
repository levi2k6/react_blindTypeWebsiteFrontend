

class Timer{
    length: number = 3;
    timeId: number = 0;

    loseFunction: Function = ()=>{};

    initLoseState(loseFunction: Function){
	this.loseFunction = loseFunction;
    }
    startTimer(){
	this.stopTimer();
	this.timeId = setTimeout(this.loseFunction, this.length * 1000);
    }

    stopTimer(){
	clearTimeout(this.timeId);
    }

}

export default Timer;

