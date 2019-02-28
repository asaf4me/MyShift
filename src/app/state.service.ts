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
  private state: boolean;

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

  public getState(): boolean {
    this.state = this.ipc.sendSync('getState');
    return this.state;
  }

  public setState(state) {
    console.log(state);
    this.state = this.ipc.sendSync('setState', state);
  }

}
