import Term from "./380_Module_default.js";
class TermDictionary {
	constructor() {
		this.terms = [];
	}
	addTerm(term, definition) {
		const newTerm = new Term(term, definition);
		this.terms.push(newTerm);
		return newTerm;
	}
	printTerms() {
		this.terms.forEach((t) => t.print());
	}
}

export { TermDictionary };
