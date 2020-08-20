class Term {
	constructor(term, definition) {
		this.term = term;
		this.definition = definition;
	}
	print() {
		console.log(`${this.term}: ${this.definition}`);
	}
}
export default Term;
