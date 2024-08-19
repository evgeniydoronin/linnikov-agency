import EventEmitter from "./patterns/EventEmitter.js";
window.__cache = window.__cache || new WeakMap();

function createStore(target) {
	window.__cache.set(target, new EventEmitter());
}
Element.prototype.useModule = async function(alias) {
	if (!window.__cache.has(this)) createStore(this);
	const store = window.__cache.get(this);
	if (alias in store) return store[alias];
	return new Promise((resolve) => {
		store.on(alias, () => resolve(store[alias]));
	});
}
Element.prototype.registerModule = function(alias, instance) {
	if (!window.__cache.has(this)) createStore(this);
	const store = window.__cache.get(this);
	store[alias] = instance;
	store.emit(alias);
}