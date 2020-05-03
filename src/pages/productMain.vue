<template>
  <div class="text-body1">
    <div
      class="col-12 text-h5 q-pt-md"
      align="center"
      style="width:100%; max-width:1200px; margin:auto"
    >Product</div>
    <div class="q-pa-md row" style="width:100%; max-width:1200px; margin:auto">
      <div class="col">
        <table>
          <tr>
            <td style="width:80px;">Page :</td>
            <td>
              <q-radio v-model="page" val="Furniture" label="Furniture" @input="showCategory()" />
            </td>
            <td>
              <q-radio v-model="page" val="Homedecor" label="HomeDecor" @input="showCategory()" />
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div style="width:100%; max-width:1200px; margin:auto">
      <div class="row">
        <div class="q-py-md">
          <q-select
            label="Category"
            v-model="catKey"
            map-options
            emit-value
            :options="catList"
            stack-label
            outlined
            style="width: 400px;"
            @input="showData()"
          />
        </div>
        <div class="col q-pt-md" align="right">
          <q-btn
            label="+ Add New Product"
            class="bg-grey-8 text-white"
            @click="addNewBtn()"
            no-caps
          />
        </div>
      </div>
      <q-table :data="data" :columns="columns" row-key="name" :pagination.sync="pagination">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="code" :props="props" style="width:100px;">
              <div class="q-py-sm">
                <div class="text-h6">{{ props.row.code }}</div>

                <div v-if="props.row.newproduct">
                  <q-chip icon="star" color="grey-8" text-color="white">New</q-chip>
                </div>
              </div>
            </q-td>
            <q-td key="image" :props="props" style="width:200px;">
              <div class="q-py-sm" align="left">
                <img :src="props.row.imgURL" style="width:150px; height:150px;" />
              </div>
            </q-td>
            <q-td key="des" :props="props" :style="{width: '500px', whiteSpace: 'normal'}">
              <div class="q-py-sm" align="left">
                <div class="text-h4">{{ props.row.code }}</div>
                <div class="text-h6">{{ props.row.name }}</div>
                <div v-if="props.row.size.length !=0">size : {{ props.row.size }}</div>
                <div>{{ props.row.description }}</div>
              </div>
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
import { st } from "../router/index.js";
export default {
  data() {
    return {
      page: "Furniture",
      pagination: {
        rowsPerPage: 20
      },
      productFullList: [],
      category: "",
      data: [],
      catKey: "",
      catList: [],
      catFullList: [],
      columns: [
        {
          name: "code",
          label: "Code",
          align: "center"
        },
        {
          name: "image",
          label: "Image",
          align: "center"
        },
        {
          name: "des",
          label: "Description",
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
      if (this.page == "Furniture") {
        this.$router.push("/product/add/f");
      } else {
        this.$router.push("/product/add/h");
      }
    },
    loadProductName() {
      this.productFullList = [];
      db.collection("product")
        .get()
        .then(doc => {
          doc.forEach(data => {
            let temp = {
              id: data.id
            };
            let tempFinal = { ...temp, ...data.data() };
            this.productFullList.push(tempFinal);
          });
          this.productFullList.sort((a, b) => {
            return a.code > b.code ? 1 : -1;
          });
          this.showCategory();
        });
    },
    showCategory() {
      this.catList = [];

      this.catList = this.catFullList.filter(x => x.page == this.page);
      setTimeout(() => {
        this.catKey = this.catList[0].value;
      }, 1);

      this.showData();
    },
    showData() {
      setTimeout(() => {
        this.data = [];
        this.data = this.productFullList.filter(x => x.category == this.catKey);
      }, 1);
    },
    deleteCat(id) {
      let catName = this.productFullList.filter(x => x.id == id);
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to delete " + catName[0].code + "?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          db.collection("product")
            .doc(id)
            .delete()
            .then(() => {
              st.child("/image/" + id + ".jpg").delete();
              this.loadProductName();
              this.$q.notify({
                message: "Delete completely",
                icon: "fas fa-check-circle",
                color: "secondary"
              });
            });
        });
    },
    editCat(id) {
      this.$router.push("/product/edit/" + id);
    },
    async loadCatFull() {
      this.catFullList = [];
      await db
        .collection("category")
        .get()
        .then(doc => {
          doc.forEach(data => {
            let temp = {
              label: data.data().categoryName,
              value: data.id,
              page: data.data().page,
              orderId: data.data().orderId
            };
            this.catFullList.push(temp);
          });
          this.catFullList.sort(
            (a, b) => Number(a.orderId) - Number(b.orderId)
          );

          this.showCategory();
        });
    }
  },
  async mounted() {
    if (this.$route.params.page == "f") {
      this.category = "Furniture";
    } else {
      this.category = "HomeDecor";
    }
    await this.loadProductName();
    await this.loadCatFull();
  }
};
</script>
