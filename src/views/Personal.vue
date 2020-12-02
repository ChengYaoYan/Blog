<template>
  <div>
    <!-- nickname -->
    <!-- avatar -->
    <input type="file" name="file" accept="image/*" />
    <button>確認修改</button>
    <button @click="signOut">退出登录</button>
  </div>
</template>

<script>
export default {
  methods: {
    signOut() {
      this.$store.dispatch("fetchIsSignIn", 0);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>