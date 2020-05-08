<template>
  <h1>Hello Vite + Vue 3!</h1>
  <p>Edit ./App.vue to test hot module replacement (HMR).</p>
  <p>
    <span>Count is: {{ count }}</span>
    <button @click="count++">increment</button>
  </p>
  <MyIcon style="width: 50px; height: 50px;" />
  <img src="./svgs/my-icon.svg" style="width: 50px; height: 50px;" />
  <div class="my-icon" style="width: 50px; height: 50px;"></div>
</template>

<script>
import MyIcon from './svgs/my-icon.svg?component';

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

.my-icon {
  background: url("./svgs/my-icon.svg") center no-repeat;
  display: inline-block;
}
</style>
