function getSubDomains(domain) {
	const result = [domain];
	let edge = domain.length;
	while ((edge = domain.lastIndexOf(".", edge - 1)) > -1) {
		result.push(domain.slice(0, edge));
	}
	return result;
}
function forEachSubDomain(domain, callback) {
	getSubDomains(domain).forEach(callback);
}
function forEachDomain(domains, callback) {
	domains.split(" ").forEach(callback);
}
export default class EventEmitter {
	constructor() {
		this.__subscribers = {};
	}
	on(domains, callback) {
		forEachDomain(domains, (domain) => {
			if (!(domain in this.__subscribers)) this.__subscribers[domain] = [];
			this.__subscribers[domain].push(callback);
		});
	}
	off(domains, callback) {
		forEachDomain(domains, (domain) => {
			if (domain in this.__subscribers) {
				this.__subscribers[domain] = this.__subscribers[domain].filter(registeredCallback => registeredCallback === callback);
			}
		});
	}
	emit(domains, payload) {
		forEachDomain(domains, (domain) => {
			forEachSubDomain(domain, (subDomain) => {
				if (subDomain in this.__subscribers) {
					this.__subscribers[subDomain].forEach(callback => callback(payload));
				}
			})
		});
	}
}