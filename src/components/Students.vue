<script async setup>

defineProps(['students', 'class_name'])

</script>

<template>
  <h4 v-if="students.length">Students in {{ class_name }}: </h4>
  <ul>
    <li v-for="student in students">
      {{ student.forename }} {{ student.surname }}
    </li>
  </ul>
</template>

<style scoped>

li {
  color: #FFD646
}
</style>