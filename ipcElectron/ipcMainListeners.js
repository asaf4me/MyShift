const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

module.exports = () => {
    const dataPath = path.join(__dirname, `/data/userShift`);
    const statePath = path.join(__dirname, `/data/userState.json`);

    ipcMain.on('setShift', (e, shift) => {
        fs.appendFile(dataPath, shift, (err) => {
            if (err) e.returnValue = false;
        });
        e.returnValue = true; // Retrun to rendered proccess that everything is O.K
    });

    ipcMain.on('getState', (e) => {
        var state = fs.readFileSync(statePath,'utf8');
        if(state === "") {
            state = false; // First initilize
            setState(state);
        }
        if(state === "true"){
            e.returnValue = true;
        } else {
            e.returnValue = false;
        }   
    });

    ipcMain.on('setState', (e,state) => {
        setState(state);
        e.returnValue = true;
    })

    ipcMain.on('getShifts',(e) => {
        var shifts = fs.readFileSync(dataPath, 'utf8');
        if(shifts === "") {
            e.returnValue = false;
        }
        e.returnValue = shifts;
    });

    function setState(state) {
        var jsonState = JSON.stringify(state);
        fs.writeFile(statePath, jsonState, (err) => {
            if (err) throw err;
        });
    }
}
