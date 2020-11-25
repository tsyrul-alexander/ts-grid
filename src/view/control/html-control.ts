import {IControl} from "./control";
import {Event, IEvent} from "../../model/event/event";

export type HtmlElementConstructor<T = {}> = new (...args: any[]) => HTMLElement;

export interface IHtmlControl extends IControl, HTMLElement {}


export function HTMLControl <T extends HtmlElementConstructor>(base: T) {
	return class extends base implements IHtmlControl {
		public clickEvent: IEvent<IControl, MouseEvent> = new Event();
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
		public removeClass(className: string): void {
			this.classList.remove(className);
		}
		public getHTMLElement(): HTMLElement {
			return this;
		}
		init(): void {}
		public connected(): void {
			this.addEventListener("click", this.onClick);
		}
		public disconnected(): void {
			this.removeEventListener("click", this.onClick);
		}
		public onClick(event: MouseEvent): void {
			this.clickEvent.fire(this, event);
		}
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
