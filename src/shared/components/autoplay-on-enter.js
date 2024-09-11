var { observable, action, autorun } = mobx;
export class Autoplay {
	@observable accessor active = false;
	@observable accessor visible = false;
	constructor(target) {
		this.root = target;
		this.player = new Vimeo.Player(target, { responsive: true });
		this.trigger = ScrollTrigger.create({
			trigger: target,
			start: "top+=20% bottom",
			onToggle: (self) => {
				if (self.isActive) {
					this.trigger.kill();
					this.trigger = null;
					this.setActive(true);
				}
			},
		});
		setTimeout(() => this.initRelatedLogic(), 0);
		this.onViewportResize();
		autorun(() => {
			if (this.active && this.visible) {
				this.player.play();
			} else {
				this.player.pause();
			}
		});
	}
	initRelatedLogic() {
		window.app.windowResizeObserver.on("resize", () => this.onViewportResize());
	}
	onViewportResize() {
		this.setVisible(this.isVisible());
	}
	isVisible() {
		return gsap.getProperty(this.root, "visibility") !== "hidden";
	}
	@action
	setVisible(next) {
		this.visible = next;
	}
	@action
	setActive(next) {
		this.active = next;
	}
}
export function init() {
	document.querySelectorAll("[data-autoplay-on-enter]").forEach(elem => new Autoplay(elem));
}