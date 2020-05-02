<template>
  <div>
    <div class="text-h5 q-pt-md" align="center">Edit Category</div>
    <div style="width:100%; max-width:600px; margin:auto">
      <div class="text-body1 q-pt-md">
        <div class="col">
          <table>
            <tr>
              <td style="width:80px;">Page :</td>
              <td>
                <q-radio v-model="dataInput.page" val="Furniture" label="Furniture" />
              </td>
              <td>
                <q-radio v-model="dataInput.page" val="HomeDecor" label="HomeDecor" />
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="q-pt-md">
        <q-input label="Order ID" type="number" v-model="dataInput.orderId" stack-label outlined />
      </div>
      <div class="q-pt-md">
        <q-input label="Category Name" v-model="dataInput.categoryName" stack-label outlined />
      </div>
      <div class="row q-pt-md">
        <div class="col" align="right">
          <q-btn outline label="Cancel" class="myBtn q-mr-md" @click="backToCatMain()" />
        </div>
        <div class="col" align="left">
          <q-btn color="grey-8 " class="myBtn q-ml-md" label="Save" @click="saveCatBtn()" />
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
      id: "",
      dataInput: {
        orderId: "",
        categoryName: "",
        page: ""
      }
    };
  },
  methods: {
    backToCatMain() {
      if (this.dataInput.page == "Furniture") {
        this.$router.push("/category/f");
      } else {
        this.$router.push("/category/h");
      }
    },
    loadData() {
      db.collection("category")
        .doc(this.id)
        .get()
        .then(data => {
          this.dataInput = data.data();
        });
    },
    saveCatBtn() {
      db.collection("category")
        .doc(this.id)
        .update(this.dataInput)
        .then(() => {
          this.$q
            .dialog({
              title: "Save completely",
              message: "Update " + this.dataInput.categoryName + " completely",
              persistent: true
            })
            .onOk(() => {
              this.backToCatMain();
            });
        });
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.loadData();
  }
};
</script>

<style lang="sass"  scoped>
.myBtn
  min-width: 120px
</style> >

