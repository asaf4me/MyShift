import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

declare global {
  interface Window { require: any; }
}
window.require = window.require || {};

@Injectable({
  providedIn: 'root'
})
export class StateService {
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
}
