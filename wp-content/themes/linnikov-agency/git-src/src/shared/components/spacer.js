import { getTargetElem } from "../scripts/utils.js";
export default class Spacer {
	active = false;
	afr = null;
	constructor(target) {
		this.targetElem = getTargetElem(target);
		this.observer = new ResizeObserver((entries) => this.handleResize(entries));
		this.spacer = this.targetElem.cloneNode();
		this.spacer.removeAttribute("id");
		this.spacer.classList.add("spacer");
		this.handleResize();
	}
	handleResize(entries) {
		if (this.afr !== null) cancelAnimationFrame(afr);
		this.afr = requestAnimationFrame(() => {
			this.targetElem.style.setProperty("--origin-width", `${this.active ? this.spacer.clientWidth : this.targetElem.clientWidth}px`);
			this.spacer.style.setProperty("--spacer-height", `${this.targetElem.clientHeight}px`);
			this.afr = null;
		});
	}
	getTargetElem() {
		return this.targetElem;
	}
	replace() {
		if (this.active) return;
		this.active = true;
		this.targetElem.classList.add("seized");
		this.targetElem.replaceWith(this.spacer);
		this.observer.observe(this.spacer);
		this.observer.observe(this.targetElem);
		return this.targetElem;
	}
	wrap() {
		if (this.active) return;
		this.replace();
		this.spacer.append(this.targetElem);
	}
	restore() {
		this.active = false;
		this.targetElem.classList.remove("seized");
		this.spacer.replaceWith(this.targetElem);
		this.observer.disconnect();
		return this.targetElem;
	}
}