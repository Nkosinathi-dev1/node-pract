// // require('dotenv').config();

// const nodemailer=require('nodemailer')
// var eUsers=require('./app')

// console.log(eUsers.userName);


// let transporter=nodemailer.createTransport({
//     service: 'gmail',
//     auth:{
//         user:EMAIL,
//         pass:'PASSWORD'
//     }
// })

// let senderEmail='EMAIL';
// let recieverEmail='EMAIL_RECIEVER;
// let heightInMeters=5;
// let emailText="LLLL"

// let mailOptions={
//     from:senderEmail,
//     to:recieverEmail,
//     subject:heightInMeters,
//     text:emailText
// };

// transporter.sendMail(mailOptions,function(err,data){
//     if(err){
//         console.log('Error occured',err);
//     }else{
//         console.log('Email 1 sent');
//     }
// });
