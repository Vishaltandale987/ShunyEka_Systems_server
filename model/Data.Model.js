const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
    {
    
        name: {
            type: String,
          
        },
        email: {
            type: String,
   
        },
    
        phone: {
            type: Number,
   
        },
    },
    { timestamps: false }
);



const DataModel = mongoose.model("shunyEka", DataSchema)
module.exports = {
    DataModel
}


