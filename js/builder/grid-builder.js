class TSGridBuilder extends TSBaseBuilder {
	#grid;
	#rowBuilder = null;
	#columnBuilder = null;
	get rowBuilder() {
		if (!this.#rowBuilder) {
			this.#rowBuilder = this.getDefaultRowBuilder();
		}
		return this.#rowBuilder;
	}
	get columnBuilder() {
		if (!this.#columnBuilder) {
			this.#columnBuilder = this.getDefaultColumnBuilder();
		}
		return this.#columnBuilder;
	}
	set primaryColumnName(value) {
		this.rowBuilder.primaryColumnName = value;
	}
	constructor(rowBuilder, columnBuilder) {
		super();
		this.#rowBuilder = rowBuilder;
		this.#columnBuilder = columnBuilder;
	}
	init() {
		super.init();
		this.createGrid();
		this.rowBuilder.grid = this.#grid;
		this.columnBuilder.grid = this.#grid;
		this.rowBuilder.init();
		this.columnBuilder.init();
	}
	createGrid() {
		this.#grid = new TSGrid();
	}
	getGrid() {
		return this.#grid;
	}
	getDefaultRowBuilder() {
		return new TSRowBuilder();
	}
	getDefaultColumnBuilder() {
		return new TSColumnBuilder();
	}
	getItemView() {
		let view = new TSGridView(this.#grid);
		return view.getView();
	}
	addRows(rowsData) {
		rowsData.forEach((rowData) => {
			this.addRow(rowData);
		}, this);
	}
	addRow(rowData) {
		this.rowBuilder.addRow(rowData);
	}
	addColumnConfig(columnConfig) {
		this.columnBuilder.addColumnConfig(columnConfig);
	}
	removeRow(primaryColumnValue) {
		this.rowBuilder.removeRow(primaryColumnValue);
	}
}
