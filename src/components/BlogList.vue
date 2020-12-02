<template>
  <div>
    <div class="list">
      <div class="card">
        <router-link :to="{ name: 'Detail', params: { id: 1 } }">
          <h2 class="title">you don't know javascript</h2>
        </router-link>
        <p class="date">2020-11-22-20</p>
      </div>
      <div class="card">
        <router-link :to="{ name: 'Detail', params: { id: 2 } }">
          <h2 class="title">you don't know javascript</h2>
        </router-link>
        <p class="date">2020-11-22-20</p>
      </div>
      <div class="card">
        <router-link :to="{ name: 'Detail', params: { id: 3 } }">
          <h2 class="title">you don't know javascript</h2>
        </router-link>
        <p class="date">2020-11-22-20</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/basic.scss";
.list {
  padding: 2rem;
  width: 98%;
  margin: 1rem auto;
  box-shadow: $dark-shadow;
}
.card {
  margin: 2rem 0;
  border-bottom: 0.1px solid $clr-grey-8;
}
.title {
  font-family: $ff-secondary;
  font-size: 1.5rem;
  color: $clr-grey-2;
  letter-spacing: $spacing;
  margin-bottom: 1.5rem;
}
.date {
  font-style: italic;
}

@media screen and (min-width: 800px) {
  .list {
    max-width: $max-width * 0.9;
  }
}
</style>