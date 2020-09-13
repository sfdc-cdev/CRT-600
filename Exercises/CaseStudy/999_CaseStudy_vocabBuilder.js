/***** NOTE: The case study isn't core to studying for the exam *****/

//working with modules
import { initialDataURL, TermDictionary } from "./999_CaseStudy_vocabBuilderModule.js";

const myDictionary = new TermDictionary();

function filterRows() {
	const filterText = document.querySelector("input[name='filter']").value;
	if (filterText.length) {
		let filteredTerms = myDictionary.terms.filter((obj) => obj.term.toLowerCase().indexOf(filterText.toLowerCase()) != -1);
		document.querySelector("tbody").innerHTML = "";
		drawRows(filteredTerms);
	} else {
		console.log("no terms, lets draw original terms", myDictionary.terms);
		document.querySelector("tbody").innerHTML = "";
		drawRows(myDictionary.terms);
	}
}

function deleteAllRowsFromDOM() {
	document.querySelector("tbody").innerHTML = "";
}

function drawOneRow(term) {
	const newRow = getRow(term);
	document.querySelector("tbody").insertAdjacentElement("beforeend", newRow);
}

function drawRows(someTerms) {
	someTerms.forEach((term) => drawOneRow(term));
}

function getRow(term) {
	const tr = document.createElement("tr");
	tr.setAttribute("aria-selected", "false");
	tr.setAttribute("class", "slds-hint-parent");
	tr.setAttribute("data-term-id", term.id);

	//IMPORTANT!!! in production code, the term and definition should be sanitized to avoid XSS.
	tr.innerHTML = `<td class='slds-text-align_right' role='gridcell' tabindex='0'>
    <button class='slds-button slds-button_destructive'>X</button>
    </td>
    <th scope='row'>
        <div class='slds-truncate term' title='${term.term}'>
            ${term.term}
        </div>
    </th>
    <td role='gridcell'>
        <div class='definition' title='${term.definition}'>${term.definition}</div>
    </td>`;
	return tr;
}

function displayLocalStorage() {
	let displayValue = "Local storage is currently empty.";

	const savedTerms = localStorage.getItem("savedTermData");
	if (savedTerms && savedTerms.length > 2) {
		displayValue = savedTerms;
	}
	document.querySelector("textarea[name='localStorageTerms']").value = displayValue;
}

function initApp() {
	document.querySelector("textarea[name='dataUrl']").value = initialDataURL;

	//programatically reset the form fields in "Add a Term"
	document.querySelector("button.cancel").addEventListener("click", (event) => {
		event.currentTarget.closest("form").reset();
	});

	// delegated event listener: no need to assign click handler to every single delete button.
	document.querySelector("tbody").addEventListener("click", (event) => {
		if (event.target.tagName.toLowerCase() === "button") {
			const tr = event.target.closest("tr");
			const idToDelete = tr.getAttribute("data-term-id");
			myDictionary.removeTerm(idToDelete);
			tr.remove();
		}
	});

	document.querySelector("button.save").addEventListener("click", (event) => {
		const term = document.querySelector("input[name='term']").value;
		const definition = document.querySelector("textarea[name='definition']").value;

		if (!term.trim().length || !definition.trim().length) {
			alert("Please enter a term and a description");
		} else {
			const newTerm = myDictionary.addTerm(term, definition);
			drawOneRow(newTerm);
			event.currentTarget.closest("form").reset();
		}
	});

	const btnLoadFromURL = document.querySelector("button[name='loadFromURL']");
	btnLoadFromURL.addEventListener("click", function () {
		const dataUrl = document.querySelector("textarea[name='dataUrl']").value;
		fetch(dataUrl)
			.then((response) => response.json())
			.then((data) => {
				myDictionary.removeAllTerms();
				deleteAllRowsFromDOM();
				console.log(data);
				data.forEach((d) => {
					const t = myDictionary.addTerm(d.term, d.definition);
					drawOneRow(t);
				});
				//btnLoadFromURL.setAttribute('disabled','disabled');
			})
			.catch((error) => {
				alert(error);
			});
	});

	document.querySelector("button[name='loadLocalStorage']").addEventListener("click", function () {
		console.log("load terms from local storage");
		const savedTerms = localStorage.getItem("savedTermData");
		if (savedTerms) {
			deleteAllRowsFromDOM();
			myDictionary.terms = JSON.parse(savedTerms);
			console.log("savedTerms is ", myDictionary.terms);
			drawRows(myDictionary.terms);
		} else {
			alert("No terms found in local storage");
		}
	});

	document.querySelector("button[name='clearLocalStorage']").addEventListener("click", function () {
		localStorage.removeItem("savedTermData");
		displayLocalStorage();
		alert("local storage cleared");
	});

	document.querySelector("button[name='saveLocalStorage']").addEventListener("click", function () {
		localStorage.setItem("savedTermData", JSON.stringify(myDictionary.terms));
		displayLocalStorage();
		alert(myDictionary.terms.length + " terms saved to local storage");
	});

	document.querySelector("input[name='filter']").addEventListener("keyup", function () {
		filterRows();
	});

	displayLocalStorage();
}

document.addEventListener("DOMContentLoaded", initApp);
