const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema ({

    name : {
        type:String,
        reqired : true
    },
    age:{
        type:Number,
        required: true
    },
   gender:{
        type:String,
        required: true
    },
    status:{type:Boolean, required:false, default:true}
})

const Student =  mongoose.model("Student",studentSchema);

module.exports= Student;