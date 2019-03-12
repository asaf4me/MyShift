import { Component, OnInit, Inject } from '@angular/core';
import { ShiftsService } from '../shifts.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
	displayedColumns: string[] = ['position', 'day', 'startTime', 'endTime', 'action'];
	dataSource: PeriodicElement[];

	constructor(private shiftService: ShiftsService, public dialog: MatDialog) { }

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

	public editOne(position: number, day: string, start: string, end: string) {
		const dialogRef = this.dialog.open(EditOneShiftComponent, {
			height: '200px',
			width: '400px',
			data:{
				day: day,
				start: start,
				end: end
			}
		});
	}
}

@Component({
	selector: 'eddit-shift-dialog',
	templateUrl: 'eddit-shift-dialog.html',
})
export class EditOneShiftComponent {
	constructor(public dialogRef: MatDialogRef<EditOneShiftComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any){ }
		
	public done(position: number, day: string, start: string, end: string) {
		this.dialogRef.close();
	}
}