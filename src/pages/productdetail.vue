<template>
  <q-layout view="lHh Lpr lFf">
    <app-menu></app-menu>

    <div class="mainDiv">
      <q-resize-observer @resize="onResize" />
      <div class="q-px-md">Furniture > Table > RB-001</div>

      <!-- For desktop -->
      <!-- <div v-if="innerWidth > 800"> -->
      <div class="q-mt-md row">
        <div class="col-md-6 col-sm-6" align="center">
          <img src="statics/image/new01.jpg" style="width:90%; max-width:400px;" />
        </div>
        <div class="col-md-6 col-sm-6 q-pa-md">
          <div class="text-h6">ZSH0003</div>
          <div class="text-body1">Chamcha Wood Shelf with dark</div>
          <div class="text-body1">Size : 12 x 48 x 72 inch.</div>
          <div
            class="q-pt-md"
          >We made to order – customs design. Please feel free to contact us if you require any further information. Our email address: zsihomedecor@gmail.com and assure you that your order and inquiry will receive our immediate attention.</div>
        </div>
      </div>
      <!-- </div> -->
      <!-- For mobile -->
      <!-- <div v-if="innerWidth <= 800">Mobile</div> -->
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
      innerHeight: window.innerHeight
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
</style>