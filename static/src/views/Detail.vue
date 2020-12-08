<template>
  <div class="container">
    <h2 class="title">{{ article.title }}</h2>
    <span class="date"><i class="fas fa-calendar-alt"></i> {{ article.create_time }}</span>
    <mavon-editor
      v-model="article.content"
      :subfield="false"
      :defaultOpen="'preview'"
      :editable="false"
      :toolbarsFlag="false"
    />
    <Comment></Comment>
  </div>
</template>

<script>
import Comment from '@/components/Comment.vue';

export default {
  data: () => ({
    article: {},
  }),
  methods: {
    getArticleDetail() {
      this.$axiosInstance
        .get('/articles/detail', {
          params: {
            article_id: this.$route.params.id,
          },
        })
        .then((response) => {
          if (response.data.code === 0) {
            this.article = response.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    Comment,
  },
  created() {
    this.getArticleDetail();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/basic.scss";
.container {
  padding: 2rem;
  width: 98%;
  margin: 1rem auto;
  box-shadow: $dark-shadow;
  min-height: calc(100vh - 176px);
}
.title {
  font-family: $ff-secondary;
  font-size: 2rem;
  color: $clr-grey-2;
  letter-spacing: $spacing;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.date {
  display: block;
  font-style: italic;
  text-align: center;
  margin-bottom: 4rem;
  color: $clr-grey-4;
}

@media screen and (min-width: 800px) {
  .container {
    max-width: $max-width * 0.9;
  }
}
</style>
