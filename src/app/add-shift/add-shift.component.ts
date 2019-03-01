import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ShiftsService } from '../shifts.service';
import { StateService } from '../state.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

export interface NewShift {
  date: string;
  startTime: string;
  endTime: string;
}

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styles: []
})
export class AddShiftComponent implements OnInit {

  public generateShiftRes: string;
  public shiftStatus: string;
  public onShift: boolean;
  private newShift: NewShift;

  constructor(private addShiftService: ShiftsService, private stateService: StateService) { }

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
    let now = new Date();
    this.onShift = this.stateService.getState();
    if(this.onShift === false) {
      this.newShift = this.createShift(now);
      this.addShiftService.setShift(this.newShift);
      this.stateService.setState(!this.onShift);
    } else {
      this.newShift = this.updateShift(now);
      this.addShiftService.setShift(this.newShift);
      this.stateService.setState(!this.onShift);
    }
    console.log(this.newShift);
  }

  generatePunch(date: string, start: string, end: string) {
    if (date === '' || start === '' || end === '') {
      this.generateShiftRes = 'Invalid input, Please try again';
      return;
    }
    this.generateShiftRes = '';
  }

  updtateStateStatus() {
    if (this.onShift === true) {
      this.shiftStatus = 'On Shift';
    } else {
      this.shiftStatus = 'Off Shift';
    }
  }

  createShift(shift: Date): { date: string; startTime: string; endTime: string }{
    let date = shift.getDate() + "/" + shift.getMonth() + "/" + shift.getFullYear();
    var time = shift.getHours() + ":" + shift.getMinutes();
    let newShift = { date: date, startTime: time , endTime: '0'};
    return newShift;
  }

  updateShift(now: Date): { date: string; startTime: string; endTime: string } {
    let editedShift = this.addShiftService.getShift();
    editedShift.endTime = now.getHours() + ":" + now.getMinutes();
    return editedShift;
  }


  ngOnInit() {
    this.onShift = this.stateService.getState();
    this.updtateStateStatus();
  }

}
