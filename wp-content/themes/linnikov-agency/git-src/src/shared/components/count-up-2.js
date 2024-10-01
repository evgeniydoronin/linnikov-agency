import { isNotEmptyString } from "../scripts/utils.js";

function defaultTrigger() {
	const observer = new IntersectionObserver((entries) => {
		if (entries[0]?.isIntersecting) {
			//observer.disconnect();
			this.exec();
		}
	}, {
		rootMargin: "-5% 0px",
		threshold: 1,
	});
	observer.observe(this.dom.root);
}

class DecorTypeIterator {
	static decorMap = ["snowflake", "lightning", "infinity"];
	constructor() {
		this.current = -1;
	}
	next() {
		if (this.current == 2) return DecorTypeIterator.decorMap[this.current = 0];
		return DecorTypeIterator.decorMap[++this.current];
	}
}
class CounterCell {
	constructor(owner) {
		this.owner = owner;
		this.dom = {};
		this.createRoot();
		this.appendWrapper();
		this.createTween();
	}
	get root() {
		return this.dom.root;
	}
	createRoot() {
		this.dom.root = document.createElement("div");
		this.dom.root.classList.add("count-up-cell");
	}
	appendWrapper() {
		this.dom.wrapper = document.createElement("div");
		this.dom.wrapper.classList.add("count-up-cell__wrap");
		this.dom.root.append(this.dom.wrapper);
	}
	appendSymbol(char) {
		const symbol = document.createElement("div");
		symbol.textContent = char;
		this.dom.wrapper.append(symbol);
	}
	// appendDecor(type) {
	// 	const decor = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	// 	decor.classList.add(`count-up-cell__decor`, `count-up-cell__decor_${type}`);
	// 	decor.innerHTML = `<use href="@#img/decor-symbols.svg#${type}"></use>`;
	// 	this.dom.wrapper.append(decor);
	// }
	appendDecor(type) {
		const decor = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		decor.classList.add(`count-up-cell__decor`, `count-up-cell__decor_${type}`);

		// Используем абсолютный путь
		decor.innerHTML = `<use href="${window.location.origin}/wp-content/themes/linnikov-agency/git-src/build/img/decor-symbols.svg#${type}"></use>`;

		this.dom.wrapper.append(decor);
	}
	createTween() {
		this.tween = gsap.to(this.dom.wrapper, {
			translateY: "-90%",
			ease: "power2.inOut",
			paused: true,
			duration: this.owner.duration
		});
	}
	exec() {
		this.tween.restart();
	}
}
class CounterMultipleCell extends CounterCell {
	constructor(owner, char) { // Сюда приходит один символ
		super(owner);
		this.value = Number(char);
		this.fill();
	}
	fill() {
		const decorTypeIterator = new DecorTypeIterator();
		var value = 0;
		this.appendSymbol(this.value);
		for (var i = 1; i < 9; i++) {
			if (value % 3 === 0) {
				this.appendSymbol(value);
			} else {
				this.appendDecor(decorTypeIterator.next());
			}
			value = value < this.value ? value + 1 : 0;
		}
		this.appendSymbol(this.value);
	}
}
class CounterSingleCell extends CounterCell {
	constructor(owner, char) { // Сюда приходит один символ
		super(owner);
		this.symbol = char;
		this.fill();
	}
	fill() {
		const decorTypeIterator = new DecorTypeIterator();
		for (var i = 0; i < 10; i++) {
			if (i % 4 === 0 || i === 9) {
				this.appendSymbol(this.symbol);
			} else {
				this.appendDecor(decorTypeIterator.next());
			}
		}
	}
}

export class CountUp {
	constructor(target, { duration = 1.5, setTrigger = defaultTrigger } = {}) {
		this.duration = Number(duration);
		this.dom = { root: target };
		this.initial = this.dom.root.textContent;
		this.dom.root.textContent = null;
		this.setTrigger = setTrigger;
		this.build();
		this.setTrigger();
	}
	build() {
		this.cells = this.initial.split("").map(char => /[\.,0]/.test(char) ? new CounterSingleCell(this, char) : new CounterMultipleCell(this, char));
		this.cells.forEach((cell) => this.dom.root.append(cell.root));
	}
	exec() {
		this.cells.forEach((cell, idx, list) => setTimeout(() => cell.exec(), 200 * idx));
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