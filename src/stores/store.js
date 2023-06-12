import { defineStore } from 'pinia';
import { ref } from 'vue';

// Import token from an untracked env.js file, which 
// functions similarly to a .env, but without having to setup
// Node and dotenv.
import token from '../env.js';

// because this is an exercise, I am going to assume that permissions are granted
// and the user has been authenticated via a pre-existing login system.
const authToken = token();

// testing School ID provided for the test API
// in a real world, they would probably be set and passed via login or some
// other lookup function
const school_id = "A1930499544";
const url = `https://api.wonde.com/v1.0/schools/${school_id}`

export const useStore = defineStore('exerciseStore', {
    // in a better world, these would probably be separated into different stores. 
    // in the case of how I constructed this though, I think this makes more
    state: () => ({
        employeeData: ref([]),
        classData: ref([]),
        studentsData: ref([]),
        wondeAPI: async function(url){
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
    }),
    actions: {
        //query the API to return a single employee, which then we can get the classes from using the 
        //include=classes parameter
        async getEmployee(employee_id){
            const employeeUrl = url +  `/employees/${employee_id}?include=classes,classes.subject,classes.lessons,roles`;
            const result = await this.wondeAPI(employeeUrl);
            this.employeeData = result

            return this.employeeData.data
        },        
        // This was to get the subject name for the class, but none of the ones for this 
        // have any class names so its moot
        async getSubject(subject_id){
          const subjectUrl = url +  `/subjects/${subject_id}`;
          const data = await this.wondeAPI(url);
          return await data.data.name != null ? data.data.name : ""
        },
        // return the classes from the employee data
        async getClasses(){          
            this.classData = await this.employeeData.data.classes.data;
            return this.classData
        },        
        async getStudents(class_id){
            const studentsUrl = url + `/classes/${class_id}?include=students`;
            const result = await this.wondeAPI(studentsUrl)
            this.studentsData = result.data.students.data;
            return this.studentsData;
        }
    }
})