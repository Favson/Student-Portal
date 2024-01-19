var studentsInfo =[]

function submit(){
    var firstName = document.getElementById("firstName").value
    var lastName = document.getElementById("lastName").value
    var mailPhone = document.getElementById("mailPhone").value
    var password = document.getElementById("password").value

    if (firstName === "" || lastName === "" || mailPhone === "" || password === "") {
        errMsg.style.display = 'block'   
        setTimeout(()=>{
            errMsg.style.display= 'none'
        }, 4000);
    }else{
        myTable.style.display = "block"
        var studentObject = {firstName, lastName, mailPhone, password}
        studentsInfo.push(studentObject)
        document.getElementById('firstName').value = ''
        document.getElementById('lastName').value = ''
        document.getElementById('mailPhone').value = ''
        document.getElementById('password').value = ''
        studentList()
    }
}


function studentList(){
    countings.innerHTML= studentsInfo.length
    show.innerHTML = ""
    for (x=0; x<studentsInfo.length; x++){
        show.innerHTML +=`
            <tr>
                <td class="col-1"><p>${x+1}</p></td>
                <td class="col-4"><p>${studentsInfo[x].firstName} ${studentsInfo[x].lastName}</p></td>
                <td class="col-4"><p>${studentsInfo[x].mailPhone}</p></td>
                <td class="col-3"><button class="btn btn-danger" onclick="deleted(${x})">DELETE</button> <button class="btn btn-warning" onclick="iwanteidit(${studentsInfo[x].firstName} ${studentsInfo[x].lastName} ${studentsInfo[x].mailPhone})">Edit</button></td>
            </tr>
        `
    }
}

function deleted(index){
    studentsInfo.splice(index, x)
    studentList()
}

function iwanteidit(index, indent, indence){
    var editFirstName=prompt("Input The Items To Replace")
    var editLastName=prompt("Input The Items To Replace")
    var editEmail=prompt("Input The Items To Replace")

    if (editFirstName === "" || editLastName === "" || editEmail === ""){
        alert("Are you not there")
        studentList()
    }else{
        studentsInfo.splice(index, 1, editFirstName)
        studentsInfo.splice(indent, 1, editEmail)
        studentsInfo.splice(indence,1, editEmail)
        studentList()
    }
}