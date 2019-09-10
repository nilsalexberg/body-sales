<script>
export default {
  created() {
    let username = localStorage.getItem("username");
    let token = localStorage.getItem("token");

    if (username && token) {
      this.$router.push("inicio");
    } else {
      this.$router.push("login");
    }
  }
};
</script>
