
class LetterChallengeGenerator{
    challenge: string = "";

    duplicateChanceValues: Array<{value: number; weight: number}> = [
	{value: 1, weight: 20},
	{value: 2, weight: 30},
	{value: 1, weight: 50}
    ];

    setDuplicateChance(duplicateChanceValues: Array<{value: number; weight: number}>){
	const totalWeight = duplicateChanceValues.reduce((sum, duplicateChanceValue) => sum + duplicateChanceValue.weight, 0);
	let r = Math.random() * totalWeight;

	for (const duplicateChanceValue of duplicateChanceValues {
	if (r < duplicateChanceValue.weight) return duplicateChanceValue.value;
	r -= duplicateChanceValue.weight;
	}

	return duplicateChanceValue[duplicateChanceValues.weights.length - 1].value;

    }

    generateLetter(difficulty: string){
	const code = Math.floor(Math.random() * 20) + 97;
	return String.fromCharCode(code);
    } 

    generateLetters(difficulty: string, multiple: number){
	const 
	for(let i = 0; i < multiple; i++){
	    for(let i = 0; i < duplicateChance)
	    this.challenge += this.generateLetter(difficulty);
	}
	console.log("generateLetters(): ", this.challenge);
    }

}

export default LetterChallengeGenerator;
