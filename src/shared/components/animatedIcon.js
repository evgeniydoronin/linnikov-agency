import { getTargetElem } from "../scripts/utils.js";

export class AnimatedIcon {
	active = false;
	constructor(target) {
		this.dom = { root: getTargetElem(target) };
		this.dom.canvas = this.dom.root.querySelector("canvas");
		this.dom.overlay = this.dom.root.querySelector(`[data-elem="overlay"]`);
		this.id = this.dom.root.getAttribute("data-id");
		if (this.id.length === 1) this.id = "0" + this.id;
		this.composition = AdobeAn.getComposition(this.id);
		if (!this.composition) return null;
		this.lib = this.composition.getLibrary();
		this.spriteSheet = this.composition.getSpriteSheet();
		this.stage = new this.lib.Stage(this.dom.canvas);
		this.root = new this.lib[`_${this.id}`]();
		window.stages = window.stages || {};
		
		window.stages[this.id] = this.stage;
		this.composition.setRoot(this.root);
		this.composition.setStage(this.stage);
		this.stage.addChild(this.root);
		this.setScale();
		AdobeAn.compositionLoaded(this.lib.properties.id);

		this.stage.setAutoPlay(true);

		createjs.Ticker.framerate = this.lib.properties.fps;
		createjs.Ticker.addEventListener("tick", this.handleTick);
	}
	setScale() {
		const baseRatio = 1, baseScale = 1;
		this.stage.scaleX = baseScale;
		this.stage.scaleY = baseScale;
		this.stage.tickOnUpdate = false;
		this.stage.update();
		this.stage.tickOnUpdate = true;
		this.dom.root.style.setProperty("--v-ratio", `${this.lib.properties.height / this.lib.properties.width * 100}%`);
	}
	handleTick = () => {
		this.stage.update();
		if (!this.infinite && this.root.totalFrames === this.root.currentFrame + 1) {
			this.immediateStop();
		}
	}
	start(infinite) {
		if (!this.stage) return;
		if (this.id === "03") {
			this.cycle = 0;
		}
		this.active = true;
		this.infinite = infinite;
		this.stage.play();
	}
	restart(infinite) {
		this.stage.seek(0);
		this.start(infinite);
	}
	stop(immediate) {
		if (!this.stage) return;
		if (immediate) this.immediateStop();
		this.infinite = false;
	}
	immediateStop() {
		this.stage.stop();
		this.stage.seek(0);
		this.active = false;
	}
};