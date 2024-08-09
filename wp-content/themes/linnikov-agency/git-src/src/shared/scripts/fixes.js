import { detectPointerEvents } from "./utils.js";

export const fixClickEvent = () => {
	let lastPointerDown = null;
	const source = detectPointerEvents.hasApi ? "pointer" : "mouse";
	document.documentElement.addEventListener(`${source}down`, (e) => {
		lastPointerDown = e;
	});
	document.documentElement.addEventListener(`${source}up`, (e) => {
		if (lastPointerDown.target !== e.target) {
			stopNextDocumentClick();
		}
	});
	function stopNextDocumentClick() {
		document.documentElement.addEventListener("click", (e) => {
			e.stopImmediatePropagation();
		}, { once: true });
	}
}