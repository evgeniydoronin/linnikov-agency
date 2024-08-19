import EventEmitter from "./patterns/EventEmitter.js";

export class Transition extends EventEmitter {
	// f(current, t, target) | f(current, Moment, target)
	_afr = null;
	_to = null;
	_from = null;
	_current = null;
	_params = null;
	changeTs = null;
	recalcTs = null;
	progress = null;
	_lastFrameTs = null;
	_status = "idle";
	minFrameDuration = null;
	constructor(params) {
		super();
		this.updateParams(params);
	}
	cancel() {
		if (this._status === "idle") return;
		this.cancelAnimationFrame();
		this._lastFrameTs = null;
		this._status = "idle";
		this.emit("cancel", { transition: this });
	}
	updateParams(params) {
		this._params = params;
		this.minFrameDuration = 1000 / (params.maxFrameRate || 60);
	}
	set(value) {
	}
	get() {
		return this._current;
	}
	fromTo(from, to, params) {
		if (params) this.updateParams(params);
		this._current = from;
		this._from = from;
		this.to(to);
	}
	to(value, params) {
		if (params) this.updateParams(params);
		this.changeTs = performance.now();
		this._to = value;
		this._current ??= this._to;
		this._from = this._current;
		if (this._status === "idle") {
			this.startTransition();
		}
	}
	recalcFrame(frameTs) {
		return true;
	}
	cancelAnimationFrame() {
		if (this._afr) cancelAnimationFrame(this._afr);
		this._afr = null;
	}
	startTransition() {
		this._status = "inprogress";
		this.scheduleRecalc();
		this.emit("start", { transition: this });
	}
	completeTransition() {
		this.cancelAnimationFrame();
		this._lastFrameTs = null;
		this._status = "idle";
		this.emit("complete", { transition: this, current: this._current });
	}
	scheduleRecalc() {
		this._afr = requestAnimationFrame((frameTs) => {
			const completed = this.recalcFrame(frameTs);
			this._lastFrameTs = frameTs;
			if (completed) {
				this.completeTransition();
			} else {
				this.scheduleRecalc();
			}
		});
	}
}
export class TimeTransition extends Transition {
	duration = null;
	ease = null;
	constructor(params) {
		super(params);
		this.duration = params.duration * 1000;
		this.ease = params.ease || ((x) => Math.sin((x * Math.PI) / 2));
	}
	set(value) {
		if (this._to === value) return;
		this.changeTs = performance.now();
		this._from = value;
		this._to = value;
		if (this._status === "idle") {
			this.startTransition();
		}
	}
	recalcFrame() {
		this.recalcTs = performance.now();
		this.progress = Math.min((this.recalcTs - this.changeTs) / this.duration, 1);
		this._current = this._from + (this._to - this._from) * this.ease(this.progress);
		this.emit("update", { transition: this, current: this._current });
		return this.progress === 1;
	}
}

export class MomentTransition extends Transition {
	_lerp = null;
	constructor(params = {}) {
		super(params);
		this.updateParams(params);
	}
	updateParams(params) {
		this._params = params;
		this._lerp = params.lerp || 0.1;
	}
	set(value, params) {
		if (params) this.updateParams(params);
		if (this._current === value) return;
		this._current = value;
		this.to(value);
	}
	update(value) {
		this._current = value;
		this.emit("update", { transition: this, current: this._current });
	}
	recalcFrame(frameTs) {
		this.recalcTs = performance.now();
		if (this._current === null) throw Error("[Moment Transition] Current value should be initialized before call recalcFrame");
		const timeBetweenFrames = (frameTs - (this._lastFrameTs || frameTs)) * 0.001;
		const nextValue = damp(this._current, this._to, this._lerp * 60, timeBetweenFrames);
		if (Math.abs(nextValue - this._to) <= 0.1) return this.update(this._to), true;
		return this.update(nextValue), false;
	}
}

export function lerp(x, y, t) {
  return (1 - t) * x + t * y
}

// http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/
export function damp(x, y, lambda, dt) {
  return lerp(x, y, 1 - Math.exp(-lambda * dt))
}