export default class Toasts {
	constructor(target) {
		this.dom = { root: target };
	}
	add(body) {
		const toast = document.createElement("div");
		toast.innerHTML = body;
		this.dom.root.prepend(toast);
		setTimeout(() => toast.remove(), 5000);
	}
}