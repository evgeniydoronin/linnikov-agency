import { getTargetElem, getTargetNode } from "../scripts/utils.js";

export class RevealWrap {
	constructor(target) {
		this.dom = { root: getTargetNode(target) };
		this.dom.root.classList.add("reveal-wrap");

		gsap.set(this.dom.root, {clearProps: "display"});

		this.dom.inner = document.createElement("div");
		this.dom.inner.classList.add("reveal-wrap__inner");
		this.dom.item = document.createElement("div");
		this.dom.item.classList.add("reveal-wrap__item");
		this.dom.inner.append(this.dom.item);
		this.dom.item.append(...this.dom.root.childNodes);
		this.dom.root.append(this.dom.inner);
		this.dom.root.registerModule("revealWrap", this);
	}
}
export function applyRevealWrapsToScope(scope) {
	const scopeElem = getTargetElem(scope);
	if (!scopeElem) return;
	const roots = scopeElem.querySelectorAll(`[data-will-reveal="true"]`);
	roots.forEach(root => applyRevealWraps(root));
}
export function applyRevealWraps(target) {
	const targetElem = getTargetElem(target);

	Array.from(targetElem.children).forEach(node => node.tagName !== "BR" && new RevealWrap(node));
}