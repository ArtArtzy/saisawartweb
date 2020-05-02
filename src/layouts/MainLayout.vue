<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-grey-9">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>Saisawart Control Panel</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <div class="text-h5 q-py-sm bg-grey-9 text-white" align="center" style="height:50px;">Menu</div>
      <div
        class="text-h6 q-py-sm q-pl-md cursor-pointer"
        :class="{'bg-grey-8 text-white':pageName=='member'}"
        @click="memberBtn()"
      >Member</div>
      <div
        class="text-h6 q-py-sm q-pl-md cursor-pointer"
        :class="{'bg-grey-8 text-white':pageName=='categoryList'}"
        @click="categoryBtn()"
      >Category</div>
      <div
        class="text-h6 q-py-sm q-pl-md cursor-pointer"
        :class="{'bg-grey-8 text-white':pageName=='product'}"
        @click="productBtn()"
      >Product</div>
      <div
        class="text-h6 q-py-sm q-pl-md cursor-pointer"
        :class="{'bg-grey-8 text-white':pageName=='setting'}"
        @click="settingBtn()"
      >Setting</div>
      <hr />

      <div class="text-h6 q-pb-md q-pl-md cursor-pointer" @click="logoutBtn()">Log out</div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",

  data() {
    return {
      leftDrawerOpen: false,
      pageName: "ProductList"
    };
  },
  methods: {
    logoutBtn() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to log out?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$q.localStorage.clear();
          this.$router.push("/login");
        });
    },
    settingBtn() {
      if (this.$route.name != "setting") {
        this.$router.push("/setting");
      }
    },
    categoryBtn() {
      if (this.$route.name != "categoryList") {
        this.$router.push("/category/f");
      }
    },
    memberBtn() {
      if (this.$route.name != "member") {
        this.$router.push("/member");
      }
    },
    productBtn() {
      if (this.$route.name != "product") {
        this.$router.push("/product/f");
      }
    }
  },
  watch: {
    "$route.name": function(data) {
      if (
        data == "categoryList" ||
        data == "categoryAdd" ||
        data == "categoryEdit"
      ) {
        this.pageName = "categoryList";
      } else if (data == "setting") {
        this.pageName = "setting";
      } else if (data == "member") {
        this.pageName = "member";
      } else {
        this.pageName = "product";
      }
    }
  },
  mounted() {
    if (this.$q.localStorage.getItem("login") != "4473567") {
      this.$router.push("/login");
    }
    if (
      this.$route.name == "categoryList" ||
      this.$route.name == "categoryAdd" ||
      this.$route.name == "categoryEdit"
    ) {
      this.pageName = "categoryList";
    } else if (this.$route.name == "setting") {
      this.pageName = "setting";
    } else if (this.$route.name == "member") {
      this.pageName = "member";
    } else {
      this.pageName = "product";
    }
  }
};
</script>
