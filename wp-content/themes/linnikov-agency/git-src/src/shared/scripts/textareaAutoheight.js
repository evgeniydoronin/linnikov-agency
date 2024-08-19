import { throttle } from "./patterns/throttle.js";

const updateMinHeight = throttle((target) => {
	requestAnimationFrame(() => {
		target.style.minHeight = "0px";
		target.style.minHeight = `${target.scrollHeight}px`;
	});
}, 50);
const resizeObserver = new ResizeObserver((entries) => {
	entries.forEach(({ target }) => updateMinHeight(target));
});

export default function initTextareaAutoheight() {
	const elems = document.querySelectorAll(`textarea[data-autoheight="true"]`);
	const changeHandler = (event) => updateMinHeight(event.target);
	elems.forEach(elem => {
		resizeObserver.observe(elem);
		elem.addEventListener("input", changeHandler);
		elem.addEventListener("change", changeHandler);
	});
}