/*! Copyright (c) 2015 Karl Saunders (http://streamaddict.tv)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 0.0.4
 *
 */
function vanillaScroll(t, e) {
    this.bar = null, this.rail = null, this.element = null, this.wrapper = null, this.dragging = !1, this.originY = 0, this.interval = null, this.element = t;
    var i = {
        width: "auto",
        height: "100%",
        size: 15,
        scrollAmount: 10,
        scrollRate: 20,
        rail: !1,
        alwaysShow: !1,
        position: "right"
    };
    e && "object" == typeof e && (this.options = this.set_defaults(i, e)), this.initialise()
}
window.addEventListener = window.addEventListener || function(t, e) {
    window.attachEvent("on" + t, e)
}, window.vanillaScroll.prototype = {
    initialise: function() {
        var t = this;
        this.build_wrapper(), this.set_bar_position(), this.set_scroll_position(), this.element.addEventListener("mousewheel", function(e) {
            t.attach_mousewheel(e)
        }, !1), this.element.addEventListener("DOMMouseScroll", function(e) {
            t.attach_mousewheel(e)
        }, !1), this.element.addEventListener("mousedown", function(e) {
            1 === e.button && t.drag(e)
        }, !1), this.element.addEventListener("mouseover", function(e) {
            t.showRail(e), t.set_bar_height()
        }, !1), this.bar.addEventListener("mousedown", function(e) {
            t.drag(e)
        }, !1), document.addEventListener("mouseup", function(e) {
            t.dragging = !1
        }, !1), window.addEventListener("resize", function(e) {
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
        i.dragging = !0, i.originY = e.clientY, e.preventDefault(), document.addEventListener("mousemove", function(e) {
            if (i.dragging) {
                var l = e.clientY,
                    h = i.element.offsetHeight - o;
                y = n + (l - i.originY), y >= 0 && y <= h ? t = y + "px" : y >= h ? t = h + "px" : t = "0px", s.style.top = t, i.set_scroll_position()
            }
        }, !1)
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