var studentsInfo =[]

function submit(){
    var firstName = document.getElementById("firstName").value
    var lastName = document.getElementById("lastName").value
    var mailPhone = document.getElementById("mailPhone").value
    var password = document.getElementById("password").value
    var confirmation = confirm("Are you Sure you want to Submit")
    if (confirmation){
        if (firstName === "" || lastName === "" || mailPhone === "" || password === "") {
            errMsg.style.display = 'block'
            setTimeout(()=>{
                errMsg.style.display= 'none'
            }, 4000);
        }else{
            var studentObject = {
                firstName, lastName, mailPhone, password
            }
            studentsInfo.push(studentObject)
            localStorage.setItem('studentVar', JSON.stringify(studentsInfo))
            document.getElementById('firstName').value = ''
            document.getElementById('lastName').value = ''
            document.getElementById('mailPhone').value = ''
            document.getElementById('password').value = ''
            window.location.href = "dashboard.html"
            successmsg.style.display= "block"
            setTimeout(()=>{
                successmsg.style.display= "none"
            }, 2000);
        }
    }
}



studentsInfo = JSON.parse(localStorage.getItem("studentVar"));
// console.log(studentsInfo);

function studentList() {
    // document.getElementById('myTable').style.display ="block"
    let show = document.getElementById("show");
    let countings = document.getElementById("countings");

    countings.innerHTML = studentsInfo.length;
    show.innerHTML = "";

    for (var x = 0; x < studentsInfo.length; x++) {
        show.innerHTML += `
            <tr>
                <td class="col-1"><p>${x + 1}</p></td>
                <td class="col-4"><p>${studentsInfo[x].firstName} ${studentsInfo[x].lastName}</p></td>
                <td class="col-4"><p>${studentsInfo[x].mailPhone}</p></td>
                <td class="col-3">
                    <button class="btn btn-danger" onclick="deleted(${x})">DELETE</button>
                    <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop${x}"><i class="fa-regular fa-pen-to-square fw-5"></i></button>
                </td>
                
                <div class="modal fade" id="staticBackdrop${x}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                    <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header text-info">
                                <h1 class="modal-title fs-5 text-center" id="staticBackdropLabel">MAKE CHANGES</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body text-info text-center">
                                <div class="mb-2 alert alert-success p-1" style="display: none;" id="successMsg">Deleted Successfully</div>
                                <div class="alert alert-danger text-warning w-sm-50 fs-5 mx-auto my-2 bg-danger border-0 text-center" style="display:none;" id="errMsg2">Spaces cannot be empty</div>
                                <input type="text" id="firstModalInput${x}" placeholder="First Name" class="col-12 my-3 shadow-none" autofocus>
                                <input type="text" id="secondModalInput${x}" placeholder="Second Name" class="col-12 my-3 border-none">
                                <input type="text" id="thirdModalInput${x}" placeholder="Email" class="col-12 my-3 outline-none">
                            </div>
                            <div class="modal-footer" id="editDiv">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="editButtonModal(${x})">Understood</button>
                            </div>
                        </div>
                    </div>
                </div>
            </tr>
        `;
    }
}

studentList();

function deleted(index){
    studentsInfo.splice(index, 1);
    localStorage.setItem('studentVar', JSON.stringify(studentsInfo));
    studentList();
}

function editButtonModal(x){
    var errMsg2 = document.getElementById("errMsg2");
    var successMsg = document.getElementById("successMsg");
    var modal = document.getElementById(`staticBackdrop${x}`);

    if (
        document.getElementById(`firstModalInput${x}`).value === "" ||
        document.getElementById(`secondModalInput${x}`).value === "" ||
        document.getElementById(`thirdModalInput${x}`).value === ""
    ) {
        errMsg2.style.display = 'block'
        setTimeout(()=>{
            errMsg2.style.display = 'none'
        }, 1000)
    } else {
        modal.style.display = 'none';
        
        studentsInfo[x]["firstName"] = document.getElementById(`firstModalInput${x}`).value
        studentsInfo[x]["lastName"] = document.getElementById(`secondModalInput${x}`).value
        studentsInfo[x]["mailPhone"] = document.getElementById(`thirdModalInput${x}`).value
        
        localStorage.setItem('studentVar', JSON.stringify(studentsInfo));
        studentList();
        
        successMsg.style.display= 'block'
        setTimeout(() => {
            successMsg.style.display='none'
        }, 1000);
        
        document.getElementById(`firstModalInput${x}`).value = ""
        document.getElementById(`secondModalInput${x}`).value = ""
        document.getElementById(`thirdModalInput${x}`).value = ""
    }
}