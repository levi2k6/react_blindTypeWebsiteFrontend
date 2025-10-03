
class LetterChallengeGenerator{
    private challenge: string = "";

    private duplicateChances: Array<{value: number; weight: number}> = [
	{value: 1, weight: 20},
	{value: 2, weight: 30},
	{value: 1, weight: 50}
    ];

    getDuplicateChance(){
	const totalWeight = this.duplicateChances.reduce((sum, duplicateChance) => sum + duplicateChance.weight, 0);
	let r = Math.random() * totalWeight;

	for (const duplicateChance of this.duplicateChances){
	    if (r < duplicateChance.weight) return duplicateChance.value;
		r -= duplicateChance.weight;
	    }

	return this.duplicateChances[this.duplicateChances.length - 1].value;

    }

    generateLetter(){
	const code = Math.floor(Math.random() * 20) + 97;
	return String.fromCharCode(code);
    } 

    generateLetters(multiple: number){
	for(let i = 0; i < multiple; i++){
	    const duplicateChance = this.getDuplicateChance(); 
	    const duplicateLetter = this.generateLetter();
	    for(let i = 0; i < duplicateChance; i++){
		this.challenge += duplicateLetter; 
	    }
	    this.challenge += this.generateLetter();
	}
	console.log("generateLetters(): ", this.challenge);
    }

    getChallenge(){
	return this.challenge;
    }
    setChallenge(challenge: string){
	this.challenge = challenge;
    }

}

export default LetterChallengeGenerator;
