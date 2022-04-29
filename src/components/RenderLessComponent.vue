<template>
  <h1>Hei</h1>
</template>

<script>
export default {
  name: "RenderLessComponent",
  beforeRouteEnter(to, from) {
    console.log(to.fullPath)
    console.log(from.fullPath)
  }
};
</script>