<template>
  <div>
    <section class="container">
      <h1 class="title">文章列表</h1>
      <button class="btn add-article" @click="handleAdd">新增+</button>
      <table>
        <thead>
          <tr>
            <th scope="col">標題</th>
            <th scope="col">日期</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.id">
            <th scope="row">{{ article.title }}</th>
            <td><i class="far fa-clock"></i> {{ article.create_time}}</td>
            <td>
              <button class="btn btn-primary" @click="handleView(article.id)">查看</button>
              <button class="btn btn-success" @click="handleEdit(article.id)">編輯</button>
              <button class="btn btn-danger" @click="handleRemove(article.id)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    articles: [],
  }),
  methods: {
    handleAdd() {
      this.$router.push({ name: 'Edit' });
    },
    handleView(id) {
      window.open(`/detail${id}`);
    },
    handleEdit(id) {
      this.$router.push({ name: 'Edit', params: { id } });
    },
    handleRemove(id) {
      this.$axiosInstance
        .get('/articles/delete', {
          params: {
            article_id: id,
          },
        })
        .then((response) => {
          if (response.data.code === 0) {
            console.log(response.data);
            // eslint-disable-next-line no-restricted-globals
            location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOwnList() {
      this.$axiosInstance
        .get('/articles/ownList')
        .then((response) => {
          if (response.data.code === 0) {
            this.articles = response.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getOwnList();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/basic.scss";
.container {
  max-width: $max-width;
  margin: 0 auto;
  padding: 3rem 1rem;
}
.title {
  font-size: 2.5rem;
  text-align: center;
}
.btn.add-article {
  display: block;
  margin-left: auto;
  margin-bottom: 2rem;
  margin-top: 2rem;
}
table {
  border: 2px solid $clr-grey-9;
  border-collapse: collapse;
  width: 100%;
}
tr {
  transition: $transition;
}
tr:hover {
  background-color: lighten($clr-grey-9, 5);
}
th,
td {
  border: 1px solid $clr-grey-9;
  text-align: center;
  padding: 1rem 0;
}
table .btn {
  margin: 0 0.5rem;
  font-size: 0.7rem;
  border: none;
}
</style>
