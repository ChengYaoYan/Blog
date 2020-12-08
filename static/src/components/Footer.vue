<template>
  <div class="container">
    <footer>
      <p>contact me</p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/basic.scss";

.container {
  min-width: $min-width;
}
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  background: $clr-primary-1;
  padding: 1rem 0;
}
p {
  margin: 0;
  font-size: 1.5rem;
  color: $clr-grey-10;
}
</style>
