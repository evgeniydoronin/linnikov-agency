const nativeAppend = HTMLElement.prototype.append;
HTMLElement.prototype.append = function (...args) {
		console.log("patch");
	return nativeAppend.apply(this, args);
}
window.HTMLElement = new Proxy(HTMLElement, {
	construct: function(target, args) {
			console.log("Construct");
		return new target(args);
	}
});