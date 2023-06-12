<script async setup>
import Display from './components/Display.vue'

</script>

<template>
  <Suspense>
    <Display />
  </Suspense>
  
</template>

<style>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

/* .container {
  display: flex;
  flex-direction: column;
} */
@media (min-width: 1024px) {
  /* .header {
    display: flex;
    place-items: center;
    flex: 1;
    width: 100%;;
  } */

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

ul > * {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

</style>
