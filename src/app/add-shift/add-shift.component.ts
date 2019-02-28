import { Component, OnInit } from '@angular/core';
declare function require(name: string);
const dateFormat = require('dateformat');
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ShiftsService } from '../shifts.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styles: []
})
export class AddShiftComponent implements OnInit {

  public generateShiftRes: string;
  public punchShiftRes: string;
  public punchShiftTrue: boolean;
  public punchShiftFalse: boolean;
  public onShiftStatus: boolean;
  public shiftStatus: string;

  constructor(private addShiftService: ShiftsService) { }

  dateFormControl = new FormControl('', [
    Validators.required,
  ]);
  startTimeFormControl = new FormControl('', [
    Validators.required,
  ]);
  endTimeFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcherDate = new MyErrorStateMatcher();
  matcherSTime = new MyErrorStateMatcher();
  matcherETime = new MyErrorStateMatcher();

  autoPunch() {
    const now = new Date();
    const autoShift = dateFormat(now, 'dddd mmmm yyyy h:MM TT');
    const res = this.addShiftService.setShift({autoShift}); // fetch the data to electron using ipcRenderer
    if (res === true) {
      this.punchShiftRes = 'PUNCH SUCCESS: ' + autoShift;
      this.punchShiftTrue = true;
      this.punchShiftFalse = false;
      return;
    }
    this.punchShiftRes = 'Punch FAILED, TRY AGAIN';
    this.punchShiftFalse = true;
    this.punchShiftTrue = false;
  }

  generatePunch(date: string, start: string, end: string) {
    if (date === '' || start === '' || end === '') {
      this.generateShiftRes = 'Invalid input, Please try again';
      return;
    }
    this.generateShiftRes = '';
  }

  ngOnInit() {
  }

}
