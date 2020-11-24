import {HTMLControl, IHtmlControl} from "../html-control";
import {ControlPrefix, IControl} from "../control";
import {Event, IEvent} from "../../../model/event/event";

export class Button extends HTMLControl(HTMLButtonElement) implements IControl {
	public clickEvent: IEvent<Button, any> = new Event<Button, any>();
	public get isReadOnly(){
		return this.disabled;
	}
	public set isReadOnly(value: boolean){
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
	onButtonClick(this: any, ev: MouseEvent) {
		this.clickEvent.fire(this, ev);
	}
	connected() {
		super.connected();
		this.addEventListener("click", this.onButtonClick);
	}
	disconnected() {
		super.disconnected();
		this.removeEventListener("click", this.onButtonClick);
	}
	public static register(): void {
		customElements.define(ControlPrefix + "-button", Button, {extends: "button"});
	}
}

Button.register();
