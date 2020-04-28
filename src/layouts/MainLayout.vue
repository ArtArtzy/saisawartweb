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
      <div class="text-h6 q-py-md q-pl-md">Member</div>
      <div
        class="text-h6 q-pb-md q-pl-md"
        :class="{'bg-grey-8 text-white':pageName=='categoryList'}"
      >Category</div>
      <div class="text-h6 q-pb-md q-pl-md">Product</div>
      <hr />
      <div class="text-h6 q-pb-md q-pl-md">Log out</div>
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
  watch: {
    "$route.name": function(data) {
      if (data == "categoryList") {
        this.pageName = "categoryList";
      } else {
      }
    }
  },
  mounted() {
    if (this.$route.name == "categoryList") {
      this.pageName = "categoryList";
    }
  }
};
</script>
