<template>
  <div class="container">
    <BlogList></BlogList>
  </div>
</template>

<script>
// @ is an alias to /src
import BlogList from '@/components/BlogList.vue';

export default {
  components: {
    BlogList,
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/basic.scss";
.container {
  min-width: $min-width;
}
</style>
