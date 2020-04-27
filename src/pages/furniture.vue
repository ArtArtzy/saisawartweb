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
            <div class="text-h5 q-pb-md q-px-sm">Furniture</div>
            <div class="q-pa-sm activeMenu row">
              <div class="col-8">Table</div>
              <div class="col-4 q-pr-md" align="right">14</div>
            </div>
            <div class="q-pa-sm row">
              <div class="col-8">Coffee Table</div>
              <div class="col-4 q-pr-md" align="right">24</div>
            </div>
            <div class="q-pa-sm row">
              <div class="col-8">Bed Table</div>
              <div class="col-4 q-pr-md" align="right">14</div>
            </div>
            <div class="q-pa-sm row">
              <div class="col-8">Console</div>
              <div class="col-4 q-pr-md" align="right">10</div>
            </div>
            <div class="q-pa-sm row">
              <div class="col-8">Bench</div>
              <div class="col-4 q-pr-md" align="right">14</div>
            </div>
            <div class="q-pa-sm row">
              <div class="col-8">Bar table</div>
              <div class="col-4 q-pr-md" align="right">24</div>
            </div>
            <div class="q-pa-sm row">
              <div class="col-8">Shelf</div>
              <div class="col-4 q-pr-md" align="right">20</div>
            </div>
          </div>
          <!-- right menu -->
          <div class="col">
            <div class="text-h5 q-px-md">Table</div>
            <div class="row q-pl-md q-pt-md">
              <div class="col-md-4 col-sm-6 q-pb-md" align="center" v-for="i in 12" :key="i">
                <div
                  class="borderProduct cursor-pointer relative-position q-pb-md"
                  style="width:90%; margin:auto;"
                >
                  <div
                    v-if="i==1"
                    align="right"
                    class="q-pa-sm"
                    style="position:relative;z-index:999"
                  >
                    <q-chip icon="star" color="grey-8" text-color="white">New</q-chip>
                  </div>
                  <router-link to="/detail/f/123" class="cursor-pointer notext">
                    <div v-if="i==1" style="position:relative;top:-50px;">
                      <img src="statics/image/new01.jpg" style="width:90%" />

                      <div class="text-body1">RB-001: George Nelson Ball Clock Test Data</div>
                    </div>
                    <div v-if="i!=1">
                      <img src="statics/image/new01.jpg" style="width:90%" />
                      <div class="text-body1">RB-002: George Nelson Ball Clock</div>
                    </div>
                  </router-link>
                </div>
              </div>
              <div style="margin:auto">
                <q-pagination v-model="currentPage" color="grey-8" :max="5" :direction-links="true"></q-pagination>
              </div>
            </div>
          </div>
        </div>
        <!-- for innerWidth <=800 -->
        <div v-if="innerWidth <= 800">
          <div class="text-h6 q-pa-sm">Furniture</div>
          <div style="width:90%; max-width:500px;margin:auto" class="q-pb-md">
            <q-select outlined v-model="type" :options="typeOption"></q-select>
          </div>
          <hr style="width:90%" />
          <div class="row q-pt-md">
            <div v-for="i in 12" :key="i" class="col-sm-6 col-xs-12 q-mb-md">
              <div
                class="borderProduct cursor-pointer relative-position q-pb-md"
                style="width:90%; margin:auto;"
              >
                <div
                  v-if="i==1"
                  align="right"
                  class="q-pa-sm"
                  style="position:relative;z-index:999"
                >
                  <q-chip icon="star" color="grey-8" text-color="white">New</q-chip>
                </div>
                <router-link to="/detail/f/123" class="cursor-pointer notext">
                  <div v-if="i==1" style="position:relative;top:-50px;">
                    <div style="margin:auto;" align="center">
                      <img src="statics/image/new01.jpg" style="width:90%; max-width:250px; " />
                    </div>
                    <div
                      style="width:90%; margin:auto;"
                      align="center"
                      class="text-body1"
                    >RB-001: George Nelson Ball Clock Test Data</div>
                  </div>
                  <div v-if="i!=1">
                    <div style="margin:auto;" align="center">
                      <img src="statics/image/new01.jpg" style="width:90%; max-width:250px; " />
                    </div>
                    <div
                      style="width:90%; margin:auto;"
                      align="center"
                      class="text-body1"
                    >RB-002: George Nelson Ball Clock</div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  </q-layout>
</template>

<script>
import appFooter from "../components/footer.vue";
import appMenu from "../components/menu.vue";
export default {
  data() {
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      currentPage: 1,
      type: "Table",
      typeOption: ["Table", "Coffee Table", "Bed Table"]
    };
  },
  components: {
    appFooter,
    appMenu
  },
  methods: {
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    }
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