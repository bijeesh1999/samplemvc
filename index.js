const express=require('express')
const app=express()

const mongoose=require('mongoose')
// const body=require('body-parser')

app.use(express.json());

// middleware using the connection=========

app.use('/empls',require('./routes/route'));

// =======================================

const empls=require('./employees/emp');




// // router
// app.get('./empls',async(req,res)=>{

//     try{
//         const emps=await empls.find({});
//         // res.send(emps)
//         res.status(200).json(emps)
//     }
//     catch(err){
//         res.status(404).json({message:message.err})
//     }

// })


// get with id

// app.get('/empls/:id',async(req,res)=>{
//     try{
//         const {id}=req.params;
//         const emps=await empls.findById(id);
//         res.status(200).json(emps)
//     }
//     catch(err){
//         console.log(err.message)
//         res.status(404).json({message:err.message})
//     }
// });

// put emp details db

// app.put('/empls/:id',async(req,res)=>{

//     try{
        
//         const {id}=req.params
//         console.log(id)

//         const emp=await empls.findByIdAndUpdate(id ,req.body);
//         // // if emp not found with id
//         if(!emp){
//             return res.status(404).json({message:`cannot find emp with id ${id}`})
//         }
//         const updatedemp=await empls.findById(id)
//         res.status(200).json(updatedemp)
//     }
//     catch(err){
//         console.log(err.message)
//         res.status(404).json({message:err.message})
//     }

// })

// // delete emp from db

// app.delete('/empls/:id',async(req,res)=>{
//     try{
//         const {id}=req.params;
//         const empdel=await empls.findByIdAndDelete(id);
//         if(!empdel){
//             return res.status(404).json({message:`cannot find emp with id ${id}`})
//         }
//         const deletedemp=await empls.findById(id)
//         res.status(200).json(deletedemp)

    
//     }
//     catch(err){
//         console.log(err.message)
//         res.status(404).json({message:err.message})
//     }
// })


// console.log(empls)
app.post('/empls',async(req,res)=>{
    try{
        const emps=await empls.create(req.body)
        res.status(200).json(empls);
        console.log(emps)
    }
    catch(err) {
        console.log(err.message)
        res.status(400).json({message:err.message})
    }
})


mongoose.connect('mongodb+srv://bijeeshbstackup:bijeesh1999@cluster0.8roueeq.mongodb.net/')
.then(()=>{
    console.log('connected to the db ')
    app.listen(2000,()=>{console.log('http://localhost:2000')})

}).catch((err)=>{
    console.log(err)
})