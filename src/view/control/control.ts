export interface IControl {
	tag: string;
	getHTMLElement(): HTMLElement;
	addClass(className: string): void;
	setAttribute(attributeName: string, attributeValue: string): void;
	getAttribute(attributeName: string): string | null;
	isVisible: boolean;
}

export var ControlPrefix: string = "control";
