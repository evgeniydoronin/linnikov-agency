
import { getTargetElem } from "../../../shared/scripts/utils.js";
import { applyRevealWraps } from "../../../shared/components/revealWrap.js";
const { autorun, observable, action } = mobx;
document.addEventListener("DOMContentLoaded", init);

class VersionSelect {
	@observable accessor selected = null;
	@observable accessor fontIsReady = false;
	constructor(target) {
		this.dom = { root: getTargetElem(target) };
		this.dom.leftBlock = this.dom.root.querySelector(".version-select__block_left .version-select__block-inner");
		this.dom.rightBlock = this.dom.root.querySelector(".version-select__block_right .version-select__block-inner");
		this.dom.leftBlockDesc = this.dom.leftBlock.querySelector(".version-select__desc");
		this.dom.rightBlockDesc = this.dom.rightBlock.querySelector(".version-select__desc");
		this.dom.leftBlock.addEventListener(`${app.state.pointerType}over`, () => this.setSelected("light"));
		this.dom.rightBlock.addEventListener(`${app.state.pointerType}over`, () => this.setSelected("full"));
		this.starLightTween = gsap.effects.svgStarAnimation(this.dom.root.querySelectorAll(".version-select__block_left .version-select__star"));
		this.starFullTween = gsap.effects.svgStarAnimation(this.dom.root.querySelectorAll(".version-select__block_right .version-select__star"));
		this.leftLightningTween = gsap.effects.svgCubicLightningApears(this.dom.root.querySelector(".version-select__block_left .version-select__lightning"));
		this.rightLightningTween = gsap.effects.svgCubicLightningApears(this.dom.root.querySelector(".version-select__block_right .version-select__lightning"));

		this.waitForFont();

		autorun(() => {
			this.dom.root.setAttribute("data-selected", this.selected);
		});
		autorun(() => {
			this.revealItems();
			this.starLightTween.play();
			this.starFullTween.play();
			setTimeout(() => {
				this.leftLightningTween.play();
				this.rightLightningTween.play();
			}, 200);
			
		});
		autorun(() => {
			this.rebuild();
		});
		window.app.windowResizeObserver.on("resize", () => this.rebuild());
	}
	rebuild() {
		if (this.updateDom()) return;
	}
	revealItems() {
		if (!this.fontIsReady) return;
		setTimeout(() => {
			document.querySelectorAll(".reveal-wrap").forEach(elem => elem.classList.add("reveal-wrap_active"));
		}, 0);
	}
	updateDom() {
		if (!this.fontIsReady) return "Font is not ready";
		this.updateDescDom("left");
		this.updateDescDom("right");
	}
	async waitForFont() {
		await document.fonts.load("16px RobotoMono");
		this.setFontIsReady(true);
	}
	@action
	setFontIsReady(next) {
		this.fontIsReady = next;
	}
	@action
	setSelected(next) {
		this.selected = next;
	}
	updateDescDom(side) {
		var propName = `${side}Spliter`;
		var spliter = this[propName];
		var descElem = this.dom[`${side}BlockDesc`];
		if (spliter) {
			spliter.revert();
			spliter.split({ type: "lines", linesClass: "line" });
		} else {
			this[propName] = new SplitText(descElem, { type: "lines", linesClass: "line" });
		}
		applyRevealWraps(descElem);
		setTimeout(() => {
			descElem.classList.add("reveal-wrap_active")
		}, 0);
	}
}
function init() {
	new VersionSelect("#version-select");
}