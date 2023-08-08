const mongoose=require('mongoose')

const emplschema=mongoose.Schema({

name:{
type:String
},
fullname:{
type:String
},

},{
    timestamps:true
}

)

module.exports=mongoose.model('empls',emplschema);

