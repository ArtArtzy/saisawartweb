<template>
  <q-layout view="lHh Lpr lFf">
    <app-menu></app-menu>
    <div>
      <q-resize-observer @resize="onResize" />
      <!-- Refer: https://www.templatemonster.com/demo/63514.html -->

      <!-- Big banner -->
      <div v-if="innerWidth > 1024">
        <img src="statics/image/banner.jpg" style="height:100%; width:100%" alt />
      </div>
      <!-- Furniture banner -->
      <div class="row mainDiv" v-if="innerWidth > 1024">
        <div class="col-6">
          <div class="q-py-md">
            <img src="statics/image/furniture2.jpg" style="width:100%" alt />
          </div>
          <!-- Home Decor banner -->
          <div class="q-pb-md">
            <img src="statics/image/homedecor.jpg" style="width:100%" alt />
          </div>
        </div>
        <!-- Info -->
        <div class="col-6">
          <div class="q-py-md q-px-md">
            <img src="statics/image/tree.jpg" style="width:100%; " alt />
          </div>
        </div>
      </div>
      <div class="row mainDiv" v-if="innerWidth <= 1024">
        <div class="col-12">
          <div class>
            <img src="statics/image/furniture_m.jpg" style="width:100%" alt />
          </div>
          <!-- Home Decor banner -->
          <div class>
            <img src="statics/image/homedecor_m.jpg" style="width:100%" alt />
          </div>
          <!-- Info -->
          <div class="col-12 q-pb-md">
            <img src="statics/image/tree_m.jpg" style="width:100%; " alt />
          </div>
        </div>
      </div>

      <!-- New product -->
      <div class="mainDiv" v-if="innerWidth > 1024">
        <div class="text-h4 q-my-sm" align="center">New Products</div>
        <div class="row q-mb-xl">
          <div class="col-3" v-for="i in 8" :key="i">
            <div>
              <img src="statics/image/new01.jpg" style="width:100%" />
            </div>
            <div class="text-body1" align="center">ZB00{{i}} : Pedestal Dining Table</div>
          </div>
        </div>
      </div>

      <div class="mainDiv" v-if="innerWidth <= 1024 && innerWidth >500">
        <div class="text-h4 q-my-sm" align="center">New Products</div>
        <div class="row q-mb-xl">
          <div class="col-4" v-for="i in 6" :key="i">
            <div>
              <img src="statics/image/new01.jpg" style="width:100%" />
            </div>
            <div class="text-body1" align="center">ZB00{{i}} : Pedestal Dining Table</div>
          </div>
        </div>
      </div>

      <div class="mainDiv" v-if="innerWidth  <=500">
        <div class="row">
          <div class="col text-h4 q-my-sm q-px-md" align="left">
            New
            <br />Product
          </div>
          <div class="row" style="width:100px;">
            <div class="col-6 self-end q-pb-md">
              <q-icon name="fas fa-chevron-left" class="text-grey-8" size="24px" />
            </div>

            <div class="col-6 self-end q-pb-md">
              <q-icon name="fas fa-chevron-right" class="text-grey-8" size="24px" />
            </div>
          </div>
        </div>
        <div class="row q-mb-xl">
          <div class="col-12">
            <div align="center">
              <img src="statics/image/new01.jpg" style="width:80%" />
            </div>
            <div class="text-body1" align="center">ZB001 : Pedestal Dining Table</div>
          </div>
        </div>
      </div>

      <!-- Get the lastest news -->
      <div class="getNewsBg q-py-xl" v-if="innerWidth  >=1000">
        <div class="mainDiv row">
          <div class="col-7 q-px-md">
            <div class="text-h4 text-white">Get the Lastest News Delivered</div>
            <div
              class="text-white q-pt-md"
            >Give us your email and you will be updated with the lastest catalog, in detail.</div>
          </div>

          <div class="col-5 row">
            <div class="col">
              <q-input
                outlined
                label="Enter your email address"
                label-color="white"
                color="white"
                dark
                v-model="emailSubscribe"
                @keyup.enter="subscribeBtn()"
              >
                <template v-slot:prepend>
                  <q-icon name="far fa-envelope" />
                </template>
              </q-input>
            </div>
            <div style="width:150px" align="center">
              <q-btn
                color="white"
                text-color="black"
                label="Subscribe"
                no-caps
                style="height:54px; width:120px;"
                @click="subscribeBtn()"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="getNewsBg q-py-md" v-if="innerWidth  <1000">
        <div class="mainDiv row">
          <div class="col-12 q-px-md">
            <div class="text-h5 text-white" align="center">Get the Lastest News Delivered</div>
            <div
              class="text-white q-pt-sm"
              align="center"
            >Give us your email and you will be updated with the lastest catalog, in detail.</div>
          </div>

          <div class="col-12 q-px-md q-pt-md" align="center">
            <q-input
              outlined
              label="Enter your email address"
              dark
              style=" width:100%; max-width:500px;"
              label-color="white"
              color="white"
              v-model="emailSubscribe"
              @keyup.enter="subscribeBtn()"
            >
              <template v-slot:prepend>
                <q-icon name="far fa-envelope" />
              </template>
            </q-input>
          </div>
          <div class="col-12 q-px-md q-pt-md" align="center">
            <q-btn
              color="white"
              text-color="black"
              label="Subscribe"
              no-caps
              style="height:54px; width:100%; max-width:500px;"
              @click="subscribeBtn()"
            />
          </div>
        </div>
      </div>
      <!-- footer -->
      <app-footer></app-footer>
    </div>
  </q-layout>
</template>

<script>
import { db } from "../router/index.js";
import appFooter from "../components/footer.vue";
import appMenu from "../components/menu.vue";
export default {
  data() {
    return {
      tab: "home",
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      leftDrawerOpen: false,
      emailSubscribe: ""
    };
  },
  components: {
    appFooter,
    appMenu
  },
  methods: {
    subscribeBtn() {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (this.emailSubscribe.match(mailformat)) {
        this.$q
          .dialog({
            title: "Confirmation",
            message: "Please re-enter your email to confirm again",
            prompt: {
              model: "",
              type: "text" // optional
            },
            cancel: true,
            persistent: true
          })
          .onOk(data => {
            if (data == this.emailSubscribe) {
              let currentDate = new Date();
              db.collection("member")
                .add({
                  email: this.emailSubscribe,
                  timestamp: currentDate.getTime()
                })
                .then(() => {
                  this.emailSubscribe = "";
                });
            } else {
              this.$q.notify({
                message: "Your email address is not same",
                icon: "fas fa-exclamation-triangle",
                color: "negative"
              });
              return;
            }
          });
      } else {
        this.$q.notify({
          message: "Please input your email address",
          icon: "fas fa-exclamation-triangle",
          color: "negative"
        });
        return;
      }
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
.footerBg
  background-color: #EAEAEA
.textLink
  color: #6A6A6A
.getNewsBg
  background-color: #6A6A6A
.menuMobile
  padding: 10px
  font-size: 20px
</style>