<template>
  <div>
    Início
  </div>
</template>

<script>
export default {
  mounted () {
    this.$store
      .dispatch("produtos/listar")
  }
}
</script>