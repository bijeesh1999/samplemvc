// const { application } = require("express");


function register(){
    document.getElementById('regmdl').style.top="13%";
    document.getElementById('logbtn').style.display="none";
}

// ============================================================

var empreg=document.getElementById('regmdl')
empreg.addEventListener('submit',(e)=>{
    e.preventDefault()

    // alert("entering")

    var username=document.getElementById('username').value;
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    


    var newreg={
        username:username,
        email:email,
        password:password
    }

    console.log(newreg)
    if(!username ||!email ||!password){
        alert('the fields are empty')
        document.getElementById('torf').style.border="2px solid red";
        document.getElementById('torf').style.color='red';
        document.getElementById('torf').style.right='0%';
        document.getElementById('torf').innerHTML="some fields are mandatory";
        return false;
    }
    else{

    fetch('http://localhost:2000/register',{
        method:'POST',
        headers:{"content-type":"application/json",
        },
        body:JSON.stringify(newreg)  
    })

    .then((res)=>{
        if(res.ok){
        // return res.json();
        document.getElementById('torf').style.right='0%';
        }
        else{
            return res.json().then((err)=>{

                document.getElementById('torf').style.border="2px solid red";
                document.getElementById('torf').style.color='red';
                document.getElementById('torf').style.right='0%';
                document.getElementById('torf').innerHTML="user already exist";

            })

        }
    })


}

})


// // =======================================================


