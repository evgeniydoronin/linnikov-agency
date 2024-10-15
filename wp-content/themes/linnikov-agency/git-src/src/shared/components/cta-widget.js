import { delay } from "../scripts/utils.js";

const { autorun, observable } = window.mobx;

export class CtaWidget {
	static initialized = false;
	@observable accessor widthMatches = false;
	constructor() {
		if (CtaWidget.initialized) return;
		this.dom = { root: document.querySelector("#cta-widget") };
		if (!this.dom.root) return;
		CtaWidget.initialized = true;
		setTimeout(() => this.initRelatedLogic(), 0);
		if (document.querySelector("body.contact-page, body.team-page, body.brief-page, body.version-select-page, body.minpack-exclusive-complimentary")) {
			this.hide();
			this._disabled = true;
		}
	}
	setWidthMathes(next) {
		this.widthMatches = next;
	}
	async initRelatedLogic() {
		const mediaMatch = matchMedia("(max-width: 1640px)");
		mediaMatch.addListener(({ matches }) => this.setWidthMathes(matches));
		this.setWidthMathes(mediaMatch.matches);
		const videoRoots = Array.from(document.querySelectorAll(`[data-component="work-video"]`));
		const videoComponents = await Promise.all(videoRoots.map(root => root.useModule("work-video")));
		autorun(() => {
			(window.footer?.visible && this.widthMatches) ||
			window.faqFrames?.inSight ||
			(app.state.isMobile && app.state.landscape && videoComponents.some(target => target.isIntersecting)) ? this.hide() : this.show();
		});
	}
	async hide() {
		this.dom.root.classList.add("hidden");
		await delay(200);
	}
	async show() {
		if (this._disabled) return;
		this.dom.root.classList.remove("hidden");
		await delay(200);
	}
	get hidden() {
		return this.dom.root.classList.has("hidden");
	}
}