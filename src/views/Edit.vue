<template>
  <div>
    <form class="container">
      <button class="btn go-back" @click="goBack">返回</button>
      <h2>標題</h2>
      <input placeholder="請輸入標題" class="title" v-model="title"/>
      <h2>內容(Markdown編輯器)</h2>
      <mavon-editor v-model="content" :defaultOpen="'preview'" />
      <button class="btn save" @click.prevent="save">保存</button>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    title: '',
    content: '',
  }),
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getArticleDetail() {
      this.$axiosInstance
        .get('/articles/detail', {
          params: {
            article_id: this.$route.params.id,
          },
        })
        .then((response) => {
          if (response.data.code === 0) {
            console.log(response.data);
            this.title = response.data.data.title;
            this.content = response.data.data.content;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    save() {
      // 判断当前是处于编辑状态还是处于新增状态
      if (this.$route.params.id) {
        // edit
        this.$axiosInstance
          .post('/articles/update', {
            title: this.title,
            content: this.content,
            article_id: this.$route.params.id,
          })
          .then((response) => {
            if (response.data.code === 0) {
              console.log(response.data);
              this.$router.push({ name: 'Article' });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // add
        this.$axiosInstance
          .post('/articles/add', {
            title: this.title,
            content: this.content,
          })
          .then((response) => {
            if (response.data.code === 0) {
              this.$router.push({ name: 'Article' });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  created() {
    this.getArticleDetail();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/basic.scss";
h2 {
  font-size: 1.8rem;
  font-weight: normal;
  margin: 1rem 0;
}
.container {
  max-width: $max-width;
  margin: 0 auto;
  padding: 3rem 0;
}
.btn.go-back {
  display: block;
  margin-left: auto;
}
.btn.save {
  margin-top: 1rem;
}
.title {
  width: 100%;
  font-size: 1rem;
  font-weight: normal;
  color: $clr-grey-4;
  padding: 0.8rem;
  border: 1px solid $clr-grey-6;
  border-radius: $radius;
  margin-bottom: 1rem;
  outline: none;
}
</style>
