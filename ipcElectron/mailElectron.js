const {ipcMain, dialog} = require('electron');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
var mailSettings = require('./data/mailSettings.json');


module.exports = () => {

    const settingsPath = path.join(__dirname, `/data/mailSettings.json`);

    ipcMain.on('sendMail', (e, data) => {
        dialog.showOpenDialog((fileName)=>{
            if(fileName === undefined){
                e.returnValue = false;
            }
            var file = readFile(fileName[0]);
            sendMail(file, data.from, data.to).then((res) => {
                e.returnValue = res;
            })
        });

    });

    ipcMain.on('saveMailSettings', (e, data) => {
        mailSettings[0] = data;
        var json = JSON.stringify(mailSettings, null, 4);
        try{
            fs.writeFileSync(settingsPath, json, 'utf8');
            e.returnValue = true; // Retrun to rendered proccess that everything is O.K
        }
        catch (err) {
            console.log(err);
            e.returnValue = false;
        }
    });

    ipcMain.on('getSettings', (e) => {
        var settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
        if (settings.length === 0) {
            settings = [{from: "From", pass: "Pass", to: "To"}];
        }
        e.returnValue = settings;
    });

    ipcMain.on('clearSettings', (e) => {
        mailSettings = [];
        var json = JSON.stringify(mailSettings, null, 4);
        try{
            fs.writeFileSync(settingsPath, json, 'utf8');
            e.returnValue = true; // Retrun to rendered proccess that everything is O.K
        }
        catch (err) {
            console.log(err);
            e.returnValue = false;
        }
    })
}

function readFile(filePath){
    var file = fs.readFileSync(filePath, 'utf-8');
    if(!file)
        return false;
    return file;
}

async function sendMail(file, from, to) {
    let account = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: account.user, 
            pass: account.pass 
        }
    });

    let mailOptions = {
        from: '<'+ from +'>', // sender address
        to: to, // list of receivers
        subject: "Monthly shift repotrt ✔", // Subject line
        text: "This are my shifts", // plain text body
        attachments: [{'filename': 'Shifts.pdf', 'content': file}]
    };

    let info = await transporter.sendMail(mailOptions);
    if(info){
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return true;
    }
    return false;

}
