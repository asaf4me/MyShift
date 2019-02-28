const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

// MongoDB initialize
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/myshifts', { useNewUrlParser: true }).then(
//     () => { },
//     (err) => { process.exit(1); }
// );

// var shift = require('./shiftSchema');
// var state = require('./stateSchema');

module.exports = () => {


    ipcMain.on('setShift', (e, shift) => {
        // FS Version
        var json = JSON.stringify(shift);
        const dataPath = path.join(__dirname, `/data/userShift.json`);
        fs.appendFile(dataPath, json, (err) => {
            if (err) throw err;
        });
    });
}
