<template>
  <div>
    <form class="container">
      <!-- nickname -->
      <div>
        <h2>昵称</h2>
        <input type="text" class="nickname" placeholder="nickname" />
        <p></p>
      </div>
      <!-- avatar -->
      <div class="avatar">
        <h2>头像</h2>
        <label class="image-file-upload">
          <i class="fas fa-plus"></i>
          <input type="file" accept="imgage/*" @change="handleFiles" />
        </label>
        <img :file="imgSrc" />
        <p>{{ alertText }}</p>
      </div>
      <div class="controls">
        <button class="btn btn-primary">保存</button>
        <button @click="signOut" class="btn btn-danger">退出登录</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    alertText: '',
    imgSrc: '',
  }),
  methods: {
    signOut() {
      this.$store.dispatch('fetchIsSignIn', 0);
    },
    displayAlert(text, action) {
      this.alertText = text;
      this.action = action;

      // remove displayAlert
      // eslint-disable-next-line func-names
      setTimeout(function () {
        this.alertText = '';
        // remove class
      });
    },
    handleFiles(event) {
      const file = event.target.files[0];

      if (!(file.type === 'image/jpeg')) {
        this.alertText = '上传头像只能是 JPG 格式！';
      }
      if (!(file.size / 1024 / 1024 < 2)) {
        this.alertText = '上传头像图片大小不能超过 2MB！';
      }

      const reader = new FileReader();
      // eslint-disable-next-line wrap-iife
      reader.onload = (
        // eslint-disable-next-line func-names
        function () {
          // eslint-disable-next-line func-names
          return function (e) {
            this.imgSrc = e.target.result;
            console.log(e.target.result);
          };
        })();
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/basic.scss";

h2 {
  font-size: 1.3rem;
  font-weight: normal;
  margin-right: 1rem;
  display: inline-block;
}
div {
  width: 20rem;
  margin: 0 auto 4rem;
}
.container {
  max-width: $max-width;
  margin: 0 auto;
  padding: 3rem 0;
}
.btn {
  border: transparent;
}
.nickname {
  width: 15rem;
  height: 3rem;
  padding: 1rem;
  border-radius: $radius;
  font-size: 1.2rem;
}
.avatar {
  display: flex;
}
.image-file-upload {
  display: flex;
  place-items: center;
  place-content: center;
  width: 10rem;
  height: 10rem;
  font-size: 2rem;
  border: 1px dotted $clr-grey-8;
  border-radius: $radius;
  color: $clr-grey-6;
  background-color: $clr-grey-10;
  text-align: center;
  cursor: pointer;
}
input[type="file"] {
  display: none;
}
.btn:nth-of-type(1) {
  margin-right: 2rem;
}
</style>
