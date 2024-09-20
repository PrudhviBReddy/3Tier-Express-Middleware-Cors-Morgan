const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("node:fs");
const path = require("node:path");

const app = express();
app.use(cors());
// app.use(morgan("tiny"));
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

let emwf1 = (req,res,next)=>{
    console.log("inside emwf1");
    next();
};

let emwf2 = (req,res,next)=>{
    console.log("inside emwf2");
    next();
};

let emwf3 = (req,res,next)=>{
    console.log("inside emwf3");
    next();
};

app.use(emwf1);
app.use(emwf2);
app.use(emwf3);

app.get("/lists",async(req,res)=>{

    let countriesList = await Employee.find().distinct("country");

    let departmentsList = await Employee.find().distinct("department");

    let gendersList = await Employee.find().distinct("gender");

    let listsObj = {
        countries:countriesList,
        departments:departmentsList,
        genders:gendersList,
    };

    res.json(listsObj);
});

app.get("/getEmployees",async(req,res)=>{
    console.log(req.query);

    let employeesData = await Employee.find().and([
        {country:req.query.country}, 
        {department: req.query.department},
        {gender:req.query.gender},
    ]);
    //.distinct("country");
    //.distinct("department");
    //.sort("country department");
    //.select("-email");
    //.or();
    //.countdocument();
    //.and([{country:"Russia"},{gender:"Male"},{age:{$gte:18, $lte:40}}]);
    res.json(employeesData);
});



app.get("/getEmployees/:country/:department/:gender",
    emwf1,
    emwf2,
    emwf3,
    async(req,res)=>{
        console.log("inside callback fn"); 
    console.log(req.params);

    let employeesData = await Employee.find().and([
        {country:req.params.country}, 
        {department: req.params.department},
        {gender:req.params.gender},
    ]);
   
    res.json(employeesData);
});

app.listen(4567,()=>{
    console.log("Listening to port 4567");
});

let employeeSchema = new mongoose.Schema({
    id:Number,
    firstName:String,
    lastName:String,
    email:String,
    gender:String,
    age:Number,
    country:String,
    department:String,
    profilePic:String,
});

let Employee = new mongoose.model("employee", employeeSchema);

// let getEmployeesFromDB = async ()=>{

//     let employeesData = await Employee.find();
//     console.log(employeesData);
// }

let connectToMDB = async ()=>{

    try{
        mongoose.connect("mongodb+srv://prudhvireddy:prudhvireddy@prudhvib.jwu4g.mongodb.net/Tata?retryWrites=true&w=majority&appName=PrudhviB");
        console.log("Successfully connected to MDB");
        //getEmployeesFromDB();
    }catch(err){
        console.log(err);
        console.log("Unable to connect to MDB");
    }
    };

    connectToMDB();
