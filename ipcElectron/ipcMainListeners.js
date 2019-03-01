const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
var previousData = require('./data/userShift.json')

module.exports = () => {
    const dataPath = path.join(__dirname, `/data/userShift.json`);
    const statePath = path.join(__dirname, `/data/userState.json`);

    ipcMain.on('setShift', (e, shift) => {
        previousData.push(shift);
        var json = JSON.stringify(previousData, null, 4);
        try{
            fs.writeFileSync(dataPath, json, 'utf8');
            e.returnValue = true; // Retrun to rendered proccess that everything is O.K
        }
        catch (err) {
            console.log(err);
            e.returnValue = false;
        }
    });

    ipcMain.on('getShift', (e) => {
        var lastShift = previousData.pop();
        e.returnValue = lastShift; // Retrun to rendered proccess that everything is O.K
    });


    ipcMain.on('getShifts', (e) => {
        var shifts = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        if (shifts.length === 0) {
            e.returnValue = false;
        }
        e.returnValue = shifts;
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

    function setState(state) {
        var jsonState = JSON.stringify(state);
        fs.writeFile(statePath, jsonState, (err) => {
            if (err) throw err;
        });
    }
}
