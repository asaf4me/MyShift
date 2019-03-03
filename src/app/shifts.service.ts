import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

declare global {
  interface Window { require: any; }
}
window.require = window.require || {};

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {
  private ipc: IpcRenderer | undefined = void 0;

  constructor() {
    if (window.require) {
      try {
        this.ipc = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron\'s IPC was not loaded');
    }
  }

  public getShift(){ //Return the last shift in th json file
    return this.ipc.sendSync('getShift');
  }

  public getShifts(){
    return this.ipc.sendSync('getShifts');
  }

  public setShift(shift): any { // sending the data back to electron
    return this.ipc.sendSync('setShift', shift);
  }

  public removeAll(){
    return this.ipc.sendSync('removeAll');
  }

  public removeOne(position: number){
    return this.ipc.sendSync('removeOne', position);
  }

  public editOne(date: string, start: string, end: string){

  }

}
