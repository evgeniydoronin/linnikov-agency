import { getTargetElem } from "../scripts/utils.js";
gsap.registerPlugin(Flip);

export class HoverablesGroup {
	afterLeaveTimeout = null;
	constructor(targer) {
		this.dom = { root: getTargetElem(targer) };
		this.dom.inner = this.dom.root.querySelector("[data-elem=inner]");
		this.createIndicator();
		if (!matchMedia("(any-hover: hover)").matches) return;
		this.dom.items = Array.from(this.dom.inner.children);
		this.dom.items.forEach(elem => {
			elem.classList.add("hoverable");
			elem.addEventListener(`${app.state.pointerType}enter`, ({ target }) => this.onEnter(target));
			//elem.addEventListener(`${app.state.pointerType}leave`, ({ target }) => this.onLeave(target));
		});
	}
	onEnter(elem) {
		if (this.afterLeaveTimeout !== null) this.clearTimeout();
		const state = Flip.getState(this.dom.indicator);
		elem.append(this.dom.indicator);
		Flip.from(state, {
			duration: 0.4,
		});
	}
	clearTimeout() {
		clearTimeout(this.afterLeaveTimeout);
		this.afterLeaveTimeout = null;
	}
	onLeave() {
		this.afterLeaveTimeout = setTimeout(() => {
			this.afterLeaveTimeout = null;
			const state = Flip.getState(this.dom.indicator);
			this.dom.root.append(this.dom.indicator);
			Flip.from(state, {
				duration: 0.4,
			});
		}, 300);
	}
	createIndicator() {
		this.dom.indicator = document.createElement("div");
		this.dom.indicator.classList.add("hover-indicator");
		this.dom.indicator.innerHTML = `<span class="icon-cubic-plus"></span><span class="icon-cubic-plus"></span><span class="icon-cubic-plus"></span><span class="icon-cubic-plus"></span>`;
		this.dom.root.append(this.dom.indicator);
	}
}