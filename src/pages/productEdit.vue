<template>
  <div>
    <div class="text-h5 q-pt-md" align="center">Edit Product</div>
    <div style="width:100%; max-width:600px; margin:auto">
      <div class="text-body1 q-pt-md">
        <b>Page</b>
        :
        {{categoryTitle}}
      </div>
      <div class="q-pt-md">
        <q-select
          label="Category"
          v-model="dataInput.category"
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

      <div class="q-pt-md" align="center" v-if="dataInput.imgURL != '' && !deleteImg">
        <img :src="dataInput.imgURL" style="width:300px; height:300px;" />
      </div>
      <div class="q-pt-md" align="center" v-if="dataInput.imgURL != '' && !deleteImg">
        <q-btn label="Delete product" color="grey-8" no-caps @click="deleteBtn()" />
      </div>
      <div class="q-pt-md" v-if="dataInput.imgURL == '' || deleteImg">
        <q-input
          accept="image/jpeg"
          v-model="dataInput.imgURL"
          style="width:100%"
          outlined
          type="file"
          label="Product image"
          stack-label
        />
      </div>
      <div
        class="q-pt-sm"
        v-if="dataInput.imgURL == '' || deleteImg"
      >Product image's size is 300 x 300 px</div>

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
      dataKey: "",
      categoryTitle: "",
      dataInput: {
        code: "",
        description: "",
        imgURL: "",
        name: "",
        page: "Furniture",
        size: "",
        newproduct: true,
        category: ""
      },
      deleteImg: false,
      catList: []
    };
  },
  methods: {
    backToCatMain() {
      if (this.categoryTitle == "Furniture") {
        this.$router.push("/product/f");
      } else {
        this.$router.push("/product/h");
      }
    },
    loadProduct() {
      this.dataKey = this.$route.params.id;
      db.collection("product")
        .doc(this.dataKey)
        .get()
        .then(data => {
          this.dataInput = data.data();
          this.categoryTitle = data.data().page;
          this.loadCat();
        });
    },
    deleteBtn() {
      this.$q
        .dialog({
          message: "Delete image",
          persistent: true,
          cancel: true
        })
        .onOk(() => {
          this.deleteImg = true;
          this.dataInput.imgURL = "";
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

      if (this.dataInput.imgURL == "") {
        this.$q.notify({
          message: "Please upload product image",
          icon: "fas fa-exclamation-triangle",
          color: "negative"
        });
        return;
      }

      let productSave = await db
        .collection("product")
        .doc(this.dataKey)
        .update({
          code: this.dataInput.code,
          description: this.dataInput.description,
          size: this.dataInput.size,
          name: this.dataInput.name,
          newproduct: this.dataInput.newproduct,
          page: this.categoryTitle,
          category: this.dataInput.category
        });

      if (this.deleteImg) {
        st.child("/image/" + this.dataKey + ".jpg").delete();
        let getImage = await st
          .child("image/" + this.dataKey + ".jpg")
          .put(this.dataInput.imgURL[0]);

        let getImageURL = await getImage.ref.getDownloadURL();
        await db
          .collection("product")
          .doc(this.dataKey)
          .update({
            imgURL: getImageURL
          })
          .then(() => {
            this.$q
              .dialog({
                title: "Save completely",
                message: "Update " + this.dataInput.code + " completely",
                persistent: true
              })
              .onOk(() => {
                this.backToCatMain();
              });
          });
      } else {
        this.backToCatMain();
      }
    },
    loadCat() {
      this.catList = [];
      db.collection("category")
        .where("page", "==", this.categoryTitle)
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
    }
  },
  mounted() {
    this.loadProduct();
  }
};
</script>

<style lang="sass"  scoped>
.myBtn
  min-width: 120px
</style> >

