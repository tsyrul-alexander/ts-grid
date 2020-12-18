import {BaseInputControl} from "./base-input-control";
import {ControlPrefix} from "../control";

export class IntegerControl extends BaseInputControl<number> {
	constructor() {
		super();
		this.initHTMLElementAttributes();
	}
	protected initHTMLElementAttributes(): void {
		this.type = "number";
		this.step = String(1);
	}
	protected onKeyDown(this: GlobalEventHandlers, ev: KeyboardEvent): any {
		let keyCode = ev.keyCode;
		return (keyCode >= 48 && keyCode <= 57);
	}
	public connected() {
		super.connected();
		this.onkeydown = this.onKeyDown;
	}
	public disconnected() {
		super.disconnected();
		this.onkeydown = null;

	}
	public static register(): void {
		customElements.define(ControlPrefix + "-integer", IntegerControl, {extends: "input"});
	}
	public getValue(): number {
		return Number.parseInt(this.value);
	}
}
IntegerControl.register();
