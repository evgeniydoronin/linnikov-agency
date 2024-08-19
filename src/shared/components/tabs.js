import EventEmitter from "../scripts/patterns/EventEmitter.js";
import { getTargetElem } from "../scripts/utils.js";

export class Tabs extends EventEmitter {
	activeTab = null;
	constructor(target) {
		super();
		this.dom = { root: getTargetElem(target) };
		this.dom.controls = this.dom.root.querySelector("[data-tabs-elem=controls]");
		this.dom.tabs = Array.from(this.dom.root.querySelectorAll("[data-tabs-elem=tab]"));
		this.disclosureBased = this.dom.root.getAttribute("data-type") === "disclosure-based";
		this.activeTabClass = this.disclosureBased ? "open" : "active";
		const activeTab = this.dom.controls["active-tab"].value;
		this.switchTo(activeTab);

		this.dom.controls.addEventListener("change", ({ target }) => this.switchTo(target.value));
	}
	switchTo(idx) {
		if (this.activeTab === idx) return;
		this.emit("switch", { self: this, activeTab: this.activeTab, to: idx });
		if (this.activeTab !== null) this.hide(this.activeTab);
		this.show(idx);
	}
	show(idx) {
		this.activeTab = idx;
		this.dom.tabs[idx]?.classList.add(this.activeTabClass);
	}
	hide(idx) {
		this.dom.tabs[idx]?.classList.remove(this.activeTabClass);
	}
}