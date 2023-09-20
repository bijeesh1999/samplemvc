// ========================employee view=====================

let userid=new URLSearchParams(document.location.search)
let id=userid.get("id");


function emplview(id){




    fetch(`http://localhost:2000/empls/${id}`,{
        method:'GET',
    })

 

    .then(res=>res.json())
    .then(employ =>{

        const originalString = employ.image.path;
        const updatedString = originalString.replace(/^empimage\\/, '');
        console.log(updatedString)
        
        let empdate = new Date(employ.dob)
        var exatdate=empdate.toISOString().split('T')[0];
     

        var empdetails=document.getElementById("employeedet");

        empdetails.innerHTML=`

        <div class="empdet">
        <div class="bgimg">
            <img src="img/empbg.png" alt="">
            <div class="empfinal">
                <img src="${updatedString}">
            </div>
            <div class="namemale">
                <div class="name">
                    <h3>${employ.firstName +" "+ employ.lastName}</h3>
                </div>
                <div class="email">
                    <p>${employ.email}</p>
                </div>
            </div>
        </div>
        <div class="row profile">
            <div class="col"> <label for="">Gender</label><p>${employ.gender}</p></div>
            <div class="col" id="age"><label for="">Age</label><p id="ageof"></p></div>
            <div class="col"><label for="">Date of Birth</label><p>${exatdate}</p></div>
        </div>
        <div class="row profile">
            <div class="col"> <label for="">MObile number</label><p>${employ.phone}</p></div>
            <div class="col"> <label for="">Qualifications</label><p>${employ.qualifications}</p></div>
            <!-- <div class="col"></div> -->
        </div>
        <div class="row profile">
            <div class="col"> <label for="">Address</label><p>${employ.adress}</p></div>
            <div class="col"> <label for="">Username</label><p>${employ.username}</p></div>
            <!-- <div class="col"></div> -->
        </div>
        <div class="row profile probtn mb-0">
            <div class="buttoncol">
                <button class="btn btn-danger py-3 px-4">Delete</button>
                <button class="btn btn-primary py-3 px-4">Edit Details</button>
            </div>
        </div>
        
      </div> `;


      var ymd=employ.dob;
    //   alert(ymd)
      var age=getage(ymd)

      document.getElementById('ageof').innerHTML=age;

      function getage(ymd){

        var birthDate = new Date(ymd);
        var currentDate = new Date();
       console.log(currentDate);
       console.log(birthDate);
       var age = currentDate.getFullYear()-birthDate.getFullYear();

       return age;
      }


    })

}
emplview(id);