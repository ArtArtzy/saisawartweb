<template>
  <q-layout view="lHh Lpr lFf">
    <app-menu></app-menu>
    <div>
      <div class="mainDiv">
        <q-resize-observer @resize="onResize" />
        <!-- for > 1000 -->
        <div class="row q-py-xl" v-if="innerWidth > 800">
          <!-- left menu -->
          <div class="col-4 borderR" style="width:250px">
            <div class="text-h5 q-pb-md q-px-sm">{{pageName}}</div>
            <div v-for="(item,index) in typeOption" :key="index">
              <router-link :to="'/furniture/' + item.value " class="cursor-pointer notext">
                <div class="q-pa-sm row" :class="{'activeMenu' : item.value == catCode.toString()}">
                  <div class="col-12">{{item.label}}</div>
                </div>
              </router-link>
            </div>
          </div>
          <!-- right menu -->
          <div class="col">
            <div class="text-h5 q-px-md">{{catName}}</div>
            <div class="row q-pl-md q-pt-md">
              <div
                class="col-md-4 col-sm-6 q-pb-md"
                align="center"
                v-for="(item,index) in productShow"
                :key="index"
              >
                <div
                  class="borderProduct cursor-pointer relative-position q-pb-md"
                  style="width:90%; margin:auto;"
                >
                  <div
                    v-if="item.newproduct"
                    align="right"
                    class="q-pa-sm"
                    style="position:relative;z-index:999"
                  >
                    <q-chip icon="star" color="grey-8" text-color="white">New</q-chip>
                  </div>
                  <router-link :to="'/detail/f/' + item.id" class="cursor-pointer notext">
                    <div v-if="item.newproduct" style="position:relative;top:-50px;">
                      <img :src="item.imgURL" style="width:90%" />

                      <div class="text-body1 q-px-sm">{{item.code}} : {{item.name}}</div>
                    </div>
                    <div v-if="!item.newproduct">
                      <img :src="item.imgURL" style="width:90%" />
                      <div class="text-body1 q-px-sm">{{item.code}} : {{item.name}}</div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
            <div style="margin:auto" class="row justify-center">
              <div>
                <q-pagination
                  v-model="currentPage"
                  color="grey-8"
                  :max="maxPage"
                  :direction-links="true"
                  @input="loadProductSelected()"
                ></q-pagination>
              </div>
            </div>
          </div>
        </div>
        <!-- for innerWidth <=800 -->
        <div v-if="innerWidth <= 800">
          <div class="text-h6 q-pa-sm">{{pageName}}</div>
          <div style="width:90%; max-width:500px;margin:auto" class="q-pb-md">
            <q-select outlined v-model="type" map-options emit-value :options="typeOption"></q-select>
          </div>
          <hr style="width:90%" />
          <div class="row q-pt-md">
            <div
              v-for="(item,index) in productShow"
              :key="index"
              class="col-sm-6 col-xs-12 q-mb-md"
            >
              <div
                class="borderProduct cursor-pointer relative-position q-pb-md"
                style="width:90%; margin:auto;"
              >
                <div
                  v-if="item.newproduct"
                  align="right"
                  class="q-pa-sm"
                  style="position:relative;z-index:999"
                >
                  <q-chip icon="star" color="grey-8" text-color="white">New</q-chip>
                </div>
                <router-link :to="'/detail/f/' + item.id" class="cursor-pointer notext">
                  <div v-if="item.newproduct" style="position:relative;top:-50px;">
                    <div style="margin:auto;" align="center">
                      <img :src="item.imgURL" style="width:90%; max-width:250px; " />
                    </div>
                    <div
                      style="width:90%; margin:auto;"
                      align="center"
                      class="text-body1"
                    >{{item.code}} : {{item.name}}</div>
                  </div>
                  <div v-if="!item.newproduct">
                    <div style="margin:auto;" align="center">
                      <img :src="item.imgURL" style="width:90%; max-width:250px; " />
                    </div>
                    <div
                      style="width:90%; margin:auto;"
                      align="center"
                      class="text-body1"
                    >{{item.code}} : {{item.name}}</div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div style="margin:auto" class="row q-pb-md justify-center">
            <div>
              <q-pagination
                v-model="currentPage"
                color="grey-8"
                :max="maxPage"
                :direction-links="true"
                @input="loadProductSelected()"
              ></q-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  </q-layout>
</template>

<script>
import { db } from "../router/index.js";
import { st } from "../router/index.js";
import appFooter from "../components/footer.vue";
import appMenu from "../components/menu.vue";
export default {
  data() {
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      pageName: "Furniture",
      currentPage: 1,
      type: "Table",
      typeOption: [],
      catList: [],
      catCode: "",
      catName: "",
      productFullList: [],
      productShow: [],
      productInPage: [],
      maxPage: 1,
      productPerRow: 12
    };
  },
  components: {
    appFooter,
    appMenu
  },
  methods: {
    loadCatagory() {
      this.catList = [];
      this.typeOption = [];
      db.collection("category")
        .where("page", "==", this.pageName)
        .get()
        .then(doc => {
          doc.forEach(data => {
            let temp = {
              id: data.id
            };
            let tempFinal = { ...temp, ...data.data() };
            this.catList.push(tempFinal);
          });
          this.catList.sort((a, b) => Number(a.orderId) - Number(b.orderId));
          this.catList.forEach(x => {
            let temp = {
              label: x.categoryName,
              value: x.orderId
            };
            this.typeOption.push(temp);
          });
          let tempName = this.typeOption.filter(
            x => x.value == this.catCode.toString()
          );
          this.catName = tempName[0].label;
          this.type = tempName[0];
          this.loadProductFull();
        });
    },
    loadProductFull() {
      this.productFullList = [];
      let catId = this.catList.filter(x => x.orderId == this.catCode)[0].id;

      db.collection("product")
        .where("page", "==", this.pageName)
        .where("category", "==", catId)
        .get()
        .then(doc => {
          doc.forEach(data => {
            let temp = {
              id: data.id
            };
            let tempFinal = { ...temp, ...data.data() };
            this.productFullList.push(tempFinal);
          });
          this.productFullList.sort((a, b) => (a.code > b.code ? 1 : -1));

          this.maxPage = Math.ceil(
            Object.keys(this.productFullList).length / this.productPerRow
          );
          this.loadProductSelected();
        });
    },
    loadProductSelected() {
      this.productShow = [];
      this.productShow = this.productFullList.slice(
        (this.currentPage - 1) * this.productPerRow,
        this.currentPage * this.productPerRow
      );
    },

    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    }
  },
  watch: {
    "$route.params.cat": function(data) {
      this.catCode = this.$route.params.cat;
      this.loadCatagory();
    }
  },
  mounted() {
    this.catCode = this.$route.params.cat;
    this.pageName = this.$route.name;
    this.loadCatagory();
  }
};
</script>

<style lang="sass" scoped>
.mainDiv
  max-width: 1200px;
  width: 100%
  margin: auto;
.borderR
  border-right: 2px solid #EAEAEA
.activeMenu
  background-color: #6A6A6A
  color: white
.borderProduct
  border: 1px solid #EAEAEA
  border-radius: 10px
  height: 330px;
.notext
  text-decoration: none
  color: black
</style>