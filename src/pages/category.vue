<template>
  <div class="text-body1">
    <div
      class="col-12 text-h5 q-pt-md"
      align="center"
      style="width:100%; max-width:800px; margin:auto"
    >Category</div>
    <div class="q-pa-md row" style="width:100%; max-width:800px; margin:auto">
      <div class="col">
        <table>
          <tr>
            <td style="width:80px;">Page :</td>
            <td>
              <q-radio
                v-model="category"
                val="Furniture"
                label="Furniture"
                @input="showCategory()"
              />
            </td>
            <td>
              <q-radio
                v-model="category"
                val="Homedecor"
                label="Homedecor"
                @input="showCategory()"
              />
            </td>
          </tr>
        </table>
      </div>
      <div class="col q-pt-md" align="right">
        <q-btn
          label="+ Add New Category"
          class="bg-grey-8 text-white"
          no-caps
          @click="addNewBtn()"
        />
      </div>
    </div>

    <div style="width:100%; max-width:800px; margin:auto">
      <q-table :data="data" :columns="columns" row-key="name" :pagination.sync="pagination">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="orderId" :props="props" style="width:200px;">
              <div class="q-py-sm">{{ props.row.orderId }}</div>
            </q-td>
            <q-td key="catName" :props="props">
              <div class="q-py-sm" align="left">{{ props.row.categoryName }}</div>
            </q-td>
            <q-td key="delete" :props="props" style="width:100px;">
              <div class="q-py-sm cursor-pointer" @click="deleteCat(props.row.id)">
                <u>Delete</u>
              </div>
            </q-td>
            <q-td key="edit" :props="props" style="width:100px;">
              <div class="q-py-sm cursor-pointer" @click="editCat(props.row.id)">
                <u>Edit</u>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import { db } from "../router/index.js";
export default {
  data() {
    return {
      category: "Furniture",
      pagination: {
        rowsPerPage: 0
      },
      categoryFullList: [],
      data: [],
      columns: [
        {
          name: "orderId",
          label: "Order Id",
          align: "center"
        },
        {
          name: "catName",
          label: "Category Name",
          align: "left"
        },
        {
          name: "delete",
          label: "Delete",
          align: "center"
        },
        {
          name: "edit",
          label: "Edit",
          align: "center"
        }
      ]
    };
  },
  methods: {
    addNewBtn() {
      if (this.category == "Furniture") {
        this.$router.push("/category/add/f");
      } else {
        this.$router.push("/category/add/h");
      }
    },
    loadCategoryName() {
      this.categoryFullList = [];
      db.collection("category")
        .get()
        .then(doc => {
          doc.forEach(data => {
            let temp = {
              id: data.id
            };
            let tempFinal = { ...temp, ...data.data() };
            this.categoryFullList.push(tempFinal);
          });
          this.categoryFullList.sort((a, b) => {
            return Number(a.orderId) - Number(b.orderId);
          });
          this.showCategory();
        });
    },
    showCategory() {
      this.data = [];
      this.data = this.categoryFullList.filter(x => x.page == this.category);
    },
    deleteCat(id) {
      let catName = this.categoryFullList.filter(x => x.id == id);
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to delete " + catName[0].categoryName + "?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          db.collection("category")
            .doc(id)
            .delete()
            .then(() => {
              this.loadCategoryName();
              this.$q.notify({
                message: "Delete completely",
                icon: "fas fa-check-circle",
                color: "secondary"
              });
            });
        });
    },
    editCat(id) {
      this.$router.push("/category/edit/" + id);
    }
  },
  mounted() {
    if (this.$route.params.page == "f") {
      this.category = "Furniture";
    } else {
      this.category = "Homedecor";
    }
    this.loadCategoryName();
  }
};
</script>
