<script async setup>
import Students from './Students.vue'
import { ref } from 'vue'
import useStore from '../stores/store.js'

const store = useStore();

let cls_name = ref("");

const employee_id = "A500460806";

function setClassName(class_name){
  cls_name.value = class_name;
}


employeeData = await store.getEmployee(employee_id);
classes  = await store.getClasses(employee_id)
</script>

<template>
  <div v-if="employeeData" class="container">
    <h4>Educator: </h4><h2>{{ employeeData.data.forename }} {{ employeeData.data.surname }}</h2>
    <h4>Classes: </h4>
    <ol>
      <li v-for="cls in store.classes.data">
        <a @click="store.getStudents(cls.id); setClassName(cls.description);"><!--couldn't get this to work{{  getSubject(school_id, cls.subject.data.id) }} -->{{ cls.description }} -- {{ cls.meta.role }}</a>
      </li>
    </ol>
  </div>
  <div>
      <Students :students="store.studentsData" :class_name="cls_name" />
  </div>
  
</template>
