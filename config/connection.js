// 1
const mongoose = require("mongoose")

// 2
const connectionString = process.env.CONNECTIONSTRING

// 3
mongoose.connect(connectionString).then((res)=>{
    console.log("MonogoDB Atals successfully connected with cookpedia Server");
}).catch(err=>{
    console.log("MonogoDB Atlas Connection failed !!!");
    console.log(err);  
})