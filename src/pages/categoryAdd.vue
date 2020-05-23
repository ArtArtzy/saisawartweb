<template>
  <div>
    <div class="text-h5 q-pt-md" align="center">Add New Category</div>
    <div style="width:100%; max-width:600px; margin:auto">
      <div class="text-body1 q-pt-md">
        <b>Page</b>
        :
        {{categoryTitle}}
      </div>
      <div class="q-pt-md">
        <q-input label="Order ID" type="number" v-model="dataInput.orderId" stack-label outlined />
      </div>
      <div class="q-pt-md">
        <q-input label="Category Name" v-model="dataInput.name" stack-label outlined />
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
export default {
  data() {
    return {
      categoryTitle: "",
      dataInput: {
        orderId: "",
        name: ""
      }
    };
  },
  methods: {
    backToCatMain() {
      if (this.$route.params.page == "f") {
        this.$router.push("/category/f");
      } else {
        this.$router.push("/category/h");
      }
    },
    addNewCatBtn() {
      //check validattion
      if (!this.dataInput.orderId.length > 0) {
        this.$q.notify({
          message: "Please input Order ID",
          icon: "fas fa-exclamation-triangle",
          color: "negative"
        });
        return;
      }
      if (!this.dataInput.name.length > 0) {
        this.$q.notify({
          message: "Please input Category Name",
          icon: "fas fa-exclamation-triangle",
          color: "negative"
        });
        return;
      }
      db.collection("category")
        .add({
          page: this.categoryTitle,
          orderId: this.dataInput.orderId,
          categoryName: this.dataInput.name
        })
        .then(() => {
          this.$q
            .dialog({
              title: "Save completely",
              message: "Add " + this.dataInput.name + " completely",
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
    } else {
      this.categoryTitle = "Gallery";
    }
  }
};
</script>

<style lang="sass"  scoped>
.myBtn
  min-width: 120px
</style> >

