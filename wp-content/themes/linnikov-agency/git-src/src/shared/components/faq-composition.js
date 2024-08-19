import { getTargetElem } from "../scripts/utils.js";
import { Disclosure } from "./disclosure.js";
class CompositItem {
	constructor(owner, root, order) {
		this.order = order;
		this.owner = owner;
		this.dom = { root };
		this.dom.disclosure = root.querySelector(`[data-elem*="faq-composit-item.disclosure"]`);
		this.disclosure = new Disclosure(this.dom.disclosure);
		this.addListeners();
	}
	addListeners() {
		this.dom.root.addEventListener("disclosure.open", ({ detail: { reason } }) => this.onOpen(reason));
		this.dom.root.addEventListener("disclosure.close", ({ detail: { reason } }) => this.onClose(reason));
	}
	close(reason) {
		this.disclosure.close(reason);
	}
	onOpen(reason) {
		this.bcrBeforeOpen = this.dom.root.getBoundingClientRect();
		this.owner.onItemOpen(this, reason);
	}
	onClose(reason) {
		this.owner.onItemClose(this, reason);
	}
}
export class FaqComposition {
	activeItem = null;
	constructor(target) {
		this.dom = { root: getTargetElem(target) };
		this.dom.inner = this.dom.root.querySelector(`[data-elem*="faq-composit.inner"]`);
		this.items = Array.from(this.dom.root.querySelectorAll(`[data-component*="faq-composit-item"]`)).map((elem, idx) => new CompositItem(this, elem, idx));
		
	}
	onItemOpen(item, reason) {
		const self = this;
		if (item === this.activeItem) return;
		if (window.app.state.isMobile) {
			const openItemHeight = item.dom.root.offsetHeight + item.disclosure.dom.inner.offsetHeight;
			const offset = Math.min((window.innerHeight - openItemHeight) / -2, -50) - calcOffsetCompensation();
			window.lenis?.scrollTo(item.dom.root, { offset });
		}
		this.activeItem?.close("other-item-open");
		this.activeItem = item;
		function calcOffsetCompensation() {
			if (!(self.activeItem instanceof CompositItem) || self.activeItem.order > item.order) return 0;
			return self.activeItem.disclosure.dom.inner.offsetHeight;
		}
	}
	onItemClose(item, reason) {
		if (window.app.state.isMobile && reason === "trigger-click") {
			window.lenis?.scrollTo(item.dom.root, { offset: -item.bcrBeforeOpen.top });
		}
		if (item === this.activeItem) {
			this.activeItem = null;
		};
	}
}