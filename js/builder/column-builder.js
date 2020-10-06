class TSColumnBuilder extends TSBaseBuilder {
	grid = null;
	addColumnConfig(config) {
		this.grid.columns[config.name] = config;
	}
}
