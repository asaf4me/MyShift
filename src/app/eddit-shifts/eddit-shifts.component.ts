import { Component, OnInit } from '@angular/core';
import { ShiftsService } from '../shifts.service';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface PeriodicElement {
	day: string;
	startTime: string;
	endTime: string;
	position: number;
	action: string;
}

@Component({
	selector: 'app-eddit-shifts',
	templateUrl: `./eddit-shifts.component.html`,
	styles: []
})
export class EdditShiftsComponent implements OnInit {
	private shifts: [];
	public editRowId: any;
	public edit: boolean;

	displayedColumns: string[] = ['position', 'day', 'startTime', 'endTime', 'action'];
	dataSource: PeriodicElement[];

	constructor(private shiftService: ShiftsService) { }

	ngOnInit() {
		this.bulidTable();
	}

	private bulidTable() {
		let temp: PeriodicElement;
		this.shifts = this.shiftService.getShifts();
		this.dataSource = new Array();
		if (this.shifts.length > 0) {
			this.shifts.forEach((element: any, index) => {
				temp = { position: ++index, day: element.date, startTime: element.startTime, endTime: element.endTime, action: '0' };
				this.dataSource.push(temp);
			});
		}
		this.edit = true;
	}

	public removeAll() {
		let res = this.shiftService.removeAll();
		if (res === true) {
			this.bulidTable();
		}
	}

	public removeOne(position: number) {
		let res = this.shiftService.removeOne(position);
		if (res === true) {
			this.bulidTable();
		}
	}

	public editOne(position: number) {
		if (this.edit === true){
			this.editRowId = position;
			this.edit = false;
		}else{
			this.editRowId = -1 * position;
			this.edit = true;
		}

	}

	public done(){
	}
}

