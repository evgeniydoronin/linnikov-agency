import { getTargetElem } from "../scripts/utils.js";

export class SplitText {
	constructor(target, mode = "chars") {
		const targetElem = getTargetElem(target);
		targetElem.childNodes.forEach((node, idx) => {
			if (node.nodeType !== Node.TEXT_NODE) return;
			const text = node.nodeValue;
			const chars = text.split("");
			const container = document.createElement("div");
			container.classList.add("split-text");
			chars.forEach(char => {
				const charElem = document.createElement("div");
				charElem.classList.add("detached-char");
				charElem.textContent = char;
				container.appendChild(charElem);
			});
			targetElem.replaceChild(container, node);
		});
	}
}