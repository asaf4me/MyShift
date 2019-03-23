import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import { ShiftsService } from '../shifts.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MailService } from '../mail.service';


@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css']
})
export class GenerateReportComponent implements OnInit {

  fromControl = new FormControl('', [
    Validators.required,
  ]);
  toControl = new FormControl('', [
    Validators.required,
  ]);
  passControl = new FormControl('', [
    Validators.required,
  ]);
  repassControl = new FormControl('', [
    Validators.required,
  ]);

  private shifts: [];
  public settings: object[];
  constructor(private shiftService: ShiftsService, private mail: MailService) { }

  ngOnInit() {
    this.loadSettings();
  }

  private getData() {
    return this.shiftService.getShifts();
  }

  private generatePDF(){
    var doc = new jsPDF();
    this.shifts = this.getData();
    let report = [];
    doc.setFontSize(22);
    doc.text(80, 20, 'Shifts Report');
    doc.line(80, 22, 125, 22);
    this.shifts.forEach((element: any, index) => {
      let temp = ++index + "               " + element.date + "               " + element.startTime + "                   " +  element.endTime;
      report.push(temp);
    });
    doc.setFontSize(8).setTextColor(0).setFontType('bold');
    doc.text(55, 30, "Shift No" + "               " + "Shift date" + "                      " + "Shift start" + "                     " + "Shift end");
    doc.setFontSize(12).setTextColor(0).setFontType('');
    doc.text(58, 35, report);
    let now = new Date();
    let date = now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear();
    doc.setFontSize(8).setTextColor(100);
    doc.text(80, 280, 'Report generate date : ' + date);
    doc.save('myShifts.pdf');
  }

  sendMail(from: string, to: string, pass: string, repass: string){
    if(pass !== repass)
    {
      alert("Password dont match");
      return;
    }
    let res = this.mail.sendMail({from: from, to: to, pass: pass});
    if(res === true)
      alert("Your email sent succesfully\n" + "From: " + from + "\nTo: " + to);
    else
      alert("Failed to send email to: " + to);
  }

  clearSettings(){
    let res = this.mail.clearSettings();
    if(res === true)
      this.loadSettings();
  }

  upload(){

  }

  saveSettings(from: string, to: string, pass: string){
    let res = this.mail.saveMailSettings({from: from, to: to, pass: pass});
    if(res === true)
      alert("Your settings successfully saved");
    else
      alert("Failed to save your settings");
  }

  private loadSettings(){
    this.settings = this.mail.getSettings();
  }

}
