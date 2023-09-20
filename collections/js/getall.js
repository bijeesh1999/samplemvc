let si=1;
let row="";
fetch('http://localhost:2000/empls')

.then((res)=>res.json())
.then(getemp =>{console.log(getemp);
    const EmpTable=document.getElementById('EmpTable');
    EmpTable.innerHTML="";
    
 
    
    getemp.forEach((emp)=> {

        const id=emp._id;
        const originalString = emp.image.path;
const updatedString = originalString.replace(/^empimage\\/, '');
        
        EmpTable.innerHTML+=`
                <tr class="details">
                    <td>${si}</td>
                    <td class="td"><div class="employee"><img src="${updatedString}">
                    </div>${emp.firstName +" "+emp.lastName}</td> 
                    <td>${emp.email}</td>
                    <td>${emp.phone}</td>
                    <td>${emp.gender}</td>
                    <td>${emp.state}</td>
                    <td>${emp.country}</td> 
                    <td> 
                        <button class="dropdown" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-ellipsis"></i>
                        </button>

                        <ul class="dropdown-menu "id="boot" aria-labelledby="dropdownMenuButton1">
                            <button class="action"><a class="link" href="/newpage?id=${id}"><i class="fa fa-sharp fa-light fa-eye" id="buttonDropdown_action" ></i>view</a></button>
                
                            <button class="action" data-bs-toggle="modal" data-bs-target="#viewempmodal" onclick="update('${id}')"><i class="fa fa-sharp fa-light fa-pen" id="buttonDropdown_action"></i>edit</button>
                
                            <button class="action" onclick="deldet('${id}')"><i class="fa fa-sharp fa-light fa-trash" ></i>delete</button>
                        </ul>
                    </td> 
                </tr>`;

si++;
                         
    })

   

    // ============================pagination===============================

    // var total=si-1;
    // alert(total)

    var tr=document.getElementsByClassName('details');
var page=document.getElementById('pageno');
var display=5;
var count=1;
var pagnos=Math.ceil(tr.length / display)
console.log(pagnos)

for(i=1 ; i<=pagnos ; i++){
    var buttn=document.createElement('button');
    buttn.innerHTML=i;
    page.appendChild(buttn);
}

document.getElementById('prevbtn').addEventListener('click',prev)
document.getElementById('nextbtn').addEventListener('click',next)

// document.getElementById('prevbtn').setAttribute('disabled',true)

function main(pages){
    var nextpage=display * pages;
    var prevpage=display * (pages - 1)

    // console.log(nextpage)
    // console.log(prevpage)
    // console.log(tr.length)

    for(i=0 ; i<tr.length ; i++){
        tr[i].style.display="none";
        if(i < nextpage && i >= prevpage){
            tr[i].style.display ="table-row";

        }
    }
}
main(1);

var pagenos=page.getElementsByTagName('button');
for(i=0;i<pagenos.length;i++){
    pagenos[i].addEventListener('click',btnclick)
}

// pagenos[count - 1].classList.add("buttncolor")
function btnclick(){
    console.log(this.innerHTML)
    // pagenos[count-1].classList.remove('acolor')
    // if(this.innerHTML == pagnos){
        // document.getElementById('nextbtn').setAttribute("disabled",true);
        // document.getElementById('prevbtn').removeAttribute("disabled");

    // }
    count=this.innerHTML;
    main(count);
    this.classList.add('buttncolor')

}

function next(){

    if(count !== pagnos){
    // alert('next')
    count ++;
}
    main(count);
}
function prev(){
    if(count !== 1){
        // alert('next')
        count --;
        console.log(count)
    }
    main(count);

}




})

// reload(); 

// ============================//pagination===============================

// ===============================  get alll employeeee  end========================================


// ============================del emp using emp_id==================

function deldet(id){
    // alert(id);

    var pop=document.getElementById("del")
    document.getElementById("popup").style.visibility="visible";

    pop.addEventListener('click',()=>{
        fetch(`http://localhost:2000/empls/${id}`,{
            method:"DELETE",

    })

    .then((res) => {
        if(res.ok) {
            document.getElementById("popup").style.visibility="hidden";

    refresh();
    
        }
    })

    })

   


}

// =================================================================================

// =================================update employee===================================



