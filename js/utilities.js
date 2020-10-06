class TSUtilities {
	static newLine = "\n";
	static emptyFunction = () => {};
	static getItemByKey(items, key, value) {
		for (let i=0;i<items.length; i++) {
			if (items[i].hasOwnProperty(key) && items[i][key] === value) {
				return items[i];
			}
		}
		return null;
	}
	static getItemByObj(items, searchObject) {
		let keys = Object.keys(searchObject);
		return items.filter(item => keys.every(key => searchObject.hasOwnProperty(key) &&
				item[key] === searchObject[key]));
	}
	static removeFromObj(items, searchObject) {
		let findItems = TSUtilities.getItemByObj(items, searchObject);
		findItems.forEach(item => {
			TSUtilities.removeItem(items, item);
		}, this);
	}
	static removeItem(items, value) {
		const index = items.indexOf(value);
		if (index > -1) {
			items.splice(index, 1);
		}
	}
}
