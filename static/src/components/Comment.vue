<template>
  <div>
    <div>
      <button v-if="isSignIn === 0" class="btn sign-in">登錄留言吧！</button>
      <!-- SIGNIN COMMENT -->
      <div v-else>
        <section class="section">
          <div class="person">
            <img class="avatar" />
            <span class="name">{{ username }}</span>
          </div>
          <textarea
            v-model="submitText"
            class="text"
            placeholder="leave your comment ..."
          />
        </section>
        <button class="btn submit" @click="submit">提交評論</button>
      </div>
      <!-- ALL COMMENTS -->
      <article class="comment">
        <h2 class="all">
          全部評論<span>{{ comments.length }}</span>条
          <hr class="slash" />
        </h2>
        <div v-for="comment in comments" :key="comment.id">
          <section class="section">
            <div class="person">
              <img class="avatar" />
              <span class="name">{{ comment.nickname }}</span>
            </div>
            <p class="comment_text">
              {{ comment.comment_content }}
            </p>
          </section>
          <span class="comment_date">{{ comment.create_time }}</span>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    submitText: '',
    username: '',
    comments: [],
  }),
  computed: {
    isSignIn() {
      return this.$store.state.isSignIn;
    },
  },
  methods: {
    getUserInfo() {
      if (this.isSignIn) {
        this.$axiosInstance
          .get('/users/info')
          .then((response) => {
            if (response.data.code === 0) {
              this.username = response.data.username;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    submit() {
      this.$axiosInstance
        .post('/comments/public', {
          article_id: this.$route.params.id,
          content: this.submitText,
        })
        .then((response) => {
          if (response.data.code === 0) {
            this.submitText = '';
            // eslint-disable-next-line no-restricted-globals
            location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllComments() {
      this.$axiosInstance
        .get('/comments/list', {
          params: {
            article_id: this.$route.params.id,
          },
        })
        .then((response) => {
          if (response.data.code === 0) {
            this.comments = response.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getUserInfo();
    this.getAllComments();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/basic.scss";
.btn.sign-in {
  display: block;
  margin: 3rem auto;
}

.section {
  display: flex;
  flex-direction: row;
  padding: 5rem 0 2rem;
}
.person {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar {
  height: 60px;
  min-width: 60px;
  border: 2px solid $clr-black;
  border-radius: $radius;
}
.text {
  flex: 1;
  margin-left: 2rem;
  resize: none;
  padding: 1rem;
  line-height: 1.5rem;
  border-radius: $radius;
  box-shadow: $light-shadow;
  font-size: 1.5rem;
  outline: none;
  min-height: 90px;
  height: auto;
}
.btn.submit {
  display: block;
  margin-left: auto;
  margin-bottom: 5rem;
}

.all {
  font-size: 1.8em;
  padding-left: 1rem;
  border-left: 8px solid $clr-primary-1;
  line-height: 3rem;
}
.slash {
  border-width: 0.1px;
  margin-top: 5px;
}
.comment_text {
  flex: 1;
  margin-left: 2rem;
  padding: 1rem;
  line-height: 1.5rem;
  background: lighten($color: $clr-grey-9, $amount: 6);
  border-color: transparent;
  border-radius: $radius;
  font-size: 1rem;
}
.comment_date {
  display: block;
  font-style: italic;
  text-align: right;
}
</style>
