import throttle from "lodash.throttle";

const { observable, autorun, reaction, action } = mobx;

function getAngle(a) {
	var b = { x: 1, y: 0 };
	var acc = a.x * b.x + a.y * b.y;
	var angle = Math.acos(acc / (getModule(a) * getModule(b)));
	return  a.y > 0 ? 2 * Math.PI - angle : angle;
	function getModule(v) {
		return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
	}
}
const cartoonSvgSize = { w: 513.64, h: 261.24 };
const leftEyeCenterRate = { x: (125.91 + 45.86) / cartoonSvgSize.w, y: (127.67 + 45.86) / cartoonSvgSize.h }; // 125.91 127.67
const rightEyeCenterRate = { x: (386.94 + 45.86) / cartoonSvgSize.w, y: (127.67 + 45.86) / cartoonSvgSize.h }; // 386.94 127.67
const eyeOrbitRadius = 72 - 45.86 / 2;
const leftEyeInitialPosShift = { x: 147.64 - 125.91, y: 137.34 - 127.67 }; // 147.64,137.34
const rightEyeInitialPosShift = { x: 359.4 - 386.94, y: 137.34 - 127.67  }; // 359.4,137.34

class Cartoon {
	@observable accessor isOpen = false;
	@observable accessor couldAnimate = false;
	@observable accessor pointerPosition = {};
	constructor(root) {
		this.dom = { root };
		this.dom.leftEye = this.dom.root.querySelector(".chat-cartoon__eye_left");
		this.dom.rightEye = this.dom.root.querySelector(".chat-cartoon__eye_right");
		this.createSetters();
		setTimeout(() => {
			this.subscribeOnDrawer();
			document.addEventListener(`${app.state.pointerType}move`, this.onPointerMove);
		}, 0);
		
		reaction(() => this.isOpen, (isOpen) => {
			clearInterval(this.timerId);
			if (isOpen) {
				this.timerId = setInterval(() => this.setCouldAnimate(true), 0);
			} else {
				this.setCouldAnimate(false);
			}
		});
		autorun(() => {
			if (this.couldAnimate) {
				this.resetTransformation();
				this.getInitialState();
				this.leftEyeTo(this.calcEyePosition(this.leftEyeCenter));
				this.rightEyeTo(this.calcEyePosition(this.rightEyeCenter));
			} else {
				this.setInitialPosition();
			}
		});
	}
	calcEyePosition(eyeCenter) {
		var angle = getAngle({
				x: this.pointerPosition.x - eyeCenter.x,
				y: this.pointerPosition.y - eyeCenter.y,
			});
		return {
			x: eyeOrbitRadius * Math.cos(angle),
			y: eyeOrbitRadius * Math.sin(angle) * -1,
		}
	}
	@action
	setIsOpen(next) {
		this.isOpen = next;
	}
	@action
	setCouldAnimate(next) {
		this.couldAnimate = next;
	}
	@action
	setPointerPosition(x, y) {
		this.pointerPosition = { x, y };
	}
	setInitialPosition() {
		this.leftEyeTo(leftEyeInitialPosShift);
		this.rightEyeTo(rightEyeInitialPosShift);
	}
	subscribeOnDrawer() {
		window.app.drawers.on("ai-chat", "open", () => this.setIsOpen(true));
		window.app.drawers.on("ai-chat", "close", () => this.setIsOpen(false));
	}
	createSetters() {
		var settings = { duration: 0.4, ease: "power3" };
		this.leftEyeXTo = gsap.quickTo(this.dom.leftEye, "x", settings);
		this.leftEyeYTo = gsap.quickTo(this.dom.leftEye, "y", settings);
		this.rightEyeXTo = gsap.quickTo(this.dom.rightEye, "x", settings);
		this.rightEyeYTo = gsap.quickTo(this.dom.rightEye, "y", settings);
	}
	leftEyeTo({ x, y }) {
		this.leftEyeXTo(x);
		this.leftEyeYTo(y);
	}
	rightEyeTo({ x, y }) {
		this.rightEyeXTo(x);
		this.rightEyeYTo(y);
	}
	onPointerMove = throttle(({ clientX, clientY }) => {
		this.setPointerPosition(clientX, clientY);
	}, 25);
	resetTransformation() {
		gsap.set(this.dom.leftEye, { x: 0, y: 0 });
		gsap.set(this.dom.rightEye, { x: 0, y: 0 });
	}
	getInitialState() {
		this.box = this.dom.root.getBoundingClientRect();
		this.leftEyeCenter = { x: this.box.left + leftEyeCenterRate.x * this.box.width, y: this.box.top + leftEyeCenterRate.y * this.box.height };
		this.rightEyeCenter = { x: this.box.left + rightEyeCenterRate.x * this.box.width, y: this.box.top + rightEyeCenterRate.y * this.box.height };
	}
}

