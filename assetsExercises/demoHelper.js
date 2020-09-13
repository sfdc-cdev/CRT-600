//initialize code mirror on the page
let addNavigation = function () {
	let select = document.createElement("select");
	select.setAttribute("class", "demoSelector");
	let options = [
		"Lesson1_Intro/100_Introduction.html",
		"Lesson2_Basics/200_CoercionAndCasting.html",
		"Lesson2_Basics/210_Scope.html",
		"Lesson2_Basics/220_Const.html",
		"Lesson2_Basics/230_WorkWithStrings.html",
		"Lesson2_Basics/240_WorkWithDates.html",
		"Lesson2_Basics/250_Loops.html",
		"Lesson2_Basics/260_WorkWithJSON.html",
		"Lesson3_ObjFuncClass/300_ObjectCreation.html",
		"Lesson3_ObjFuncClass/310_Prototypes.html",
		"Lesson3_ObjFuncClass/320_ValueAndReference.html",
		"Lesson3_ObjFuncClass/330_ObjectMethods.html",
		"Lesson3_ObjFuncClass/340_FunctionBasics.html",
		"Lesson3_ObjFuncClass/350_ArrayManipulation.html",
		"Lesson3_ObjFuncClass/360_Sort.html",
		"Lesson3_ObjFuncClass/361_MapFilter.html",
		"Lesson3_ObjFuncClass/362_Reduce.html",
		"Lesson3_ObjFuncClass/370_Classes.html",
		"Lesson3_ObjFuncClass/380_Modules.html",
		"Lesson4_Browser/400_Window.html",
		"Lesson4_Browser/410_EventHandlers.html",
		"Lesson4_Browser/420_EventsAndProps.html",
		"Lesson4_Browser/430_EventDelegation.html",
		"Lesson4_Browser/440_CustomEvents.html",
		"Lesson4_Browser/450_CookiesAndLocalStorage.html",
		"Lesson5_Debugging/500_WorkWithConsole.html",
		"Lesson6_Async/600_Promises.html",
		"Lesson6_Async/610_AsyncAwait.html",
		"CaseStudy/999_CaseStudy_vocabBuilder.html",
	];

	let s = '<option value="">Select a Demo</option>';
	options.forEach(function (item) {
		let location = `Exercises/${item}`;
		let label = item.replace(".html", "").split("/")[1];
		let isSelected = window.location.href.includes(label) ? "selected" : "";
		s += `<option value='${location}' ${isSelected} >${label}</option>`;
	});

	select.innerHTML = s;

	let div = document.createElement("div");
	div.setAttribute("align", "center");
	div.setAttribute("class", "slds-m-top_x-small");
	div.insertAdjacentElement("afterbegin", select);

	let prefix = window.location.href.includes("CRT-JS") ? "/CRT-JS" : "";
	select.addEventListener("change", (event) => (window.location = prefix + "/" + event.target.value));

	document.querySelector("body").insertAdjacentElement("afterbegin", document.createElement("br"));
	document.querySelector("body").insertAdjacentElement("afterbegin", div);

	//inject the demo stylesheet and lightning design system for all files other than the vocab builder
	if (!window.location.href.includes("vocabBuilder")) {
		let slds = document.createElement("link");
		slds.type = "text/css";
		slds.rel = "stylesheet";
		slds.href = "../../_lightningDesignSystem/styles/salesforce-lightning-design-system.css";
		document.head.appendChild(slds);

		let helperStyles = document.createElement("link");
		helperStyles.type = "text/css";
		helperStyles.rel = "stylesheet";
		helperStyles.href = "../../assetsExercises/demoHelper.css";
		document.head.appendChild(helperStyles);
	}
};

document.addEventListener("DOMContentLoaded", addNavigation);
