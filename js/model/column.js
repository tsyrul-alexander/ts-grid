class TSColumn {
	name;
	caption;
	type;
	isTrackedChanges;
	constructor(name, caption, type, isTrackedChanges) {
		this.name = name;
		this.caption = caption;
		this.type = type;
		this.isTrackedChanges = isTrackedChanges || false;
	}
}

class ColumnType {
	static number = 0;
	static string = 1;
}

class TSColumnConfig {
	columns;
}
