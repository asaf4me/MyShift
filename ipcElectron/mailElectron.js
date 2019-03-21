const { ipcMain } = require('electron');
const { nodemailer } = require('nodemailer');

module.exports = () => {
    ipcMain.on('sendMail', (e,data)=>{
        console.log("data:" + data);
    });
}
