<script async setup>
import Students from './Students.vue'
import token from '../env.js';
import { ref, onMounted } from 'vue'
// Import token from an untracked env.js file, which 
// functions similarly to a .env, but without having to setup
// Node and dotenv.

// because this is an exercise, I am going to assume that permissions are granted
// and the user has been authenticated via a pre-existing login system.
const authToken = token();
let studentsData = ref([])
let cls_name = ref("");
let classes = ref([])
let employeeData = ref([]);
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

// testing School ID provided for the test API
const school_id = "A1930499544";
const employee_id = "A500460806";

// All these functions below are aimed at getting data from
// various endpoints in the API

// the Employees functions are commented out because they are not used, but were used for 
// understanding the API
// async function getEmployees(school_id){
//   // get all the employees to fill the options list
//     const url = `https://api.wonde.com/v1.0/schools/${school_id}/employees?has_class`;
//     const result = await wondeAPI(url);  
//     return result;
// }

// When or if a single-employee function is used, can use this one. For instance, if a login-system was implemented,
// in this case, the employee ID is hard-coded in
async function getEmployee(school_id, employee_id){
    const url = `https://api.wonde.com/v1.0/schools/${school_id}/employees/${employee_id}?include=classes,classes.subject,classes.lessons,roles`;
    const result = await wondeAPI(url);
    console.log(result)
    return result
}

// This was to get the subject name for the class, but none of the ones for this 
async function getSubject(school_id, subject_id){
  const url = `https://api.wonde.com/v1.0/schools/${school_id}/subjects/${subject_id}`;
  const data = await wondeAPI(url);
  console.log(data)
  return await data.data.name != null ? data.data.name : ""
}

async function getClasses(school_id, emp_id){
    const classUrl = `https://api.wonde.com/v1.0/schools/${school_id}/employees/${emp_id}?include=classes,classes.subject,classes.lessons,roles`;
    const result = await wondeAPI(classUrl);
    console.log(result)
    // for(var i; i<result.data.classes.data.length; i++){
    //   const class_id = result.data.classes.data[i].id
    //   getStudents(school_id, class_id)
    //   const subject_id = result.data.classes.data.meta.subject.data.id
    //   getSubject(school_id, subject_id)
    // }
    return result.data.classes;
}

async function getStudents(school_id, class_id){
    const url = `https://api.wonde.com/v1.0/schools/${school_id}/classes/${class_id}?include=students`;
    const result = await wondeAPI(url)
    console.log(result)
    setStudentData(result.data.students.data)
    return result;
}

function setClassName(class_name){
  cls_name.value = class_name;
}

function setStudentData(value){
  studentsData.value=value
}


employeeData.value = await getEmployee(school_id, employee_id);
classes  = await getClasses(school_id, employee_id)
console.log(classes)
console.log(studentsData.value)

</script>

<template>
  <div v-if="employeeData" class="container">
    <h4>Educator: </h4><h2>{{ employeeData.data.forename }} {{ employeeData.data.surname }}</h2>
    <h4>Classes: </h4>
    <ol>
      <li v-for="cls in classes.data">
        <a @click="getStudents(school_id, cls.id); setClassName(cls.description);"><!--couldn't get this to work{{  getSubject(school_id, cls.subject.data.id) }} -->{{ cls.description }} -- {{ cls.meta.role }}</a>
      </li>
    </ol>
  </div>
  <div>
      <Students :students="studentsData" :class_name="cls_name" />
  </div>
  
</template>
