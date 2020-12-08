<template>
  <div class="container">
    <nav>
      <div class="nav-center">
        <!-- nav header -->
        <div class="nav-header">
          <h1>博客</h1>
          <button
            class="nav-toggle"
            @click="isFold ? (isFold = false) : (isFold = true)"
          >
            <i class="fas fa-bars"></i>
          </button>
        </div>
        <!-- links -->
        <ul class="links" :class="{ 'show-links': !isFold }">
          <li>
            <router-link :to="{ name: 'Home' }">
              <i class="fa fa-home home"></i>
              首頁
            </router-link>
          </li>
          <li v-if="isSignIn === 1">
            <router-link :to="{ name: 'Article' }">我的博客</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Login' }" v-if="isSignIn === 0"
              >登录</router-link
            >
            <router-link
              :to="{ name: 'Personal' }"
              v-else-if="isSignIn === 1"
              >{{ username }}</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data: () => ({
    isFold: true,
    username: null,
  }),
  methods: {
    getUserInfo() {
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
    },
  },
  computed: {
    isSignIn() {
      return this.$store.state.isSignIn;
    },
  },
  created() {
    if (this.isSignIn) {
      this.getUserInfo();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/basic.scss";

.container {
  min-width: $min-width;
}
nav {
  background: $clr-white;
  box-shadow: $light-shadow;
}
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}
.nav-toggle {
  font-size: 1.5rem;
  color: $clr-primary-5;
  background: transparent;
  border-color: transparent;
  transition: $transition;
  outline: none;
  cursor: pointer;
}
h1 {
  font-size: 2rem;
}
.links a {
  color: $clr-grey-3;
  font-size: 1rem;
  letter-spacing: $spacing;
  display: block;
  padding: 0.5rem 1rem;
  transition: $transition;
}
.links a:hover {
  background-color: $clr-primary-8;
  color: $clr-primary-5;
  padding-left: 1.5rem;
}
.links .home {
  display: none;
}
.links a.router-link-exact-active {
  color: $clr-primary-5;
}
/* BY DEFAULT HIDE LINKS */
.links {
  height: 0;
  overflow: hidden;
  transition: $transition;
}
/* TOGGLE CLASS */
.show-links {
  height: 10rem;
}

@media screen and (min-width: 800px) {
  .nav-center {
    max-height: 1170px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }
  .nav-header {
    padding: 0;
  }
  .nav-toggle {
    display: none;
  }
  .links {
    height: auto;
    display: flex;
  }
  .links li:first-child {
    display: flex;
    align-items: center;
  }
  .links a {
    padding: 0;
    margin: 0 0.5rem;
  }
  .links a:hover {
    padding: 0;
    background: transparent;
  }
  .links .home {
    display: inline-block;
  }
}
</style>
