class TSGrid {
	caption;
	columns = {};
	rows = [];
	getColumns() {
		return Object.keys(this.columns).map((key) => this.columns[key]);
	}
}


