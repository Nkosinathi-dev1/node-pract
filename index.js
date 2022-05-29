require('dotenv').config()
const express=require("express")
const app=express()
const mongoose=require('mongoose')
const userModel = require("./models/Users")
const UserModel=require('./models/Users')
const cors=require('cors')
app.use(express.json());
app.use(cors());
const bodyParser=require('body-parser')
const {check,validationResult}=require('express-validator')
const path=require('path');

const urlencodedParser=bodyParser.urlencoded({extended:false})

const PORT=process.env.PORT || 5000;


const nodemailer=require('nodemailer')
const { config } = require("bluebird")


password=process.env.EMAIL;
uri=process.env.URI;
password=process.env.PASSWORD;



mongoose.connect(uri)



//Get Method
app.get("/getUsers",(req,res)=>{
    UserModel.find({}, (err,results)=>{
        if(err){ 
            res.json(err)
        }else{
            let count=0;
            let sum=0;
            let avg=0;
       
            const temp=results.map((user)=>user.height);            
            for (const val of temp) {
                sum+=val;
                count++;
                console.log(val);
            }
            avg=sum/count;
            let avgObj={avgVal:avg}

            console.log('got data ='+avgObj.avgVal);
            //Returning average height object
            //res.json(results)
            res.json(avgObj)
        }
    })
})



//Post Method
app.post("/createUser", urlencodedParser,[
    check('name','Please provide a user name')
        .isLength({min:1})
        .isAlpha(),
    check('email','email is not valid ')
        .isEmail()
        .normalizeEmail(),
    check('height','Height must be a positive number with less than 5 digits')
        .exists()
        .isNumeric()
        .notEmpty()
        .isLength({min:1,max:5}),//prevent bad data
], async (req,res)=>{

    const erros=validationResult(req)
        if(!erros.isEmpty()){
            return res.status(422).jsonp(erros.array())
            
        }

    const user=req.body
    const newUser=new userModel(user);
    await newUser.save();
    console.log(`Name: ${user.name}  Height: ${user.height} meters  avg: ${user.avg}  email ${user.email}`);

    let mailOptions={
        from:'nkosinathidev2022@gmail.com',
        to:user.email,
        subject:"Height in meters",
        text:`Hi, ${user.name} your height is ${user.height} meters and the average height of all previous submission is ${user.avg} meters.     Thank You, Height Test `
    };

    let transporter=nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:'nkosinathidev2022@gmail.com',
            pass:password
        }
    });

    transporter.sendMail(mailOptions,function(err,data){
        if(err){
            console.log('Error occured',err);
        }else{
            console.log(emailText);
            console.log('Email 1 sent');
        }
    });

    res.json(user)
   
})


//Create app.use
//syntax app.use('something',some)

//serve static assets if in production
if(process.env.NODE_ENV==='production'){
    //set a static folder
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}



app.listen(PORT,()=>{
    console.log('Server is Up');
})