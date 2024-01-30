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
            window.location.href = "dashboard.html"
            myTable.style.display = "block"
            successmsg.style.display= "block"
            setTimeout(()=>{
                successmsg.style.display= "none"
            }, 2000);
            var studentObject = {
                firstName, lastName, mailPhone, password
            }
            studentsInfo.push(studentObject)
            document.getElementById('firstName').value = ''
            document.getElementById('lastName').value = ''
            document.getElementById('mailPhone').value = ''
            document.getElementById('password').value = ''
            studentList()
        }
    }else{
        studentList()
    }

}
let studentFunction = localStorage.setItem(studenLidting,JSON.stringify(studentList))

function studentList(){
    countings.innerHTML= studentsInfo.length
    show.innerHTML = ""
    for (x=0; x<studentsInfo.length; x++){
        show.innerHTML +=`
            <tr>
                <td class="col-1"><p>${x+1}</p></td>
                <td class="col-4"><p>${studentsInfo[x].firstName} ${studentsInfo[x].lastName}</p></td>
                <td class="col-4"><p>${studentsInfo[x].mailPhone}</p></td>
                <td class="col-3"><button class="btn btn-danger" onclick="deleted(${x})">DELETE</button> <button class="btn btn-warning"  data-bs-toggle="modal" data-bs-target="#staticBackdrop${x}"><i class="fa-regular fa-pen-to-square fw-5"></i>
                </button></td>
                <!-- Modal -->
                <div class="modal fade" id="staticBackdrop${x}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                    <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header text-info">
                                <h1 class="modal-title fs-5 text-center" id="staticBackdropLabel">MAKE CHANGES</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body text-info text-center">
                                <div class="mb-2 alert alert-success p-1" style="display: none;" id="successMsg">Deleted Succefully</div>
                                <div class="alert alert-danger text-warning w-sm-50 fs-5 mx-auto my-2 bg-danger border-0 text-center" style="display:none;" id="errMsg2">Spaces cannot be empty</div>
                                <input type="text" id="firstModalInput${x}" placeholder="Input input new item" class="col-12 my-3 shadow-none" autofocus>
                                <input type="text" id="secondModalInput${x}" placeholder="input the price of the new item" class="col-12 border-none">
                                <input type="text" id="thirdModalInput${x}" placeholder="input the price of the new item" class="col-12 border-none">
                            </div>
                            <div class="modal-footer" id="editDiv">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary"  onclick="editButtonModal(${x})">Understood</button>
                            </div>
                        </div>
                    </div>
            </tr>
        `
    }
}

function deleted(index){
    studentsInfo.splice(index, x)
    studentList()
}

function editButtonModal(x){

    if (document.getElementById(`firstModalInput${x}`).value === "" || document.getElementById(`secondModalInput${x}`).value === "" || document.getElementById(`thirdModalInput${x}`).value === ""){
        errMsg2.style.display = 'block'
        setTimeout(()=>{
            errMsg2.style.display = 'none'
        }, 1000)
    }else{
        let myModal = new bootstrap.Modal(document.getElementById(`staticBackdrop${x}`))
        studentsInfo[x]["firstName"] = document.getElementById(`firstModalInput${x}`).value
        studentsInfo[x]["lastName"] = document.getElementById(`secondModalInput${x}`).value
        studentsInfo[x]["mailPhone"] = document.getElementById(`thirdModalInput${x}`).value
        studentList()
        successMsg.style.display= 'block'
        setTimeout(() => {
            successMsg.style.display='none'
        }, 1000);
        document.getElementById(`firstModalInput${x}`).value = ""
        document.getElementById(`secondModalInput${x}`).value = ""
        document.getElementById(`thirdModalInput${x}`).value = ""
        // myModal.hide()
        
    }
}