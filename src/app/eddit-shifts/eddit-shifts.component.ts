import { Component, OnInit } from '@angular/core';
import { ShiftsService } from '../shifts.service';

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

	displayedColumns: string[] = ['position', 'day', 'startTime', 'endTime' , 'action'];
	dataSource: PeriodicElement[];

	constructor(private shiftService: ShiftsService) { }

	ngOnInit() {
		this.bulidTable();
	}

	private bulidTable() {
		let temp: PeriodicElement;
		this.shifts = this.shiftService.getShifts();

		this.dataSource = new Array();
		this.shifts.forEach((element: any, index) => {
			temp = { position: ++index, day: element.date, startTime: element.startTime, endTime: element.endTime , action: '0' };
			this.dataSource.push(temp);
		});
	}
}
