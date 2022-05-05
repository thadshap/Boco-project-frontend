<template>
  <main class="page projets-page">
    <section class="portfolio-block project-no-images">
      <div class="container">
        <div class="d-flex flex-row flex-wrap">
          <AdComponent
            v-for="ad in ads"
            :key="ad"
            :id="ad.id"
            :title="ad.title"
            :image="ad.img"
            :place="ad.place"
            :price="ad.price"
            :userId="ad.userId"
            :distance="ad.distance"
            :lat="ad.lat"
            :lng="ad.lng"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import AdComponent from "@/components/AdComponent";

export default {
  name: "AdListComponent",
  components: {
    AdComponent
  },
  props: {
    ads: {
      type: Array,
    }
  },
  methods: {
  }

}
</script>

<style scoped></style>
