<template>
  <div class="d-flex justify-content-center align-items-center">
    <div
      class="d-flex flex-row justify-content-start align-items-center flex-wrap mx-auto w-100"
    >
      <AdComponent
        v-for="ad in ads"
        :key="ad"
        :title="ad.title"
        :image="ad.img"
        :place="ad.place"
        :price="ad.price"
      />
    </div>
  </div>
</template>

<script>
import AdComponent from "@/components/AdComponent";

export default {
  name: "AdListComponent",
  components: {
    AdComponent,
  },
  props: {
    ads: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
