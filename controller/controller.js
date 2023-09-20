
const asyncH=require("express-async-handler")

const empls=require('../employees/emp');

const multer=require('multer')

const path = require('path');
const { error } = require("console");

const empimg=multer({dest:"empimage/"})

// ============get all employee====================

const getEmployee = asyncH(async(req,res)=>{

    const emps=await empls.find({});
    res.status(200).json(emps)

})

// ========================================


// ===============multer================

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "empimage")
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
}).single('image');



// =====================================

const postEmployee = asyncH(async(req, res) => {
    upload(req, res, async(error)=>{
        if (error instanceof multer.MulterError) {
          return  res.status(400).json({ error: "image error"+error });
        } 
        else if (error) {
          return  res.status(500).json({ error: "server error "+ error });
        } else {
            var {
                salutation, adress, city, country, dob, gender, email, firstName, lastName, username,password, phone, pin, qualifications, state} = req.body;
            console.log(salutation, adress, city, country, dob, email, firstName, lastName, username,
                password, phone, pin, qualifications, state, gender);


            if (!salutation || !adress || !city || !country || !dob || !gender || !email || !firstName || !lastName || !username || !password || !phone || !pin || !qualifications || !state ) {
                res.status(400);
                throw new Error('all fields are mandatory');
                return;
            }
            if (!req.file) {
                res.status(400).json({ error: "image mandatory" });
            } 
            else {
                console.log(req.file);
                const emps = await empls.create({
                    salutation,
                    adress,
                    city,
                    country,
                    dob,
                    email,
                    firstName,
                    lastName,
                    username,
                    password,
                    phone,
                    pin,
                    qualifications,
                    state,
                    gender,
                    image:req.file
                });
                

                res.status(200).json(empls);
                console.log(emps);
            }
        }
    });
});


        
    // })

  
const getOneEmployee = asyncH(async(req,res)=>{ 
    
        const {id}=req.params;
        const emps=await empls.findById(id);
        if(!emps){
            res.status(400);
            throw new Error("emoloyee not found");
        }
        res.status(200).json(emps)


})
const putOneEmployee=asyncH(upload,async(req,res)=>{
            const {id}=req.params
            console.log(id)

// ============img===============

if(req.file.filename){
    console.log(req.file.filename)
}
// ==========================
    
            const emp=await empls.findByIdAndUpdate(id ,req.body);
            // // if emp not found with id
            if(!emp){
                res.status(404);
                throw new Error(`cannot find emp with id ${id}`);
            }
            res.status(200).json(emp)
        

    })
const delOneEmployee=asyncH(async(req,res)=>{
            
                const {id}=req.params;
                const empdel=await empls.findByIdAndDelete(id);
                if(!empdel){
                    res.status(404)
                    throw new Error(`cannot find emp with id ${id}`);
                }
                res.status(200).json(empdel);
        })

    const employeesrch=asyncH(async (req,res)=>{
    const regex=new RegExp(req.params.key,'i');
    let search=await empls.find({
        $or:[
            {firstName:{$regex : regex}}
        // console.log(req.params.key)
        // res.send('correct')
        ]

    });
res.send(search);
   
})


module.exports = {getEmployee,postEmployee,getOneEmployee,putOneEmployee,delOneEmployee,employeesrch};




