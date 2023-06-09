import token from './env.js'; 
// Import token from an untracked env.js file, which 
// functions similarly to a .env, but without having to setup
// Node and dotenv.

// because this is an exercise, I am going to assume that permissions are granted
// and the user has been authenticated via a pre-existing login system.
const authToken = token();

// Function finds the base endpoints of the API
async function wondeAPI(school_id, endpoint) {
    const res = await fetch(`https://api.wonde.com/v1.0/schools/${school_id}/${endpoint}`,{
    method: 'GET',
    headers: {
        "Content-Type": "application/javascript",
        Authorization: "Bearer: " + authToken
        }
    });

    const data = await res.json();
    return data.data
}

async function getClasses(school_id){
    const res = await fetch(`https://api.wonde.com/v1.0/schools/${school_id}/employees/A199135293/?employment_details`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/javascript",
            Authorization: "Bearer: " + authToken
        }
    });
    const data = await res.json();    
    return data.data
}
const school_id = "A1930499544";
const teachers = await wondeAPI(school_id, "employees")
const classes = await wondeAPI(school_id, "classes")
console.log(teachers)
console.log(classes.students)

console.log(await getClasses(school_id))

