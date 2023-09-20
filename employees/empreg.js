const mongoose=require('mongoose')

const regschema=mongoose.Schema({
    email:{
        type:String,
        required:[true,'plese enter the email id'],
        unique:[true, 'email id already taken !']
    },
    username:{
        type:String,
        required:[true,'please enter the username']
    },
    password:{
        type:String,
        required:[true,'please enter the password']
    }
},{
    timestamps:true
}
)

module.exports=mongoose.model("user",regschema);