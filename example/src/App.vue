<template>
  <img alt="Vue logo" :src="logoUrl" />
  <Logo />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import logoUrl, { VueComponent as Logo } from './assets/logo.svg'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Logo
  },
  setup: () => ({ logoUrl })
}
</script>
