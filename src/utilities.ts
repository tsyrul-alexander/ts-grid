import {RequiredException} from "./exception/required-exception";

export class Utilities {
	static functionName: string = "function";
	static newLine: string = "\n";
	static getItemByKey<T extends object>(items: T[], key: string, value: any): T | null {
		for (let i=0;i<items.length; i++) {
			if (items[i].hasOwnProperty(key) && items[i][key] === value) {
				return items[i];
			}
		}
		return null;
	}
	static getItemByObj<T>(items: T[], searchObject: any): T | null {
		let result = Utilities.getItemsByObj<T>(items, searchObject);
		return result && result[0];
	}
	static getItemsByObj<T>(items: T[], searchObject: any): T[] {
		let keys = Object.keys(searchObject);
		return items.filter(item => keys.every(key => searchObject.hasOwnProperty(key) &&
				item[key] === searchObject[key]));
	}
	static removeFromObj<T>(items: T[], searchObject: any): void {
		let findItems = Utilities.getItemsByObj<T>(items, searchObject);
		findItems.forEach(item => {
			Utilities.removeItem(items, item);
		}, this);
	}
	static removeItem(items: any[], value: any): void {
		const index = items.indexOf(value);
		if (index > -1) {
			items.splice(index, 1);
		}
	}
	static checkRequiredParameter(value: any, name: string): void {
		if (!value) {
			throw new RequiredException("property " + name + "isRequired");
		}
	}
	static destroyObject(obj: {destroy: () => {}}) {
		if (obj) {
			obj.destroy();
		}
	}
	public static range<T>(array: T[], start: number, end: number): T[] {
		let ans = [];
		for (let i = start; i < end; i++) {
			if (array.length <= i) {
				break;
			}
			ans.push(array[i]);
		}
		return ans;
	}
}
