<template>
  <div>
    <!-- signIn -->
    <section class="container" v-if="status === 0" key="signIn">
      <form class="form">
        <input placeholder="username" v-model="username" />
        <input placeholder="password" v-model="password" />
        <div class="controls">
          <button @click.prevent="signIn" class="btn btn-primary signIn">
            登录
          </button>
          <button @click="toSignUp" class="btn">註冊新帳號</button>
        </div>
      </form>
    </section>
    <!-- signUp -->
    <section class="container" v-else key="signUp">
      <form class="form">
        <input placeholder="nickname" v-model="nickname" />
        <input placeholder="username" v-model="username" />
        <input placeholder="password" v-model="password" />
        <div class="controls">
          <button @click.prevent="signUp" class="btn btn-primary signUp">
            註冊
          </button>
          <button @click="toSignIn" class="btn">返回登录</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import Cookie from 'js-cookie';

export default {
  data: () => ({
    status: 0, // 0 表示处于登陆界面, 1 表示处于注册界面
    username: '',
    password: '',
    nickname: '',
  }),

  methods: {
    signIn() {
      this.$axiosInstance
        .post('/users/login', {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          if (response.data.code === 0) {
            Cookie.set('token', response.data.token);
            this.$store.dispatch('fetchIsSignIn', 1);
          }
          this.$store.dispatch('fetchToken', response.data.token);
          this.$router.push({ name: 'Home' });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    signUp() {
      this.$axiosInstance
        .post('/users/register', {
          nickname: this.nickname,
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toSignIn() {
      this.status = 0;
    },
    toSignUp() {
      this.status = 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/basic.scss";
input {
  padding: 1rem;
  font-size: 1.2rem;
  border-radius: $radius;
  width: 25rem;
  height: 4rem;
}
.container {
  width: 95vw;
  box-shadow: $light-shadow;
  margin: 5rem auto;
  padding: 2rem 0;
}
.form {
  display: flex;
  flex-direction: column;
  row-gap: 3rem;
  align-items: center;
}
.controls {
  display: flex;
  justify-content: space-between;
  width: 25rem;
}

@media screen and (min-width: 800px) {
  .container {
    max-width: $max-width * 0.7;
  }
}
</style>
