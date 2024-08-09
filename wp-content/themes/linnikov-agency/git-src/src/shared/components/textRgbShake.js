export class TextRgbShake {
	active = false;
	constructor(target) {
		this.dom = { root: getTargetElem(target) };
		this.dom.root.classList.add("text-rgb-shake");
		this.dom.mainWrap = document.createElement("div");
		this.dom.mainWrap.classList.add("text-rgb-shake__main");
		this.dom.rgbSet = document.createElement("div");
		this.dom.rgbSet.classList.add("text-rgb-shake__set");
		this.dom.rgbSet.setAttribute("aria-hidden", "true");
		this.dom.mainWrap.append(...this.dom.root.childNodes);
		for(let i = 0; i < 3; i++) {
			const wrap = document.createElement("div");
			wrap.append(...Array.from(this.dom.mainWrap.childNodes).map(child => child.cloneNode(true)));
			this.dom.rgbSet.append(wrap);
		}
		this.dom.root.append(this.dom.mainWrap);
		this.dom.root.append(this.dom.rgbSet);
		this.dom.root.registerModule("textRgbShake", this);
	}
	show(duration) {
		if (this.active) return;
		this.dom.root.classList.add("text-rgb-shake_active");
		setTimeout(() => this.dom.root.classList.remove("text-rgb-shake_active"), duration);
	}
}