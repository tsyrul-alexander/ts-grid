import {HTMLControl, IHtmlControl} from "../html-control";
import {ControlPrefix} from "../control";

export class SvgControl extends HTMLControl(HTMLDivElement) implements IHtmlControl {
	xmlns: string = "http://www.w3.org/2000/svg";
	_svgElement: SVGSVGElement;
	public get viewBoxX(): number {
		let viewBox = this.getSvgViewBox();
		return viewBox.baseVal.x;
	}
	public set viewBoxX(value: number) {
		let viewBox = this.getSvgViewBox();
		viewBox.baseVal.x = value;
	}
	public get viewBoxY(): number {
		let viewBox = this.getSvgViewBox();
		return viewBox.baseVal.y;
	}
	public set viewBoxY(value: number) {
		let viewBox = this.getSvgViewBox();
		viewBox.baseVal.y = value;
	}
	public get viewBoxHeight(): number {
		let viewBox = this.getSvgViewBox();
		return viewBox.baseVal.height;
	}
	public set viewBoxHeight(value: number) {
		let viewBox = this.getSvgViewBox();
		viewBox.baseVal.height = value;
	}
	public get viewBoxWidth(): number {
		let viewBox = this.getSvgViewBox();
		return viewBox.baseVal.width;
	}
	public set viewBoxWidth(value: number) {
		let viewBox = this.getSvgViewBox();
		viewBox.baseVal.width = value;
	}
	public get isFocusable() : boolean {
		//let svg = this.getSvgElement();
		return false;
	}
	public init(): void {
		super.init();
		this.addClass("svg-control");
		this.appendChild(this.getSvgElement());
	}
	protected getSvgViewBox(): SVGAnimatedRect {
		let svg = this.getSvgElement();
		return svg.viewBox;
	}
	protected getSvgElement(): SVGSVGElement {
		if (this._svgElement) {
			return this._svgElement;
		}
		return this._svgElement = <SVGSVGElement>document.createElementNS(this.xmlns, "svg");
	}

	protected createPath(path: string, options: {name: string, value: string}[]): SVGPathElement {
		let pathElement = <SVGPathElement>document.createElementNS(this.xmlns, "path");
		pathElement.setAttributeNS(null, "d", path);
		this.setAttributes(pathElement, options);
		return pathElement;
	}

	protected setAttributes(element: Element, options: {name: string, value: string}[]) {
		if (!options) {
			return;
		}
		options.forEach(option => {
			element.setAttributeNS(null, option.name, option.value);
		}, this);
	}

	public addPath(path: string, options: {name: string, value: string}[] = null): void {
		let pathElement = this.createPath(path, options);
		let svgElement = this.getSvgElement();
		svgElement.appendChild(pathElement);
	}

	public static register(): void {
		customElements.define(ControlPrefix + "-svg", SvgControl, {extends: "div"});
	}
}

SvgControl.register();
