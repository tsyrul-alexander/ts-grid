<h1>ts-grid</h1>

Creating a grid to work with data

data:
``` js
    let lookupData = [
    	{value: 1, displayValue: "Man"},
    	{value: 2, displayValue: "Woman"}
    ];
    let data = [
    	{Name: "Sasha", Age: 24, Sex: lookupData[0], SexListValues: lookupData},
    	{Name: "Kate", Age: 23, Sex: lookupData[1], SexListValues: lookupData},
    	{Name: "Test person", Age: 3, Sex: lookupData[1], SexListValues: lookupData}
    ];
```
row class:
```js
class MyRowViewModel extends RowViewModel {
	onPropertyChanged(propertyName) {
		super.onPropertyChanged(propertyName);
		if (propertyName === "Concat") {
			return;
		}
		this.setFullInfo();
	}
	setFullInfo() {
		let name = this.Name;
		let age = this.get("Age");
		let sex = this.get("Sex");
		let sexDisplayValue = sex && sex.displayValue;
		let fullInfoValue = name + " is " + sexDisplayValue + ", " + age + " years old";
		this.set("Concat", fullInfoValue);
	}
}
```
content builder class:
```js
class MyGridContentBuilder extends GridContentBuilder {
	init() {
		super.init();
		this.initColumns();
	}
	initColumns() {
		this.addColumn(new GridColumn("Name", "Name", GridColumnType.string));
		this.addColumn(new GridColumn("Age", "Age", GridColumnType.integer));
		this.addColumn(new GridColumn("Sex", "Sex", GridColumnType.list));
		let concatColumn = new GridColumn("Concat", "FullInfo", GridColumnType.string);
		concatColumn.isReadOnly = true;
		this.addColumn(concatColumn);
	}
	loadData() {
		return new Promise((resolve) => {
			let pageData = Utilities.range(data, this.startRow, this.endRow);
			pageData.forEach(value => {
				let viewModel = this.addRowViewModel(value, MyRowViewModel);
				viewModel.setFullInfo();
			}, this);
			resolve();
		});
	}
}
```
grid: 
```js
let contentBuilder = new MyGridContentBuilder();
contentBuilder.rowCount = data.length;
contentBuilder.pageRowCount = 2;
contentBuilder.init();
let gridContainer = document.getElementById("ts-grid-container");
contentBuilder.render(gridContainer);
contentBuilder.loadGridData();
```
result:
<img src="grid.png" alt="app-image" width="957px" height="142px"/>
