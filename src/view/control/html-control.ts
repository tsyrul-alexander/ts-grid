import {IControl} from "./control";

export interface IHtmlControl extends IControl, HTMLElement {

}
export type HtmlElementConstructor<T = {}> = new (...args: any[]) => HTMLElement;

export function HTMLControl <T extends HtmlElementConstructor>(base: T) {
	return class extends base {
		public tag: string;
		public addClass(className: string): void {
			this.classList.add(className);
		}
		public getHTMLElement(): HTMLElement {
			return this;
		}
	}
}