function update(id){


    fetch(`http://localhost:2000/empls/${id}`,{
        method:'GET'  
    })

    .then(res => res.json())
    .then(empls =>{
        let empdate = new Date(empls.dob)
        console.log(empdate)
        

        const originalString = empls.image.path;
        const updatedString = originalString.replace(/^empimage\\/, '');

        var editimg=document.getElementById('editimg')
        editimg.innerHTML=`<img src="${updatedString}">`



        var salutations=document.getElementsByClassName('salutation')
        const salutation=empls.salutation
        for(var i=0 ; i < salutations.length ; i++){
            if(salutations[i].value === salutation){
                salutations[i].selected=true;
            }
        }

        // ==================================================
    
        document.getElementById("validation01").value=empls.firstName;

        document.getElementById("validation02").value=empls.lastName;

        document.getElementById("Email").value=empls.email;

        document.getElementById("typephone").value=empls.phone;

        document.getElementById("Username").value=empls.username;

        document.getElementById("Password").value=empls.password;

        var exatdate=empdate.toISOString().split('T')[0];
         document.getElementById("date1").value=exatdate;
  
        var radio=document.getElementsByName('newgender')
        const userradio=empls.gender
        for(var i=0 ; i < radio.length ; i++){
            if(radio[i].value === userradio){
                radio[i].checked=true;
            }
        }
        // const radio = document.querySelector(`input[name="newgender"][value="${empls.gender}"]`,true);


         document.getElementById("qualification").value=empls.qualifications;
 
         document.getElementById("form7Example4").value=empls.adress;
 
        //  document.getElementById("Country").value=empls.country;
        var countrys=document.getElementsByClassName('bharat')
         const country=empls.country;
         for(i=0;i<countrys.length;i++){
            if(countrys[i].value==country){
                countrys[i].selected=true;
            }
         }


        //  ==================================
 
        //  document.getElementById("state").value=empls.state;
        var states=document.getElementsByClassName('states')
        const state=empls.state;
        for(i=0;i<states.length;i++){
           if(states[i].value==state){
               states[i].selected=true;
           }
        }
 
         document.getElementById("City").value=empls.city;

        
 
         document.getElementById("pinno").value=empls.pin;

    })


    var empupdate=document.getElementById('formupdate')
    empupdate.addEventListener('submit',(e)=>{
        e.preventDefault();


        // var newsal=document.getElementsByClassName('salutation').value;
        // console.log(newsal)
        var newfile=document.getElementById('editfile')
        var filepath=newfile.files[0];


        let empobj={

            salutation:document.getElementById('User').value,
            firstName:document.getElementById('validation01').value,
            lastName:document.getElementById('validation02').value,
            email:document.getElementById('Email').value,
            phone:document.getElementById('typephone').value,
            username:document.getElementById('Username').value,
            password:document.getElementById('Password').value,
            dob:document.getElementById('date1').value,

            gender:document.querySelector( 'input[name="newgender"]:checked').value,  

            qualifications:document.getElementById('qualification').value,
            adress:document.getElementById('form7Example4').value,
            country:document.getElementById('country').value,
            state:document.getElementById('states').value,
            city:document.getElementById('City').value,
            pin:document.getElementById('pinno').value

        }

        console.log(empobj.salutation,empobj.firstName,empobj.lastName,empobj.email,empobj.phone,empobj.username,empobj.password,empobj.dob,empobj.gender,empobj.qualifications,empobj.adress,empobj.country,empobj.state,empobj.city,empobj.pin)
        console.log(filepath)


        fetch(`http://localhost:2000/empls/${id}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify(empobj),
        })

        .then(res=>res.json)
        
        // document.getElementById("edit").style.display="grid";


    })
    

}

// update();


// ==========================update emp end======================


//============================create new employee===================

var newemp=document.getElementById('addmodal')

newemp.addEventListener('submit',(e)=>{
    e.preventDefault();

    validation()

    var salutation=document.getElementById('user').value;
    var firstname=document.getElementById('validationCustom01').value;
    var lastname=document.getElementById('validationCustom02').value;
    var email=document.getElementById('Email1').value;
    var phone=document.getElementById('typePhone').value;
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    var date=document.getElementById('date').value;
    // var gender=document.getElementsByName('Gender').value;
// =============================gender====================
var radio=document.getElementsByName('Gender');
for(var i=0;i<radio.length;i++){
    if(radio[i].checked){
        var gender=radio[i].value
    }
}
// =========================================

    var qualifications=document.getElementById('Qualification').value;
    var address=document.getElementById('homename').value;
    var country=document.getElementById('Country').value;
    var state=document.getElementById('state').value;
    var city=document.getElementById('city').value;
    var pin=document.getElementById('pin').value;

    console.log(salutation,firstname,lastname,email,phone,username,password,date,qualifications,address,country,state,city,pin)

    var fileimg=document.getElementById('formFile');
    console.log(fileimg.value)
    var imgfile=fileimg.files[0];
    // console.log(imgfile)
   




    var newform=new FormData();

    newform.append('image',imgfile);
    newform.append('salutation',salutation);
    newform.append('firstName',firstname);
    newform.append('lastName',lastname);
    newform.append('phone',phone);
    newform.append('username',username);
    newform.append('password',password);
    newform.append('dob',date);
    newform.append('gender',gender);
    newform.append('qualifications',qualifications);
    newform.append('adress',address);
    newform.append('email',email);
    newform.append('country',country);
    newform.append('state',state);
    newform.append('city',city);
    newform.append('pin',pin);

    
    fetch("http://localhost:2000/empls",{
        method:'POST',
        body:newform,
    
    })


    .then((res)=> res.json())
    .then(data =>{
        console.log(data)
    })



    
});


// ===========================search================================

function employees(){
    let input=document.getElementById('sbar').value
    input=input.toLowerCase();
    let tag=document.getElementsByTagName('tr')

    for(i=0;i<tag.length;i++){
        if(!tag[i].innerHTML.toLowerCase().includes(input)){
            tag[i].style.display="none";
        }
        else{
            tag[i].style.display="table-row";
        }
    }
}

function reload(){
    location.reload();
}

// =================================================

// ================validation==========================




function validation(){
    var first=document.getElementById("validationCustom01").value;
    var regName = (/^[a-zA-Z]/);
    if(regName.test(first)){

         document.getElementById("validationCustom01").style.border= "1px solid green";
        //  alert("valid username");
    }  
    else{
        document.getElementById("validationCustom01").style.border= "1px solid red";
        document.getElementById("validationCustom01").focus();
        // alert("incorrect")
        return false;
    }

    
    var secondn=document.getElementById("validationCustom02").value;
    if(regName.test(secondn)){
        document.getElementById("validationCustom02").style.border="1px solid green";
        
    }else{
        document.getElementById("validationCustom02").style.border="1px solid red";
        document.getElementById('validationCustom02').focus();
        // alert("incorrect")
        return false;
    }


    var gmail=document.getElementById("Email1").value;
    // alert("incorrect")
    // var regex = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})$/;
    if(gmail==""){
        document.getElementById("Email1").style.border="1px solid red";
        document.getElementsById("Email1").focus();
        return false;

    }
    else{
        document.getElementById("Email1").style.border="1px solid green !important";
        // alert("correct");

    }


    var phno=document.getElementById("typePhone").value;
    var phoneno =(/^[7-9][0-9]{9}/);
    if(phoneno.test(phno)){
        document.getElementById("typePhone").style.border="1px solid green";
        
    }else{
        document.getElementById("typePhone").style.border="1px solid red";
        document.getElementById('typePhone').focus();
        // alert("")
        return false;
    }



    var usern=document.getElementById("username").value;
    // var nameRegex = (/^[a-zA-Z\-]+$/);
    if(regName.test(usern)){
        document.getElementById("username").style.border="1px solid scagreen";
        
    }else{
        document.getElementById("username").style.border="1px solid red";
        document.getElementById('username').focus();
        // alert("incorrect")
        return false;
    }



    // var pass=document.getElementById("").value;
    // var passw=  (/^[A-Za-z]\w{7,14}/);
    //     if(passw.test(pass)){
    //     document.getElementById("password").style.border="1px solid green";
        
    // }else{
    //     document.getElementById("password").style.border="1px solid red";
    //     document.getElementById("password").focus();
    //     // alert("incorrect")
    //     return false;
    // }


    var dob=document.getElementById("date").value;
    if(dob==""){
        document.getElementById("date").style.border="1px solid red";
        document.getElementById("date").focus();
        return false;

    }else{
        document.getElementById("date").style.border="1px solid green";
           
    }


    var qlfc=document.getElementById("Qualification").value;
    if( qlfc!=""){
        document.getElementById("Qualification").style.border="1px solid green";

    }else{
        document.getElementById("Qualification").style.border="1px solid red";
            document.getElementById("Qualification").focus();
            // alert("incorrect")
            return false;
    }


    var adrs=document.getElementById("homename").value;
    if(adrs!=""){
        document.getElementById("homename").style.border="1px solid green";
        // alert("correct");
        

    }else{
        document.getElementById("homename").style.border="1px solid red";
            document.getElementById("homename").focus();
            // alert("incorrect")
            return false;
    }


    var city=document.getElementById("city").value;
    if(city!=""){
        document.getElementById("city").style.border="1px solid green";
        // alert("correct");
        

    }else{
        document.getElementById("city").style.border="1px solid red";
            document.getElementById("city").focus();
            // alert("inczorrect")
            return false;
    }


    var pinno=document.getElementById("pin").value;
    if(pinno!=""){
        document.getElementById("pin").style.border="1px solid green";
        // alert("correct");
        

    }else{
        document.getElementById("pin").style.border="1px solid red";
            document.getElementById("pin").focus();
            // alert("incorrect")
            return false;
    }


   if (true){

    // document.getElementById("staticBackdrop").style.display="none";
    // document.getElementsByClassName("modal-backdrop").style.display="none";


   }

   reload();

};


//========================flash img===================

var input=document.getElementById('formFile')
var newimg=document.getElementById('singleimg')
input.addEventListener('change',flashimg);

function flashimg(){
    let img=URL.createObjectURL(input.files[0])
    let imgsrc=document.createElement('img');
    imgsrc.src=img;
    newimg.textContent="";
    newimg.appendChild(imgsrc)
}

var editinput=document.getElementById('editfile')    //editing image input file
var newedit=document.getElementById('editimg')       //appending place
editinput.addEventListener('change',editimg);

function editimg(){
    let editimg=URL.createObjectURL(editinput.files[0])
    let imgsrc=document.createElement('img');
    imgsrc.src=editimg;
    newedit.textContent="";
    newedit.appendChild(imgsrc)
}



// 





