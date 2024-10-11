import throttle from "lodash.throttle";

export default class ObjectFit {
	constructor(root) {
		this.dom = { root, target: document.querySelector(`[data-elem="object-fit.target"]`) };
		this.ratio = parseFloat(this.dom.target.getAttribute("data-ratio"));
		this.resizeObserver = new ResizeObserver(this.onResize);
		this.resizeObserver.observe(this.dom.root);
	}
	onResize = throttle(() => {
		const containerHeightRatio = this.dom.root.offsetHeight / this.dom.root.offsetWidth * 100;
		let width;
		if (containerHeightRatio < this.ratio) {
			width = this.dom.root.offsetWidth;
		} else {
			width = this.dom.root.offsetHeight / this.ratio * 100;
		}
		this.dom.target.style.setProperty("--width", `${width}px`);
		this.dom.target.style.setProperty("--height", `${width * this.ratio / 100}px`);
	}, 25);
}