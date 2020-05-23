<template>
  <div>
    <div class="text-h5 q-pt-md" align="center">Add New Product</div>
    <div style="width:100%; max-width:600px; margin:auto">
      <div class="text-body1 q-pt-md">
        <b>Page</b>
        :
        {{categoryTitle}}
      </div>
      <div class="q-pt-md">
        <q-select
          label="Category"
          v-model="dataInput.catKey"
          map-options
          emit-value
          :options="catList"
          stack-label
          outlined
        />
      </div>
      <div class="q-pt-md">
        <q-input label="Code" v-model="dataInput.code" stack-label outlined />
      </div>
      <div class="q-pt-md">
        <q-input label="Product name" v-model="dataInput.name" stack-label outlined />
      </div>
      <div class="q-pt-md">
        <q-input label="Size" v-model="dataInput.size" stack-label outlined />
      </div>
      <div class="q-pt-md">
        <q-input label="Description" autogrow v-model="dataInput.description" stack-label outlined />
      </div>

      <div class="q-pt-md">
        <q-input
          accept="image/jpeg"
          v-model="dataInput.imgurl"
          style="width:100%"
          outlined
          type="file"
          label="Product image"
          stack-label
        />
      </div>
      <div class="q-pt-sm">Product image's size is 300 x 300 px</div>

      <div class="q-pt-md">
        <q-checkbox v-model="dataInput.newproduct" label="New product" color="grey-8" />
      </div>
      <div class="row q-pt-md">
        <div class="col" align="right">
          <q-btn outline label="Cancel" class="myBtn q-mr-md" @click="backToCatMain()" />
        </div>
        <div class="col" align="left">
          <q-btn color="grey-8 " class="myBtn q-ml-md" label="Save" @click="addNewCatBtn()" />
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../router/index.js";
import { st } from "../router/index.js";

export default {
  data() {
    return {
      categoryTitle: "",
      dataInput: {
        code: "",
        catKey: "",
        description: "",
        imgurl: "",
        name: "",
        page: "Products",
        size: "",
        newproduct: true
      },
      catList: []
    };
  },
  methods: {
    backToCatMain() {
      if (this.$route.params.page == "f") {
        this.$router.push("/product/f");
      } else {
        this.$router.push("/product/h");
      }
    },
    loadCat() {
      this.catList = [];
      db.collection("category")
        .where("page", "==", this.dataInput.page)
        .get()
        .then(doc => {
          doc.forEach(data => {
            let temp = {
              label: data.data().categoryName,
              value: data.id
            };
            this.catList.push(temp);
          });
          this.catList.sort((a, b) => (a.label > b.label ? 1 : -1));
          this.dataInput.catKey = this.catList[0].value;
        });
    },
    async addNewCatBtn() {
      //check validattion
      if (!this.dataInput.code.length > 0) {
        this.$q.notify({
          message: "Please input product code",
          icon: "fas fa-exclamation-triangle",
          color: "negative"
        });
        return;
      }
      if (!this.dataInput.name.length > 0) {
        this.$q.notify({
          message: "Please input product name",
          icon: "fas fa-exclamation-triangle",
          color: "negative"
        });
        return;
      }

      let productSave = await db.collection("product").add({
        code: this.dataInput.code,
        description: this.dataInput.description,
        size: this.dataInput.size,
        name: this.dataInput.name,
        newproduct: this.dataInput.newproduct,
        page: this.categoryTitle,
        category: this.dataInput.catKey
      });

      let getImage = await st
        .child("image/" + productSave.id + ".jpg")
        .put(this.dataInput.imgurl[0]);

      let getImageURL = await getImage.ref.getDownloadURL();
      await db
        .collection("product")
        .doc(productSave.id)
        .update({
          imgURL: getImageURL
        })
        .then(() => {
          this.$q
            .dialog({
              title: "Save completely",
              message: "Add " + this.dataInput.code + " completely",
              persistent: true
            })
            .onOk(() => {
              this.backToCatMain();
            });
        });
    }
  },
  mounted() {
    if (this.$route.params.page == "f") {
      this.categoryTitle = "Products";
      this.dataInput.page = "Products";
    } else {
      this.categoryTitle = "Gallery";
      this.dataInput.page = "Gallery";
    }
    this.loadCat();
  }
};
</script>

<style lang="sass"  scoped>
.myBtn
  min-width: 120px
</style> >

