<template>
  <div>
    <q-resize-observer @resize="onResize" />
    <div class="footerBg">
      <!-- For menu 1000px++ -->
      <div class="mainDiv q-py-xl row" v-if="innerWidth  >1000">
        <div class="col-4 q-pt-sm">
          <img src="statics/image/logo.png" />
          <div
            class="text-body2 box q-pb-md q-px-md"
          >We are an anyone’s ultimate destination for getting this perfect kitchen table, cozy armchair or a beautiful and comfy king sized bed! All in all, whatever home furniture you’ll be looking for, look no further!</div>
        </div>
        <div class="col-4 q-pa-md q-pl-xl">
          <!-- <div class="text-h6">WHY BUY FROM US</div>
          <div class="q-py-sm">Shipping & Delivery</div>
          <div class="q-pb-sm">Support</div>
          <div class="q-pb-sm">Guarantee</div>
          <div class="q-pb-sm">Terms & Conditions</div>-->
        </div>
        <div class="col-4 q-pa-md">
          <div class="text-h6">CONTACTS</div>
          <div>
            <div
              class="q-py-sm"
            >Address: 234/4 Moo. 3, T. Sannameng, A. Sanzai, Chiangmai Thailand 50210</div>
            <div class="q-py-sm">Phones: 800-2345-6789; 800-2345-6789</div>
            <div class="q-py-sm">E-mail: zsihomedecor@gmail.com</div>
          </div>
        </div>
      </div>
      <!-- For menu <1000 -->
      <div class="mainDiv q-py-md row" v-if="innerWidth  <=1000">
        <q-list padding class="rounded-borders" style="width:100%">
          <q-expansion-item class="text-h6" label="About">
            <q-card class="text-body2">
              <q-card-section class="bg-grey-3">
                <img src="statics/image/logo.png" style="width:100%; max-width:300px;" />
                <br />Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item class="text-h6" label="Contact us">
            <q-card class="text-body2">
              <q-card-section class="bg-grey-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    };
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
.footerBg
  background-color: #EAEAEA


        
</style>