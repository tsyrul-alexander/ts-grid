import {HTMLControl, IHtmlControl} from "../html-control";
import {ControlPrefix, IControl} from "../control";

export class Button extends HTMLControl(HTMLButtonElement) implements IControl {
	public get isReadOnly() {
		return this.disabled;
	}
	public set isReadOnly(value: boolean) {
		this.disabled = value;
	}
	public set content(control: IHtmlControl) {
		this.appendChild(control);
	}
	public get content(): IHtmlControl {
		return <IHtmlControl>this.children.item(0);
	}
	public set caption(value: string) {
		this.textContent = value;
	}
	public get caption(): string {
		return this.textContent;
	}

	init(): void {
		super.init();
		this.addClass("button-control");
	}
	public static register(): void {
		customElements.define(ControlPrefix + "-button", Button, {extends: "button"});
	}
}

Button.register();
