export default function(options = {}) {
	// plugin_options: plugin-specific options
	// this: TomSelect instance
	this.hook('after', 'setup', () => {
		const arrowElem = document.createElement("span");
		arrowElem.classList.add("icon-nav-check-arrow", "ts-state-indicator");
		this.control.append(arrowElem);
	});
	this.hook('after', 'open', () => {
		this.dropdown.classList.add("open");
		this.dropdown.setAttribute("aria-hidden", false);
	});
	this.hook('after', 'close', () => {
		this.dropdown.classList.remove("open");
		this.dropdown.setAttribute("aria-hidden", true);
		this.blur();
	});
};
