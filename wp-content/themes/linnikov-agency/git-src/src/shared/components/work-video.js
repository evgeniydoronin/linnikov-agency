import throttle from "lodash.throttle";
import debounce from "lodash.debounce";
import { TimeTransition } from "../scripts/transition.js";
const { autorun, observable, action, computed, runInAction } = mobx;

class Button {
	hoverMedia = matchMedia("(any-hover: hover)");
	constructor(owner) {
		this.owner = owner;
		this.dom = { root: this.queryRoot() };
		if (!this.dom.root) throw new Error("Cannot find dom element");
		this.createPositionSetters();
		this.owner.dom.root.addEventListener(`${app.state.pointerType}move`, this.pointerMoveHandler);
		setTimeout(() => {
			autorun(() => this.updateState());
		}, 0);
	}
	createPositionSetters() {
		this.leftTo = gsap.quickTo(this.dom.root, "x", { duration: 0.4 });
		this.topTo = gsap.quickTo(this.dom.root, "y", { duration: 0.4 });
	}
	pointerMoveHandler = throttle(({ offsetX, offsetY }) => {
		if (this.hoverMedia.matches) {
			this.leftTo(Math.max(0, Math.min(offsetX, this.owner.dom.root.offsetWidth)));
			this.topTo(Math.max(0, Math.min(offsetY, this.owner.dom.root.offsetHeight)));
		} else {
			
		}
	}, 20);
	updateState() {}
	queryRoot() {}
}
class PlaybackButton extends Button {
	constructor(owner) {
		super(owner);
	}
	updateState() {
		this.dom.root.classList.toggle("play", this.owner.isPlaying);
		this.dom.root.classList.toggle("pause", !this.owner.isPlaying);
		this.dom.root.classList.toggle("_show", this.owner.activeControl === "playback");
	}
	queryRoot() {
		return this.owner.dom.root.querySelector(`[data-elem="work-video.playback-btn"]`);
	}
}
class SoundToggleButton extends Button {
	constructor(owner) {
		super(owner);
	}
	updateState() {
		this.dom.root.classList.toggle("_on", this.owner.volume.soundOff);
		this.dom.root.classList.toggle("_off", !this.owner.volume.soundOff);
		this.dom.root.classList.toggle("_show", this.owner.activeControl === "sound");
	}
	queryRoot() {
		return this.owner.dom.root.querySelector(`[data-elem="work-video.sound-toggle-btn"]`);
	}
}
class VolumeController {
	@observable accessor current = 0;
	@observable accessor soundOff = true;
	constructor(owner) {
		this.owner = owner;
		this.transition = new TimeTransition({ duration: 1 });
		this.transition.on("update", ({ current }) => {
			this.setCurrent(current);
			this.owner.player.setVolume(current);
		});
		this.externallyDefinedLevel = 0;
		this.transition.set(0);
	}
	@action setCurrent(next) {
		this.current = next;
	}
	@action setSoundOff(next) {
		this.soundOff = next;
		if (next) {
			this.transition.to(0);
		} else {
			this.transition.to(this.externallyDefinedLevel);
			const completeHandler = () => {
				this.skipSet = false;
				this.transition.off("complete", completeHandler);
			}
			this.skipSet = true;
			this.transition.to(this.externallyDefinedLevel);
			this.transition.on("complete", completeHandler);
		}
	}
	set(next) {
		this.externallyDefinedLevel = next;
		if (this.soundOff) return;
		this.transition.set(next);
	}
	to(next) {
		this.externallyDefinedLevel = next;
		if (this.soundOff) return;
		this.transition.to(next);
	}
	toggle(manual) {
		this.setSoundOff(!this.soundOff);
	}
}
export class WorkVideo {
	static map = new Map();
	static resizeObserver = new ResizeObserver(throttle((entries) => {
		entries.forEach(({ target }) => {
			const self = WorkVideo.map.get(target);
			let playerWidth, playerHeight;
			const frameWidth = self.dom.root.offsetWidth;
			const frameHeight = self.dom.root.offsetHeight;
			const frameRatio = frameWidth / frameHeight;
			const playerRatio = 16 / 9;
			if (frameRatio < playerRatio) {
				playerHeight = frameHeight;
				playerWidth = frameHeight * playerRatio;
			} else {
				playerWidth = frameWidth;
				playerHeight = frameWidth / playerRatio;
			}
			self.dom.root.style.setProperty("--player-width", `${playerWidth}px`);
			self.dom.root.style.setProperty("--player-height", `${playerHeight}px`);

			if (app.state.isMobile) self.centerButtons();
		});
	}, 25));
	static intersectionObserver = new IntersectionObserver((entries) => {
		entries.forEach(({ target, isIntersecting }) => {
			const self = WorkVideo.map.get(target);
			if (!self) return;
			runInAction(() => self.isIntersecting = isIntersecting);
		});
	}, { threshold: 0.5 });
	@observable accessor isPlaying = false;
	@observable accessor pauseSource = null;
	@observable accessor hadInteraction = false;
	@observable accessor isIntersecting = false;
	constructor(root) {
		this.dom = { root };

		WorkVideo.map.set(this.dom.root, this);
		WorkVideo.resizeObserver.observe(this.dom.root);
		WorkVideo.intersectionObserver.observe(this.dom.root);

		this.initPlayer();
		this.volume = new VolumeController(this);
		this.playbackBtn = new PlaybackButton(this);
		try {
			this.soundToggleBtn = new SoundToggleButton(this);
		} catch(ex) {
			this.volume.setSoundOff(false);
			this.volume.to(1);
		}
		this.centerButtons();

		this.dom.root.addEventListener(`${app.state.pointerType}out`, this.pointerLeaveHandler);
		this.dom.root.addEventListener("click", (event) => this.clickHandler(event));

		const interactiveSectionElem = this.dom.root.closest(".video-section_interactive");
		if (interactiveSectionElem) {
			this.initInteractiveControll(interactiveSectionElem);
		}
		this.dom.root.registerModule("work-video", this);
	}
	clickHandler(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		!this.hadInteraction && this.setHadInteraction(true);
		if (this.activeControl === "playback") {
			this.togglePlayback("manual");
		} else {
			this.toggleSound("manual");
		}
	}
	initPlayer() {
		this.dom.player = this.dom.root.querySelector(`[data-elem="work-video.video"]`);
		try {
			this.player = new Vimeo.Player(this.dom.player, { responsive: true });
		} catch(ex) {
			console.error("Can't initialize Vimeo player");
		}
		this.player.on("play", () => this.setPlaying(true));
		this.player.on("pause", () => this.setPlaying(false));
	}
	centerButtons() {
		const left = this.dom.root.offsetWidth / 2, right = this.dom.root.offsetHeight / 2;
		this.playbackBtn.leftTo(left);
		this.playbackBtn.topTo(right);
		this.soundToggleBtn?.leftTo(left);
		this.soundToggleBtn?.topTo(right);
	}
	async initInteractiveControll(interactiveSectionElem) {
		this.interactiveSection = await interactiveSectionElem.useModule("interactiveVideoSection");
		autorun(() => {
			if (!this.hadInteraction) return;
			const volume = this.interactiveSection.scrollProgress <= 0.65 ?
				Math.max(0, this.interactiveSection.scrollProgress - 0.05) / 0.6 :
				1 - (this.interactiveSection.scrollProgress - 0.65) / 0.35;
				this.volume.set(volume);
		});
		autorun(() => {
			if (this.pauseSource === "manual") return;
			if (!this.hadInteraction && !this.interactiveSection.desctopMode) return;
			if (this.interactiveSection.scrolling) {
				this.play();
			} else {
				if (this.isPlaying && this.volume.current < 0.1) this.pause("auto");
			}
		});
		autorun(() => {
			if (this.interactiveSection.desctopMode) {
				if (!this.hadInteraction) {
					this.volume.setSoundOff(true);
				}
				this.setPauseSource(null);
			} else {
				this.volume.setSoundOff(false);
			}
		});
	}
	@computed
	get activeControl() {
		return (this.interactiveSection?.desctopMode && !app.state.isMobile) ? "sound" : "playback";
	}
	@action
	setHadInteraction(next) {
		this.hadInteraction = next;
		this.dom.root.classList.toggle("_had-interaction");
	}
	@action
	setPauseSource(next) {
		this.pauseSource = next;
	}
	@action
	setPlaying(next) {
		this.isPlaying = next;
		this.dom.root.classList.toggle("play", next);
		this.dom.root.classList.toggle("pause", !next);
	}
	pause(source) {
		this.setPauseSource(source);
		if (!this.isPlaying) return;
		this.player.pause();
	}
	play() {
		this.setPauseSource(null);
		if (this.isPlaying) return;
		this.player.play();
	}
	togglePlayback(manual) {
		this.isPlaying ? this.pause(manual) : this.play();
	}
	toggleSound(manual) {
		this.volume.toggle(manual);
	}
	setVisited(next) {
		this.visited = next;
		if (next) {
			this.dom.root.classList.add("_visited");
		} else {
			this.dom.root.classList.remove("_visited");
		}
	}
	pointerLeaveHandler = debounce(() => {
		if (!this.visited) this.setVisited(true);
	}, 25);
}
export default function init() {
	document.querySelectorAll("[data-component=work-video]").forEach(elem => new WorkVideo(elem));
}