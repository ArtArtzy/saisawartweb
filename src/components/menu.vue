<template>
  <div>
    <q-resize-observer @resize="onResize" />
    <!-- header menu -->
    <div class="mainDiv">
      <!-- For menu 1024px++ -->
      <div class="row" v-if="innerWidth > 1024">
        <div style="width:300px">
          <router-link to="/" class="notext cursor-pointer">
            <img src="statics/image/logo-1.jpg" style="height:70px;" alt="Saisawart Logo" />
          </router-link>
        </div>
        <div class="col row text-h6 q-px-md">
          <div class="col-2 setHeightMenu textLink item-center" align="Center">
            <router-link to="/" class="notext cursor-pointer">Home</router-link>
          </div>

          <div class="col-2 setHeightMenu item-center" align="Center">
            <router-link to="/furniture/100" class="notext cursor-pointer">Furniture</router-link>
          </div>
          <div class="col-2 setHeightMenu cursor-pointer item-center" align="Center">
            <router-link to="/homedecor/100" class="notext cursor-pointer">Home Decor</router-link>
          </div>

          <div class="col-2 setHeightMenu item-center" align="Center">
            <router-link to="/info" class="notext cursor-pointer">Info</router-link>
          </div>

          <div class="col-4 setHeightMenu item-cente" align="Center">
            <div style="height:40px;" class="row">
              <div class="col-11">
                <q-input
                  class="q-pt-md"
                  placeholder="Search  here"
                  v-model="txtSearch"
                  @keyup.enter="searchBtn()"
                />
              </div>
              <div class="col" style="width:70px">
                <q-icon name="fas fa-search" class="cursor-pointer" @click="searchBtn()" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- For menu <1024 -->
      <div v-if="innerWidth <= 1024">
        <div class="row">
          <div class="col-1" style="width:50px;">
            <q-btn
              flat
              @click=" leftDrawerOpen = !leftDrawerOpen"
              round
              size="lg"
              dense
              icon="menu"
              class="text-grey-8"
            />
          </div>
          <div class="col">
            <router-link to="/" class="notext cursor-pointer">
              <img src="statics/image/logo-1m2.jpg" alt="Saisawart Logo" style="height: 40px;" />
            </router-link>
          </div>

          <div class="col-2" style="width:250px;" v-if="innerWidth>=600">
            <q-input dense placeholder="Search  here" class="q-pt-md" style="height:30px;" />
          </div>
          <div class="col-1" style="width:70px;">
            <q-icon
              name="fas fa-search"
              class="q-pt-md text-grey-8 cursor-pointer"
              size="sm"
              style="padding-top:28px;"
              @click="showSearchBox()"
            />
          </div>
        </div>

        <q-drawer
          v-model="leftDrawerOpen"
          :width="300"
          :breakpoint="1023"
          overlay
          bordered
          content-class="bg-white"
        >
          <router-link to="/" class="notext cursor-pointer">
            <div class="menuMobile textLink">Home</div>
          </router-link>

          <router-link to="/furniture/100" class="notext cursor-pointer">
            <div class="menuMobile">Furniture</div>
          </router-link>

          <router-link to="/homedecor/100" class="notext cursor-pointer">
            <div class="menuMobile">Home Decor</div>
          </router-link>

          <router-link to="info" class="notext cursor-pointer">
            <div class="menuMobile">Info</div>
          </router-link>
        </q-drawer>
      </div>
      <!-- Finish menu for 1200px++ -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      leftDrawerOpen: false,
      tab: "home",
      txtSearch: ""
    };
  },
  methods: {
    searchBtn() {
      this.$router.push("/search/" + this.txtSearch);
      this.txtSearch = "";
    },
    showSearchBox() {
      this.$q
        .dialog({
          title: "Search ",
          message: "Which product name / product code are you looking for?",
          prompt: {
            model: "",
            type: "text" // optional
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          this.txtSearch = data;
          this.searchBtn();
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        });
    },
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
.setHeightMenu
  line-height: 80px;
.menuMobile
  padding: 10px
  font-size: 20px
.notext
  text-decoration: none
  color: black
</style>