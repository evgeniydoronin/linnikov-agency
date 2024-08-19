import { throttle } from "../scripts/patterns/throttle.js";
import { log } from "../scripts/logger.js";
import { getTargetElem } from "../scripts/utils.js";

const createObserver = () => {
	const mapByInner = new Map();
	const handleResize = (entries) => {
		entries.forEach(({ target }) => {
			const targetBcr = target.getBoundingClientRect();
			mapByInner.get(target).updateInnerHeightStyle(targetBcr.height);
		});
	};
	const resizeObserver = new ResizeObserver(throttle(handleResize, 10));
	return {
		observe: (instance, inner) => {
			mapByInner.set(inner, instance);
			resizeObserver.observe(inner);
		}
	}
}
const resizeObserver = createObserver();

export class Disclosure {
	constructor(target) {
		this.dom = { root: getTargetElem(target) };
		this.dom.inner = this.dom.root.querySelector(`[data-elem*="disclosure.inner"]`);
		this.dom.toggleBtns = Array.from(this.dom.root.querySelectorAll(`[data-elem*="disclosure.toggle-btn"]`));
		if (this.dom.root.matches(`[data-elem*="disclosure.toggle-btn"]`)) {
			this.dom.toggleBtns.push(this.dom.root);
		}
		this.dom.toggleBtns.forEach(elem => elem.addEventListener("click", () => this.toggle(undefined, "trigger-click")));
		resizeObserver.observe(this, this.dom.inner);
	}
	updateInnerHeightStyle(value) {
		this.dom.root.style.setProperty("--inner-height", `${value}px`);
	}
	toggle(next, reason) {
		if (next !== undefined && next !== null) {
			next ? this.open(reason) : this.close(reason);
		} else {
			this.dom.root.classList.contains("open") ? this.close(reason) : this.open(reason);
		}
	}
	open(reason) {
		this.dom.root.classList.add("open");
		this.dom.toggleBtns.forEach(elem => elem.classList.add("active"));
		this.dom.root.dispatchEvent(new CustomEvent("disclosure.open", { detail: { self: this, reason }, bubbles: true }));
	}
	close(reason) {
		this.dom.root.classList.remove("open");
		this.dom.toggleBtns.forEach(elem => elem.classList.remove("active"));
		this.dom.root.dispatchEvent(new CustomEvent("disclosure.close", { detail: { self: this, reason }, bubbles: true }));
	}
}
export default function initDisclosures() {
		log("[initDisclosures]");
	const elems = document.querySelectorAll("[data-component=disclosure]");
	elems.forEach((elem) => new Disclosure(elem));
}