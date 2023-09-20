const express=require('express')

const {userregister,userlogin}=require('../controller/logincontroller')

const router=express.Router();

router.post('/register',userregister);


router.post('/login',userlogin );

router.get('/logout',function(req,res){

        req.session.destroy((err)=>{
            if(err){
                console.log(err)
            }
            res.redirect("/")
        });
        
})

module.exports=router;

