const express=require('express')
const app=express()
const path=require('path')
const session=require('express-session') 
const mongoose=require('mongoose');
const errorhandler = require('./midleware/errorh');
const body=require('body-parser')
const multer=require('multer')

// const mongodb=require('connect-mongodb-session')(session)

app.use(express.json());
app.use(body.urlencoded({ extended: true }));


app.use(
    session({
      secret: 'emp_secret_key',
      resave: false,
      saveUninitialized: true

    })
  );

  function isAuth(req, res, next) {
    if (req.session && req.session.userId) {
      console.log(session)
      return next(); 
    } 
    else {
      res.redirect('/empl'); 
    }
  }
  app.use(express.static("empimage"));
app.set('view engine','ejs')
app.use('/css',express.static(path.resolve(__dirname,'collections/css')));
app.use('/img',express.static(path.resolve(__dirname,'collections/img')));
app.use('/js',express.static(path.resolve(__dirname,'collections/js')));
// app.use('/empimage',express.static(path.resolve(__dirname,'empimage')));



// =============path for design connection==================



app.get('/',(req,res) =>{
    res.render('../EJS/landing1')
})

app.get('/emplog',(req,res) =>{
    res.render('../EJS/login')
})

app.get('/newpage',(req,res)=>{
    res.render('../EJS/viewemp');
});


app.get('/empl',isAuth, (req,res)=>{
  res.render('../EJS/main.ejs')
});

// ===============

// app.get('/search/:key',async (req,res)=>{
//     const regex=new RegExp(req.params.key,'i');
//     let search=await empls.find({
//         $or:[
//             {firstName:{$regex : regex}}
//         // console.log(req.params.key)
//         // res.send('correct')
//         ] 

//     });
// res.send(search);
   
// })



// ===========================================================


// middleware using the connection=========

app.use('/empls',require('./routes/route'));
app.use('/',require('./routes/routUser'));
app.use(errorhandler);

// ==================logout===========



// =====================




mongoose.connect('mongodb+srv://bijeeshbstackup:bijeesh1999@cluster0.8roueeq.mongodb.net/')
.then(()=>{
    console.log('connected to the db ')
    app.listen(2000,()=>{console.log('http://localhost:2000')})

}).catch((err)=>{
    console.log(err) 
})
