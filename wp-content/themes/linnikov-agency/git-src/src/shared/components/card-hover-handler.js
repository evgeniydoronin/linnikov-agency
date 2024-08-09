import { getTargetElem } from "../scripts/utils.js";
import { throttle } from "../scripts/patterns/throttle.js";

export default class CardHoverHandler {
	constructor({ container, targetSelector }) {
		this.targetSelector = targetSelector;
		this.container = getTargetElem(container);
		this.container.addEventListener(`${app.state.pointerType}move`, this.pointerMoveHandler);
	}
	pointerMoveHandler = throttle(({ target, clientX, clientY }) => {
		const cardElem = target.matches(this.targetSelector) ? target : target.closest(this.targetSelector);
		if (!cardElem) return;
		const cardBcr = cardElem.getBoundingClientRect();
		const left = Math.max(0, clientX - cardBcr.left); 
		const top = Math.max(0, clientY - cardBcr.top);
		cardElem.style.setProperty("--pointer-left", `${left}px`);
		cardElem.style.setProperty("--pointer-top", `${top}px`);
	}, 20);
}