import throttle from "lodash.throttle";

const copiedClass = "ref-to-clipboard_copied";
const { observable, autorun, computed, action } = mobx;

class RefToClipboard {
	@observable accessor _target = null;
	static pattern = /^mailto:|^tel:/;
	static isCallableHref(value) {
		return RefToClipboard.pattern.test(value);
	}
	constructor() {
		if (window.app.isMobile) return;
		this.dom = { root: document.querySelector(".ref-to-clipboard") };
		this.dom.tips = this.dom.root.querySelector(".ref-to-clipboard__tips");
		this.initTipsPositionControlls();
		setTimeout(() => this.initRelatedLogic(), 0);

		autorun(() => {
			this.dom.tips.classList.toggle("_show", this._target);
		});

		document.addEventListener("click", this.handleClick);
	}
	initTipsPositionControlls() {
		this.xTo = gsap.quickTo(this.dom.tips, "x", { duration: 0.3 });
		this.yTo = gsap.quickTo(this.dom.tips, "y", { duration: 0.3 });
		this.setX = gsap.quickSetter(this.dom.tips, "x", "px");
		this.setY = gsap.quickSetter(this.dom.tips, "y", "px");
		
		const convertX = (value) => {
			const halfWidth = this.dom.tips.offsetWidth / 2;
			return Math.max(Math.min(value, window.innerWidth - halfWidth), halfWidth);
		};
		const convertY = (value) => value > 100 ? value - 60 : value + 60;
		this.setTipsPosition = (x, y) => {
			this.setX(convertX(x));
			this.setY(convertY(y));
		};
		this.tipsPositionTo = (x, y) => {
			this.xTo(convertX(x));
			this.yTo(convertY(y));
		};
	}
	handleClick = (e) => {
		if (!app.state.isMobile && this._target !== null) {
			e.preventDefault();
			this.copy();
		}
	};
	@action
	setTarget(next) {
		if (next === this._target) return;
		this._target = next;
	}
	initRelatedLogic() {
		if (!app.state.isMobile) this.initTipsMove();
	}
	handleTargetChange(target) {
		if (target?.matches("a, a *")) {
			const root = target.matches("a") ? target : target.closest("a");
			const href = root.getAttribute("href");
			if (RefToClipboard.isCallableHref(href)) {
				this.setTarget(root);
			} else {
				this.setTarget(null);
			}
		} else{
			this.setTarget(null);
		}
	}
	initTipsMove() {
		document.addEventListener(`${app.state.pointerType}move`, ({ target, clientX, clientY }) => {
			this.tipsPositionTo(clientX, clientY);
			this.handleTargetChange(target);
		});
		document.addEventListener(`scroll`, throttle(() => {
			this.handleTargetChange(null);
		}), 25);
	}
	@computed
	get href() {
		if (!this._target) return null;
		return this._target.getAttribute("href");
	}
	@computed
	get stripedHref() {
		return this.href?.replace(RefToClipboard.pattern, "");
	}
	async copy() {
		const error = await copyTextToClipboard(this.stripedHref);
		if (!error) {
			this.dom.root.classList.add(copiedClass);
			if (this.timerId !== null) clearTimeout(this.timerId);
			this.timerId = setTimeout(() => {
				this.timerId = null;
				this.dom.root.classList.remove(copiedClass);
			}, 3000);
		}
	}
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
	textArea.style.visibility = "hidden";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
		return null;
  } catch (err) {
		const msg = `Fallback: Oops, unable to copy. Error(${err.type}): ${err.message}`;
    console.error(msg);
		return msg;
  } finally {
		document.body.removeChild(textArea);
	}
}
async function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    return fallbackCopyTextToClipboard(text);
  }
  return navigator.clipboard.writeText(text).then(function() {
		console.log('Async copying to clipboard has been done: ' + text);
    return null;
  }, function(err) {
    return `Async: Could not copy text. Error(${err.type}): ${err.message}`;
  });
}

window.app = (window.app || {});
window.app.refToClipboard = new RefToClipboard();