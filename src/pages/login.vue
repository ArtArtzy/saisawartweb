<template>
  <div class="bg-blue-grey-10 bgDiv">
    <div class="loginDiv bg-grey-2 fixed-center">
      <div
        style="width:90%; margin:auto"
        class="text-h5 q-py-md"
        align="center"
      >Saisawart Control Panel</div>
      <div style="width:90%; margin:auto" class="q-py-md">
        <q-input label="username" v-model="dataInput.userName" outlined />
      </div>
      <div style="width:90%; margin:auto" class="q-pb-md">
        <q-input label="password" v-model="dataInput.password" type="password" outlined />
      </div>
      <div align="center">
        <q-btn label="เข้าสู่ระบบ" color="teal" style="width:300px;" @click="loginBtn()" />
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../router/index.js";
export default {
  data() {
    return {
      dataInput: {
        userName: "",
        password: ""
      }
    };
  },
  methods: {
    loginBtn() {
      db.collection("login")
        .where("username", "==", this.dataInput.userName)
        .where("password", "==", this.dataInput.password)
        .get()
        .then(doc => {
          if (doc.docs.length > 0) {
            this.$q.localStorage.set("login", "4473567");
            this.$router.push("category/f");
          } else {
            this.$q.notify({
              message: "Username / password incorrect",
              icon: "fas fa-exclamation-triangle",
              color: "negative"
            });
          }
        });
    }
  }
};
</script>

<style lang="sass" scoped>
.loginDiv
  width: 400px
  height: 300px
  border-radius: 15px;
.bgDiv
  height: 100vh
</style>