import token from './env.js'; 
// Import token from an untracked env.js file, which 
// functions similarly to a .env, but without having to setup
// Node and dotenv.

// because this is an exercise, I am going to assume that permissions are granted
// and the user has been authenticated via a pre-existing login system.
const authToken = token();

// Function that calls the API. Takes a URL string that is created
// by the function
async function wondeAPI(url) {
    const res = await fetch(url,{
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " + authToken
        }
    });

    const data = await res.json();
    return data
}
// emp id 199135293/
// class name 10A/Ar1

// All these functions below are aimed at getting data from
// various endpoints in the API
async function getEmployees(school_id){

    const url = `https://api.wonde.com/v1.0/schools/${school_id}/employees/`;
    const data = await wondeAPI(url);  
    return data;
}

async function getEmployee(school_id, employee_id){
    const url = `https://api.wonde.com/v1.0/schools/${school_id}/employees/${employee_id}?employment_details`;
    const data = await wondeAPI(url);
    return data
}

async function getClasses(school_id, emp_id){
    const url = `https://api.wonde.com/v1.0/schools/${school_id}/employees/${emp_id}?include=classes,roles,classes.lessons`;
    const data = await wondeAPI(url);
    return data;
}

async function getStudents(school_id, class_id){
    const url = `https://api.wonde.com/v1.0/schools/${school_id}/classes/${class_id}?include=students`;
    const data = await wondeAPI(url);
    console.log(data)
    return data;
}

const school_id = "A1930499544";
const employees = await getEmployees(school_id);
// const classes = await getClasses(school_id);
// console.log(classes)
console.log(employees)
// const subj_id = classes[0].subject

for(var i=0; i < employees.data.length; i++){
    const cls = await getClasses(school_id, employees.data[i]["id"]);
    if(cls.data.classes.data.length > 1){
        await getStudents(school_id, cls.data.classes.data[0].id)
    }
}
// const lesson = await getLessons(school_id);
// const subject = await getSubject(school_id, subj_id);
// console.log(lesson)
// console.log(subject)

// const students = await getStudents(school_id);
// console.log(students)
// console.log(await getLesson(school_id))
