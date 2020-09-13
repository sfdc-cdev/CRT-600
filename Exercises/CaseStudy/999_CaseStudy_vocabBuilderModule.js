/***** NOTE: The case study isn't core to studying for the exam *****/

const initialDataURL = "https://raw.githubusercontent.com/sfdc-cdev/CRT-600/master/assetsExercises/sampleData.json";

// idFactory demonstrates closures
// also, idFactory is private because it's never exported.
function idFactory(initialID) {
	let termID = initialID;
	function getNextID() {
		termID++;
		return termID;
	}
	return getNextID;
}
let getNextTermID = idFactory(0);

//note that this class is private as it isn't exported
class Term {
	constructor(term, definition) {
		this.term = term;
		this.definition = definition;
		this.id = getNextTermID();
	}
}

class TermDictionary {
	constructor() {
		this.terms = [];
	}
	removeAllTerms() {
		this.terms = [];
	}
	removeTerm(id) {
		this.terms = this.terms.filter((obj) => obj.id != id);
	}
	addTerm(term, definition) {
		const newTerm = new Term(term, definition);
		this.terms.push(newTerm);
		return newTerm;
	}
}

export { initialDataURL, TermDictionary };
