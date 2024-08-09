import { getTargetElem } from "../scripts/utils.js";

export class BeforeAfterSlider {
	anyHover = matchMedia("(any-hover: hover)").matches;
	constructor(target) {
		this.dom = { root: getTargetElem(target) };
		this.dom.thumb = this.dom.root.querySelector("[data-elem=thumb]");	
		if (!this.anyHover) {
			this.dom.root.addEventListener(`${app.state.pointerType}down`, () => this.onPointerDown());
			this.dom.root.addEventListener(`${app.state.pointerType}up`, () => this.onPointerUp());
		} else {
			this.dom.root.addEventListener(`${app.state.pointerType}move`, this.onPointerMove);
		}
	}
	onPointerDown() {
		this.dom.root.addEventListener(`${app.state.pointerType}move`, this.onPointerMove);
	}
	onPointerUp() {
		this.dom.root.removeEventListener(`${app.state.pointerType}move`, this.onPointerMove);
	}
	onPointerMove = ({ clientX, buttons }) => {
		if (!this.anyHover && 1 & buttons !== 1) return this.onPointerUp();
		const rootBcr = this.dom.root.getBoundingClientRect();
		this.dom.root.style.setProperty("--position", ((clientX - rootBcr.left) / rootBcr.width).clamp(0.005, 0.995));
	}
}
export function initBeforeAfterSliders() {
	document.querySelectorAll("[data-component=before-after-slider]").forEach(elem => new BeforeAfterSlider(elem));
}