const iconsMapping = {
	"fancybox-open": "icon-lightbox-open",
	"fancybox-close": "icon-lightbox-close",
	"fancybox-prev": "icon-lightbox-cursor-left",
	"fancybox-next": "icon-lightbox-cursor-right",
}
export class Cursor {
	constructor() {
		this.dom = { root: document.querySelector("[data-component=cursor]") };
		this.dom.current = this.dom.root.querySelector("[data-elem=current]");
		this.dom.next = this.dom.root.querySelector("[data-elem=next]");

		window.addEventListener(`${app.state.pointerType}move`, (e) => this.pointerHandler(e));
		window.addEventListener(`${app.state.pointerType}enter`, (e) => this.pointerHandler(e));
		this.worker();
	}
	worker() {
		const hoveredElems = document.querySelectorAll(":hover");
		if (hoveredElems.length) {
			this.updateCursorOverTarget(hoveredElems[hoveredElems.length - 1]);
		}
		requestAnimationFrame(() => this.worker());
	}
	updateCursorOverTarget(target) {
		if (this.lastTarget === target) return;
		if (target === document.documentElement.querySelector("body")) return;
		this.type = this.defineCursorType(target);
		this.hidden = this.type === "none";
		this.wide = this.isTargetActive(target);
		this.lastTarget = target;
	}
	pointerHandler({ target, clientX, clientY }) {
		this.setPosition(clientX, clientY);
		this.updateCursorOverTarget(target);
	}
	defineCursorType(target) {
		if (!(target instanceof HTMLElement || target instanceof SVGElement)) return "default";
		const elemWithDefinedAttr = target.hasAttribute("data-cursor") ? target : target.closest("[data-cursor]");
		if (elemWithDefinedAttr) return elemWithDefinedAttr.getAttribute("data-cursor");
		if (this.isFancyboxSrc(target)) return "fancybox-open";
		if (this.isFancyboxSlide(target)) return "fancybox-close";
		if (this.isFancyboxNext(target)) return "fancybox-next";
		if (this.isFancyboxPrev(target)) return "fancybox-prev";
		return "default";
	}
	isFancyboxSrc(target) {
		return target.matches("[data-fancybox], [data-fancybox] *");
	}
	isFancyboxSlide(target) {
		return target.matches(".fancybox-slide, .fancybox-slide *");
	}
	isFancyboxNext(target) {
		return target.matches("[data-fancybox-next], [data-fancybox-next] *");
	}
	isFancyboxPrev(target) {
		return target.matches("[data-fancybox-prev], [data-fancybox-prev] *");
	}
	setPosition(x, y) {
		this.dom.root.style.setProperty("--cursor-left", `${x}px`);
		this.dom.root.style.setProperty("--cursor-top", `${y}px`);
	}
	isTargetActive(target) {
		return target.matches(`a, button, [data-active="true"]`) || target.closest(`a, button, label, [data-active="true"]`);
	}
	set hidden(value) {
		if (value) this.dom.root.classList.add("hidden");
		else this.dom.root.classList.remove("hidden");
	}
	set wide(value) {
		if (value) this.dom.root.classList.add("wide");
		else this.dom.root.classList.remove("wide");
	}
	set type(type) {
		if (this.currentType === type) return;
		this.dom.root.setAttribute("data-prev-type", this.currentType);
		this.dom.root.setAttribute("data-type", type);
		if (type !== "default" && type !== "none") {
			this.dom.root.classList.add("cursor_icon");
			this.changeCursorIcon(this.currentType, type);
		} else {
			this.dom.root.classList.remove("cursor_icon");
		}
		this.currentType = type;
	}
	get type() {
		return this.currentType;
	}
	async changeCursorIcon(from, to) {
		if (from !== "default" && from !== "none" || to !== "default" && to !== "none") {
			this.dom.next.className = this.getIconClass(to);
			this.dom.root.classList.add("changing");
			await new Promise(resolve => setTimeout(resolve, 400));
			this.dom.root.classList.remove("changing");
		}
		this.dom.current.className = this.getIconClass(to);
	}
	getIconClass(cursorName) {
		return iconsMapping[cursorName];
	}
	// getCursorStyle(target) {
	// 	const style = getComputedStyle(target);
	// 	return style.cursor;
	// }
}