import {IControl} from "./control";

export interface IHtmlControl extends IControl, HTMLElement {

}
export type HtmlElementConstructor<T = {}> = new (...args: any[]) => HTMLElement;

export function HTMLControl <T extends HtmlElementConstructor>(base: T) {
	return class extends base {
		public _isInit: boolean = false;
		public tag: string;
		public hideCssClassName: string = "hide-control";
		public get isVisible(): boolean {
			return !this.classList.contains(this.hideCssClassName);
		}
		public set isVisible(value: boolean) {
			if (value) {
				this.classList.remove(this.hideCssClassName);
			} else {
				this.addClass(this.hideCssClassName);
			}
		}
		public setStyle(property: string, value: string | null): void {
			this.style.setProperty(property, value);
		}
		public addClass(className: string): void {
			this.classList.add(className);
		}
		public getHTMLElement(): HTMLElement {
			return this;
		}
		init(): void {

		}
		public connected(): void {}
		public disconnected(): void {}
		connectedCallback() {
			if (!this.isConnected) {
				return;
			}
			if (!this._isInit) {
				this.init();
				this._isInit = true;
			}
			this.connected();
		}
		disconnectedCallback() {
			this.disconnected();
		}
	}
}
