import { Component, OnInit } from '@angular/core';
import { ShiftsService } from '../shifts.service';

export interface PeriodicElement {
	shift: string;
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
	displayedColumns: string [] = [ 'position', 'shift', 'action' ];
	dataSource: PeriodicElement [];

	constructor(private shiftService: ShiftsService) {}

	ngOnInit() {
    this.bulidTable();
  }

	private bulidTable() {
		this.shifts = this.shiftService.getShifts().split('\n');
		this.shifts.forEach((element, index) => {
			let temp = { position: ++index, shift: element, action: 0 };
			// this.dataSource.push(temp);
		});
	}
}
