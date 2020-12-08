<template>
  <div>
    <div class="list">
      <div class="card" v-for="item in blogList" :key="item.id">
        <router-link :to="{ name: 'Detail', params: { id: item.id } }">
          <h2 class="title">{{ item.title }}</h2>
        </router-link>
        <p class="date">{{ item.create_time }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    blogList: [],
  }),
  methods: {
    getAllList() {
      this.$axiosInstance
        .get('/articles/allList')
        .then((response) => {
          if (response.data.code === 0) {
            this.blogList = response.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getAllList();
  },
};
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
