if (typeof Array.prototype.at !== "function") {
	Array.prototype.at = function(idx) {
		return this[idx >= 0 ? idx : this.length + idx];
	}
}