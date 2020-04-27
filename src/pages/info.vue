<template>
  <q-layout view="lHh Lpr lFf">
    <app-menu></app-menu>
    <div class="mainDiv">
      <q-resize-observer @resize="onResize" />
      <div class="text-h5 q-pa-md">Info: The Chamcha Tree</div>
      <img src="statics/image/chamcha.jpg" style="width:100%" alt />
      <div
        class="text-body1 q-pa-md"
      >The Chamchuri Tree has the scientific name Samanca Saman (Jacq) Merr., A medium to large size perennial plant. Can last for a hundred years The trunk can be more than 25 meters tall and has a canopy width of more than 25 meters. Often found on the side of the road, farmland and various government offices. Planting popularity for shade from a wide-spread canopy Providing wood for making furniture due to beautiful patterns And planting mainly to support lac</div>

      <div
        class="text-body1 q-pa-md q-pb-xl"
      >Chamchuri tree originated in South America. Was first planted in Thailand from Myanmar Around the year 1900 (1900) by Mr. H. Slath (Mr. H. Slade), who was then the first director of the Royal Forest Department of Thailand. By using it to plant on the roadside of the Department of Forestry Chiangmai Province And some parts were planted in Krabi province At that time, the name was given to Chamchuri trees as “Gimbi trees”. At present, Chamchuri trees are often referred to as other names, such as the northern and northeastern regions, often called the Chacha / Samsan tree or the Crab tree, and other names such as Sara or khamkoong or lang.</div>
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
  max-width: 800px;
  width: 100%
  margin: auto;
</style>