function vanillaScroll(t, e) {
    this.bar = null, this.rail = null, this.element = null, this.wrapper = null, this.dragging = !1, this.originY = 0, this.interval = null, this.element = t;
    var i = {
        width: "auto",
        height: "100%",
        size: 3,
        scrollAmount: 30,
        scrollRate: 20,
        rail: !1,
        alwaysShow: !1,
        position: "right"
    };
    e && "object" == typeof e && (this.options = this.set_defaults(i, e)), this.initialise()
}
window.addEventListener = window.addEventListener || function(t, e) {
    window.attachEvent("on" + t, e)
}, vanillaScroll.prototype = {
    initialise: function() {
        var t = this;
        this.build_wrapper(),
				this.set_bar_position(),
				this.set_scroll_position(),
				this.element.addEventListener("mousewheel", function(e) {
					t.attach_mousewheel(e)
				}, !1),
				this.element.addEventListener("DOMMouseScroll", function(e) {
						t.attach_mousewheel(e)
				}, !1),
				this.element.addEventListener(`${app.state.pointerType}down`, function(e) {
					e.button === (app.state.isMobile ? 0 : 1) && t.drag(e)
				}, !1),
				this.element.addEventListener(`${app.state.pointerType}over`, function(e) {
						t.showRail(e), t.set_bar_height()
				}, !1),
				this.bar.addEventListener(`${app.state.pointerType}down`, function(e) {
						t.drag(e)
				}, !1),
				window.addEventListener("resize", function(e) {
						t.showRail(e), t.set_bar_position(), t.set_scroll_position(), t.set_bar_height()
				}, !1)
    },
    build_wrapper: function() {
        var t, e = this.options.height,
            i = this.options.width;
        this.wrapper = document.createElement("div"), this.bar = document.createElement("div"), this.bar.className = "slick-bar", this.rail = document.createElement("div"), this.rail.className = "slick-rail", this.rail.appendChild(this.bar), this.options.rail && this.rail.classList.add("enabled"), this.rail.style.width = this.options.size + "px", this.wrapper.appendChild(this.rail), this.wrapper.className = "slick-wrapper", this.element.parentNode.appendChild(this.wrapper), this.wrapper.appendChild(this.element), this.options.alwaysShow || this.wrapper.classList.add("hover"), "left" === this.options.position && this.wrapper.classList.add("rail-left"), "auto" !== this.options.width && "100%" !== this.options.width && (i += "px"), "auto" !== this.options.height && "100%" !== this.options.height && (e += "px"), t = "height:" + e + ";width:" + i + ";", this.wrapper.style.cssText = t, this.element.style.cssText = t + "overflow:hidden;", ("100%" === this.options.height || "auto" === this.options.width) && (this.options.height = this.element.offsetHeight), this.set_bar_height()
    },
    attach_mousewheel: function(t) {
        t.preventDefault();
        var e = Math.max(-1, Math.min(1, t.wheelDelta || -t.detail)),
            i = this.element.scrollTop;
        this.bar.offsetTop;
        return 1 === e ? this.element.scrollTop = i - this.options.scrollAmount : this.element.scrollTop = i + this.options.scrollAmount, this.set_bar_position(), !1
    },
    set_bar_height: function() {
        this.bar.style.height = this.element.clientHeight / this.element.scrollHeight * 100 / .5 + "px"
    },
    set_bar_position: function(t) {
        var e = this.element.scrollTop / (this.element.scrollHeight - this.element.clientHeight) * 100,
            i = this.element.offsetHeight - this.bar.offsetHeight,
            s = (e * i / 100).toFixed(2);
        return t ? ("bottom" === t && (this.bar.style.top = i + "px"), !1) : void(this.bar.style.top = s + "px")
    },
    set_scroll_position: function(t) {
        var e = this.element.offsetHeight - this.bar.offsetHeight,
            i = this.bar.offsetTop / e * 100,
            s = this.element.scrollHeight - this.element.clientHeight,
            n = s / 100 * i;
        return t ? ("bottom" === t && (this.element.scrollTop = this.element.scrollHeight), !1) : void(this.element.scrollTop = n)
    },
    scrollTo: function(t) {
        this.set_bar_position(t), this.set_scroll_position(t)
    },
    drag: function(e) {
        var i = this,
            s = this.bar,
            n = s.offsetTop,
            o = s.offsetHeight;
					console.log("drag: ", i, s, n, o);
				var moveHandler = (e) => {
					if (i.dragging) {
						e.preventDefault();
						var l = e.clientY,
								h = i.element.offsetHeight - o,
						y = n + (l - i.originY), t;
						y >= 0 && y <= h ? t = y + "px" : y >= h ? t = h + "px" : t = "0px", s.style.top = t, i.set_scroll_position();
					}
				}
				var upHandler = () => {
					i.dragging = !1;
					document.removeEventListener(`${app.state.pointerType}move`, moveHandler);
					document.removeEventListener(`${app.state.pointerType}up`, upHandler);
				}
        i.dragging = !0, i.originY = e.clientY, e.preventDefault();
				document.addEventListener(`${app.state.pointerType}move`, moveHandler, !1);
				document.addEventListener(`${app.state.pointerType}up`, upHandler, !1);
    },
    showRail: function() {
        this.element.scrollHeight > this.element.clientHeight ? this.rail.style.display = "block" : this.rail.style.display = "none"
    },
    set_defaults: function(t, e) {
        var i;
        for (i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        return t
    }
};
/* INIT SCROLLBAR */
document.addEventListener('DOMContentLoaded', () => {
	const chat_content = document.querySelector('.linnikov-chat__body-content');

	chat_content.addEventListener('wheel', function (event) {
		event.stopPropagation();
		if (chat_content.scrollHeight > chat_content.clientHeight) {
			const deltaY = event.deltaY;
			const up = deltaY < 0;
			const down = deltaY > 0;

			if ((up && chat_content.scrollTop === 0) || (down && chat_content.scrollTop === (chat_content.scrollHeight - chat_content.clientHeight))) {
				event.preventDefault();
			}
		} else {
			event.preventDefault();
		}
	}, { passive: false });
	new Cartoon(document.querySelector("#chat-cartoon"));
	setTimeout(initRelatedLogic, 0);
});

function initRelatedLogic() {
	const chatElem = document.querySelector("#linnikov-chat");
	const widgetElem = document.querySelector("#cta-widget");
	const resetParams = () => {
		const horizontalOrigin = (widgetElem.offsetLeft + widgetElem.offsetWidth - chatElem.offsetLeft) / chatElem.offsetWidth * 100;
		const verticalOrigin = ((widgetElem.offsetTop + widgetElem.offsetHeight / 2) - chatElem.offsetTop) / chatElem.offsetHeight * 100;
		const horizontalScale = widgetElem.offsetWidth / chatElem.offsetWidth;
		gsap.set(chatElem, { "--initial-origin": `${horizontalOrigin}% ${verticalOrigin}%` });
		gsap.set(chatElem, { "--initial-scale": `scale(${horizontalScale}, 0)` });
	}
	const onOpen = () => {
		if (window.innerWidth < 480) {
			document.documentElement.classList.add("scroll-lock-by-drawer");
		}
		resetParams();
	}
	const onClose = () => {
		document.documentElement.classList.remove("scroll-lock-by-drawer");
		resetParams();
	}
	window.app.drawers.on("ai-chat", "open", onOpen);
	window.app.drawers.on("ai-chat", "close", onClose);
}
