const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/cloudnotes?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = () =>{
  mongoose.connect(mongoURI,()=>{
    console.log("hui hui Connected to mongo db");
  })
}

module.exports = connectToMongo;
