<template>
  <h1>Hello Vite + Vue 3!</h1>
  <p>Edit ./App.vue to test hot module replacement (HMR).</p>
  <p>
    <span>Count is: {{ count }}</span>
    <button @click="count++">increment</button>
  </p>
  <MyIcon />
</template>

<script>
import MyIcon from './my-icon.svg?component';

export default {
  components: { MyIcon },
  data: () => ({ count: 0 })
}
</script>

<style scoped>
h1 {
  color: #4fc08d;
}

h1, p {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
