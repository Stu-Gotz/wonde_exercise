<script async setup>
import Students from './Students.vue'
import { ref } from 'vue'
import { useStore } from '../stores/store.js'

//Import the store to access store variables and functions
const store = useStore();

//to pass the class name for the students view
let cls_name = ref("");

const employee_id = "A500460806";

// sets class name to pass as a prop
function setClassName(class_name) {
  cls_name.value = class_name;
}

const employeeData = await store.getEmployee(employee_id);
const classes = await store.getClasses(employee_id)
</script>

<template>
  <div class="container">
    <h4>Educator: </h4>
    <h2>{{ employeeData.forename }} {{ employeeData.surname }}</h2>

    <h4>Classes: </h4>
    <ol>
      <li v-for=" cls in  classes ">
        <a @click="store.getStudents(cls.id); setClassName(cls.description);"><!--couldn't get this to work{{  getSubject(school_id, cls.subject.data.id) }} -->{{
          cls.description }} -- {{ cls.meta.role }}</a>
      </li>
    </ol>
  </div>
  <div v-if=" store.studentsData " class="container">
    <Students :students=" store.studentsData " :class_name=" cls_name " />
  </div>
</template>

<style scoped>
ol {
  border: 2px solid #FFD646;
  padding: 5px;
  list-style: none;
}
.container {
  margin: 0 10px;
  width: 50%;
}
</style>