<template>
  <q-layout view="lHh Lpr lFf">
    <app-menu></app-menu>

    <div class="mainDiv">
      <q-resize-observer @resize="onResize" />
      <div class="q-pa-md text-h6" v-if="pageId=='f'">
        <router-link to="/products/100" class="cursor-pointer notext">
          <u>Products</u>
        </router-link>&nbsp;>
        <router-link :to="'/products/' + catName.orderId" class="cursor-pointer notext">
          <u>{{catName.categoryName}}</u>
        </router-link>
        &nbsp;> {{data.title}}
      </div>
      <div class="q-pa-md text-h6" v-if="pageId!='f'">
        <router-link to="/gallery/100" class="cursor-pointer notext">
          <u>Gallery</u>
        </router-link>&nbsp;>
        <router-link :to="'/gallery/' + catName.orderId" class="cursor-pointer notext">
          <u>{{catName.categoryName}}</u>
        </router-link>
        &nbsp;> {{data.title}}
      </div>

      <!-- For desktop -->
      <!-- <div v-if="innerWidth > 800"> -->
      <div class="q-mt-md row">
        <div class="col-md-6 col-sm-6" align="center" style="margin:auto;">
          <img :src="data.imgURL" style="width:90%; max-width:400px; " />
        </div>
        <div class="col-md-6 col-sm-6 q-pa-md">
          <div class="text-h6">{{data.title}}</div>
          <div class="text-body1">{{data.name}}</div>
          <div class="text-body1" v-if="data.size">Size : {{data.size}}</div>
          <div class="q-pt-md">{{data.des}}</div>
        </div>
      </div>
      <!-- </div> -->
      <!-- For mobile -->
      <!-- <div v-if="innerWidth <= 800">Mobile</div> -->
    </div>
    <app-footer></app-footer>
  </q-layout>
</template>

<script>
import appFooter from "../components/footer.vue";
import appMenu from "../components/menu.vue";
import { db } from "../router/index.js";
export default {
  data() {
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      proId: "",
      pageId: "",
      catName: [],
      catId: "",
      data: {
        title: "",
        name: "",
        size: "",
        imgURL: "",
        des: ""
      },
      page: ""
    };
  },
  components: {
    appFooter,
    appMenu
  },
  methods: {
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    },
    loadData() {
      db.collection("product")
        .doc(this.proId)
        .get()
        .then(data => {
          this.data.title = data.data().code;
          this.data.name = data.data().name;
          this.data.size = data.data().size;
          this.data.imgURL = data.data().imgURL;
          this.data.des = data.data().description;
          this.catId = data.data().category;
          db.collection("category")
            .doc(this.catId)
            .get()
            .then(data => {
              this.catName = data.data();
            });
        });
    }
  },
  mounted() {
    this.proId = this.$route.params.id;
    this.pageId = this.$route.params.cat;

    this.loadData();
  }
};
</script>

<style lang="sass" scoped>
.mainDiv
  max-width: 1200px;
  width: 100%
  margin: auto;
.notext
  text-decoration: none
  color: black
</style>