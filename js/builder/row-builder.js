class TSRowBuilder extends TSBaseBuilder {
	#rows = {};
	primaryColumnName = null;
	grid = null;
	addRow(rowData) {
		TSBaseBuilder.checkRequiredParameter(rowData, "rowData");
		let row = this.configureRowData(rowData);
		this.grid.rows.push(row);
		this.subscribeRowDataEvents(row);
	}
	getItemView() {
		let view = new TSRowView(this.grid);
		return view.getView();
	}
	getRowPrimaryColumnName(row) {
		TSBaseBuilder.checkRequiredParameter(this.primaryColumnName, "primaryColumnName");
		return row[this.primaryColumnName];
	}
	configureRowData(rowData) {
		let row = rowData;
		if (!(rowData instanceof TSBase)) {
			row = Object.create(new TSBase(), this.getRowProps(rowData));
		}
		return row;
	}
	getRowProps(rowData) {
		let props = {};
		let columns = this.getColumns();
		columns.forEach(column => {
			this.setRowProp(props, rowData, column);
		}, this);
		return props;
	}
	setRowProp(props, rowData, column) {
		let columnName = column.name;
		if (column.isTrackedChanges) {
			let valueColumnName = this.getRowPropValueColumnName(columnName);
			this.setRowPropValue(props, valueColumnName, rowData[columnName], true);
			this.setRowPropPropertyChangedValue(props, columnName, valueColumnName);
		} else {
			this.setRowPropValue(props, columnName, rowData[columnName]);
		}
	}
	setRowPropPropertyChangedValue(props, columnName, valueColumnName) {
		props[columnName] = {
			get: function() {
				return this[valueColumnName];
			},
			set: function(value) {
				this[valueColumnName] = value;
				this.onPropertyChanged(columnName);
			}
		};
	}
	setRowPropValue(props, columnName, value, isWritable) {
		props[columnName] = {
			value: value,
			writable: isWritable
		};
	}
	getRowPropValueColumnName(columnName) {
		return "#" + columnName;
	}
	getColumns() {
		return this.grid.getColumns() || [];
	}
	subscribeRowDataEvents(rowData) {
		rowData.on(TSBase.PropertyChangedEventName, this.onRowPropertyValueChange, this);
	}
	unsubscribeRowDataEvents(rowData) {
		rowData.un(TSBase.PropertyChangedEventName, this.onRowPropertyValueChange, this);
	}
	removeRow(primaryColumnValue) {
		TSBaseBuilder.checkRequiredParameter(this.primaryColumnName, "primaryColumnName");
		TSBaseBuilder.checkRequiredParameter(primaryColumnValue, "primaryColumnValue");
		let item = TSUtilities.getItemByKey(this.grid.rows, this.primaryColumnName, primaryColumnValue);
		if (item) {
			this.unsubscribeRowDataEvents(item);
		}
	}
	onRowPropertyValueChange(propertyName, row) {
		debugger;
	}
}
