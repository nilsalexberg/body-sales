<script>
export default {
  created() {
    let username = localStorage.getItem("username");
    let token = localStorage.getItem("token");

    if (username && token) {
      // this.$store.dispatch('produtos/filtrar', {group: 2, description: 'CREATINA', page: 0})
      this.$router.push("inicio");
    } else {
      this.$router.push("login");
    }
  }
};
</script>
