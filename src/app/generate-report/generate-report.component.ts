import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import { ShiftsService } from '../shifts.service';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css']
})
export class GenerateReportComponent implements OnInit {

  private shifts: [];
  constructor(private shiftService: ShiftsService) { }

  ngOnInit() {
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
}
