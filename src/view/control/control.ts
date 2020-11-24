export interface IControl {
	tag: string;
	getHTMLElement(): HTMLElement;
	addClass(className: string): void;
	removeClass(className: string): void;
	setStyle(property: string, value: string | null): void
	setAttribute(attributeName: string, attributeValue: string): void;
	getAttribute(attributeName: string): string | null;
	isVisible: boolean;
}

export var ControlPrefix: string = "control";
