function recordSubmission(record) {
 fetch('https://script.google.com/macros/s/AKfycbzwpon07_RiU3aYoYlvhHSm922wWUPE_eq9aSfflFenSgRLrfm5OfakejgaljzvCdbr/exec', {
 method: 'POST',
 body: JSON.stringify(record)
 }).catch(err => console.error('Could not record submission:', err));
}

function evaluateStudent(){

    let name = document.getElementById("studentName").value;
    let age = document.getElementById("studentAge").value;
    let grade = parseFloat(document.getElementById("grade").value);
    let course = document.getElementById("course").value;

    let years = document.getElementsByName("year");

    let year = "";
    for(let i = 0; i < years.length; i++){
        if(years[i].checked){
            year = years[i].value;
        }
    }

    let inputs = document.querySelectorAll("input");

    let i = 0;
    while(i < inputs.length){
        if(inputs[i].value === "" && inputs[i].type !== "radio"){
            alert("Please complete all fields.");
            return;
        }
        i++;
    }

    if(isNaN(grade)){
        alert("Please complete all fields.");
        return;
    }

    let remarks = "";

    if(grade >= 90){
        remarks = "Excellent";
    }
    else if(grade >= 75){
        remarks = "Passed";
    }
    else{
        remarks = "Failed";
    }

    let message = "";

    switch(remarks){
        case "Excellent":
            message = "Outstanding performance!";
            break;
        case "Passed":
            message = "Congratulations!";
            break;
        case "Failed":
            message = "Better luck next semester.";
            break;
    }

    document.querySelector("#title").textContent = "Evaluation Complete";

    let result = document.getElementsByClassName("result")[0];
    result.innerHTML = "";

    let heading = document.createElement("h2");
    heading.className = "highlight";
    heading.textContent = "Student Report";
    result.appendChild(heading);

    let table = document.createElement("table");

    let data = [
        ["Name", name],
        ["Age", age],
        ["Course", course],
        ["Year Level", year],
        ["Grade", grade],
        ["Remarks", remarks],
        ["Message", message]
    ];

    for(let j = 0; j < data.length; j++){
        table.innerHTML += `
            <tr>
                <td>${data[j][0]}</td>
                <td>${data[j][1]}</td>
            </tr>
        `;
    }

    result.appendChild(table);

    recordSubmission({name, age, course, year, grade, remarks, message});

    let note = document.createElement("p");
    note.textContent = "Student successfully evaluated.";
    note.className = "note";
    result.appendChild(note);
}