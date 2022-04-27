<template>
  <main class="page projets-page">
    <section class="portfolio-block project-no-images">
      <div class="container">
        <div class="d-flex flex-row flex-wrap">

          <AdComponent
            v-on:click="adClicked($event)"
            v-for="ad in ads"
            :key="ad"
            :id="ad.id"
            :title="ad.title"
            :image="ad.img"
            :place="ad.place"
            :price="ad.price"
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
    adClicked(e){
      localStorage.setItem("currentAd", e.currentTarget);
      console.log(e.currentTarget);
    },
  }

}
</script>

<style scoped></style>
