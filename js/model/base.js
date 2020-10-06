class TSBase {
	static PropertyChangedEventName = "PropertyChanged";
	events = {};
	onPropertyChanged(propertyName) {
		this.fireEvent(TSBase.PropertyChangedEventName, propertyName, this);
	}
	fireEvent(eventName) {
		if (!this.events.hasOwnProperty(eventName)) {
			return;
		}
		let subscribers = this.getEventSubscribers(eventName);
		subscribers.forEach((subscriber) => {
			this.callSubscriber(subscriber, arguments);
		}, this);
	}
	callSubscriber(subscriber, args) {
		subscriber.fn.apply(subscriber.scope, args);
	}
	on(eventName, fn, scope) {
		if (!this.events.hasOwnProperty(eventName)) {
			this.events[eventName] = {
				subscribers: []
			};
		}
		this.events[eventName].subscribers.push(this.getSubscriberObj(fn, scope));
	}
	un(eventName, fn, scope) {
		if (!this.events.hasOwnProperty(eventName)) {
			throw new TSNullOrEmptyException("Not exist " + eventName);
		}
		let subscribers = this.getEventSubscribers(eventName);
		TSUtilities.removeFromObj(subscribers, this.getSubscriberObj(fn, scope));
		if (subscribers.length === 0) {
			delete this.events[eventName];
		}
	}
	getEventSubscribers(eventName) {
		let event = this.events[eventName];
		return event && event.subscribers;
	}
	getSubscriberObj(fn, scope) {
		return {
			fn: fn,
			scope: scope
		};
	}
}
