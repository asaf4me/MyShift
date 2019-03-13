import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ShiftsService } from '../shifts.service';
import { StateService } from '../state.service';
import { MatSnackBar } from '@angular/material';

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

  constructor(private addShiftService: ShiftsService, private stateService: StateService, private snackBar: MatSnackBar) { }

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
    if (this.onShift === false) {
      this.newShift = this.createShift(now);
      let res = this.addShiftService.setShift(this.newShift);
      if (res === false) {
        this.popUp("Punch failed, try again", "", 1000);
        return;
      }
      this.popUp("Punch success", "", 1000);
      this.stateService.setState(!this.onShift);
      this.onShift = !this.onShift;
      this.updtateStateStatus();
    } else {
      this.newShift = this.updateShift(now);
      let res = this.addShiftService.setShift(this.newShift);
      if (res === false) {
        this.popUp("Punch failed, try again", "", 1000);
        return;
      }
      this.popUp("Punch success", "", 1000);
      this.stateService.setState(!this.onShift);
      this.onShift = !this.onShift;
      this.updtateStateStatus();
    }
  }

  generatePunch(date: string, start: string, end: string) {
    if (date === '' || start === '' || end === '') {
      this.generateShiftRes = 'Invalid input, Please try again';
      return;
    }
    this.onShift = this.stateService.getState();
    let newShift = { date: date, startTime: start, endTime: end };
    if (this.onShift === false) {
      let res = this.addShiftService.setShift(newShift);
      if (res === false) {
        this.popUp("Punch failed, try again", "", 1000);
        return;
      }
      this.generateShiftRes = '';
      this.popUp("Punch success", "", 1000);
      this.onShift = !this.onShift;
      this.updtateStateStatus();
    } else {
      this.popUp("You are ON shift, Please click punch to end the previous shift... ", "", 3000);
      return;
    }
  }

  updtateStateStatus() {
    if (this.onShift === true) {
      this.shiftStatus = 'On shift';
    } else {
      this.shiftStatus = 'Off shift';
    }
  }

  createShift(shift: Date): { date: string; startTime: string; endTime: string } {
    let date = shift.getDate() + "/" + shift.getMonth() + "/" + shift.getFullYear();
    var time = shift.getHours() + ":" + (shift.getMinutes() < 10 ? '0' : '') + shift.getMinutes();
    let newShift = { date: date, startTime: time, endTime: '0' };
    return newShift;
  }

  updateShift(now: Date): { date: string; startTime: string; endTime: string } {
    let editedShift = this.addShiftService.getShift();
    editedShift.endTime = now.getHours() + ":" + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    return editedShift;
  }

  popUp(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'bottom',
    });
  }


  ngOnInit() {
    this.onShift = this.stateService.getState();
    this.updtateStateStatus();
  }

}
