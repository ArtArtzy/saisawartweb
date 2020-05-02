<template>
  <div>
    <div class="text-h5 q-pt-md" align="center">Setting</div>
    <div style="width:100%; max-width:400px; margin:auto">
      <div class="q-pt-md">
        <q-input label="Username" v-model="dataInput.username" stack-label outlined />
      </div>
      <div class="q-pt-md">
        <q-input label="Password" v-model="dataInput.password" stack-label outlined />
      </div>
      <div class="row q-pt-md">
        <div class="col" align="center">
          <q-btn color="grey-8 " class="myBtn" label="Save" @click="updateLogin()" />
        </div>
        <div></div>
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
        username: "",
        password: ""
      }
    };
  },
  methods: {
    updateLogin() {
      //check validattion
      if (this.dataInput.username.length < 4) {
        this.$q.notify({
          message: "Choose a Username at least 4 characters",
          icon: "fas fa-exclamation-triangle",
          color: "negative"
        });
        return;
      }
      if (this.dataInput.password.length < 4) {
        this.$q.notify({
          message: "Choose a Password at least 4 characters",
          icon: "fas fa-exclamation-triangle",
          color: "negative"
        });
        return;
      }
      db.collection("login")
        .doc("dHXctlG4vL2T8pRB96LU")
        .update(this.dataInput)
        .then(() => {
          this.$q
            .dialog({
              title: "Save completely",
              message: "Update Username & password completely",
              persistent: true
            })
            .onOk(() => {
              this.$router.push("/category/f");
            });
        });
    },
    loadUsernamePassword() {
      db.collection("login")
        .get()
        .then(doc => {
          this.dataInput = doc.docs[0].data();
        });
    }
  },
  mounted() {
    this.loadUsernamePassword();
  }
};
</script>

<style lang="sass"  scoped>
.myBtn
  min-width: 250px
</style> >

