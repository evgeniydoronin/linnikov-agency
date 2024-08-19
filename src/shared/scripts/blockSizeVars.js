import { throttleByKey } from "./patterns/throttle.js";
import { getTargetElem, isHtmlElem } from "./utils.js";

const stack = new Map();
const setVars = (elem, prefix, width, height, withUnit) => {
	elem.style.setProperty(`--${prefix}block-width`, width + (withUnit && "px" || ""));
	elem.style.setProperty(`--${prefix}block-height`, height + (withUnit && "px" || ""));
};
const handleResize = throttleByKey((target) => {
	if (!stack.has(target)) return;
	const { elem, prefix, container, withUnit } = stack.get(target);
	const holder = isHtmlElem(container) ? container : elem;
	setVars(holder, prefix, elem.clientWidth, elem.clientHeight, withUnit);
}, 100);
const observer = new ResizeObserver((entries) => {
	entries.forEach(({ target }) => {
		handleResize(target, target);
	});
});
const registerElem = (elem, { prefix, container, withUnit } = {}) => {
	const normalizedPrefix = prefix ? `${prefix}-` : "";
	stack.set(elem, {
		elem,
		prefix: normalizedPrefix,
		container: getTargetElem(container),
		withUnit
	});
	observer.observe(elem);
}
export const setBlockSizeVars = (target, options) => {
	if (typeof target === "string") {
		const elems = document.querySelectorAll(target);
		elems.forEach(elem => registerElem(elem, options));
	} else {
		registerElem(target, options);
	}
};