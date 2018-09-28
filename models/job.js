const mongoose = require('mongoose');

const jobsSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true 
    },
    description : String,
    companyName: String,
    experience : String,
    qualification : String,
    salary : Number,
    keySkills: String,
    author : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username : String
    }
}); 

module.exports = mongoose.model("job", jobsSchema);