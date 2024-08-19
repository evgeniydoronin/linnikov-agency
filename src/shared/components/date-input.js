import { getTargetElem } from "../scripts/utils.js";

export class DateInputWrap {
	constructor(target) {
		this.dom = { root: getTargetElem(target) };
		this.dom.input = this.dom.root.querySelector("input");
		this.bindEventHandlers();
		this.onChange();
	}
	bindEventHandlers() {
		this.dom.input.onfocus = function() { this.showPicker() };
		this.dom.input.onchange = () => this.onChange();
	}
	onChange() {
		this.dom.root.classList.toggle(`_has-value`, this.dom.input.value);
	}
}
export function initDateInputWraps() {
	document.querySelectorAll(`[data-component="date-input-wrap"]`).forEach(elem => {
		new DateInputWrap(elem);
	});
}