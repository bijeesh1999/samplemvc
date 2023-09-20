
const asymchHandler=require('express-async-handler')
const bcrypt=require('bcrypt')
const user=require("../employees/empreg")

const userregister=asymchHandler( async (req,res)=>{
    const {email,username,password}=req.body;
    if (!email||!username||!password){
        res.status(400)
        throw new Error("all fields are mandatory")
    }
    const useravl=await user.findOne({email})
    if (useravl){
        res.status(400)
        throw new Error("user already exist")
    }
    const passhash=await bcrypt.hash(password,12)
    // console.log(passhash)
    const User=await user.create({
        email,
        username,
        password:passhash})
    
    console.log(`user is created ${User}`)

    if(User){
        res.status(200).json({id:User.id,email:User.email})
    }
    
    console.log(`user created ${User}`)
    res.json({message:"user register success"});
})

// =============================================================
// =============================================================

const userlogin=asymchHandler(async(req,res)=>{


    const {email,password}=req.body;

    if(!email || !password){
        res.status(400)
        throw new Error("all fields are mandatory")
    }
    console.log(email,password)
        const User=await user.findOne({email})
        if(!User){
        res.redirect('/')
        }

        var pass = await bcrypt.compare(password, User.password);
        if(!pass){
            res.redirect('/')
            }
                req.session.userId = User._id;
                res.redirect('empl');

    


})

// })

   
module.exports={userregister,userlogin};


// res.redirect('/empl')