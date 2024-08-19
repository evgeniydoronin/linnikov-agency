import { isNotEmptyString } from "../scripts/utils.js";

function defaultTrigger() {
	const observer = new IntersectionObserver((entries) => {
		if (entries[0]?.isIntersecting) {
			observer.disconnect();
			this.exec();
		}
	}, {
		rootMargin: "-5% 0px",
		threshold: 1,
	});
	observer.observe(this.dom);
}
function easeOutQuart(x) {
	return 1 - Math.pow(1 - x, 4);
	}
export class CountUp {
	constructor(target, { duration = 1, maxFrames = 20, setTrigger = defaultTrigger, portion = 0.5 } = {}) {
		this.duration = Number(duration) * 1000;
		this.frameDuration = this.duration / maxFrames;
		this.dom = target;
		this.initial = target.textContent;
		this.setTrigger = setTrigger;
		this.portion = portion;
		this.base = 1 - portion;
		this.setTrigger();
	}
	reset() {
		this.lastTickTs = null;
		this.progress = 0;
	}
	update() {
		this.dom.textContent = this.initial.replace(/\d[\.,]?\d?/g, (match, offset, initial, groups) => {
			const delimiterIdx = match.search(/[\.,]/);
			const delimiter = Boolean(~delimiterIdx) ? match.charAt(delimiterIdx) : null;
			const value = Number(match.replace(delimiter, "."));
			const result = (value * this.base + value * this.portion * easeOutQuart(this.progress)).toFixed(delimiter ? (match.length - delimiterIdx - 1) : 0);
			return delimiter ? result.split(".").join(delimiter) : result;
		});
	}
	exec() {
		this.reset();
		this.startTs = performance.now();
		this.schedule();
	}
	tick(ts) {
		this.lastTickTs = ts;
		this.progress = Math.min((ts - this.startTs) / this.duration, 1);
		this.update();
	}
	schedule() {
		requestAnimationFrame((ts) => {
			if (ts - this.startTs <= this.duration) {
				if (this.lastTickTs === null || ts - this.lastTickTs >= this.frameDuration) this.tick(ts);
				this.schedule();
			} else {
				this.tick(ts);
			}
		});
	}
}
export function initCountUps() {
	document.querySelectorAll("[data-count-up]").forEach(elem => {
		const config = elem.getAttribute("data-count-up");
		try {
			new CountUp(elem, isNotEmptyString(config) ? JSON.parse(config) : undefined);
		} catch(ex) {
			console.log("Issue has been encountered while parsing Count Up config", ex);
		}
	});
}