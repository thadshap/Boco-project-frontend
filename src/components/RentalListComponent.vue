<template>
  <main class="page projets-page">
    <section class="portfolio-block project-no-images">
      <div class="container">
        <div class="d-flex flex-row flex-wrap">
          <RentalComponent
              v-for="rental in rentals"
              :key="rental"
              :id="rental.id"
              :adId="rental.adId"
              :borrower="rental.borrower"
              :owner="rental.owner"
              :price="rental.price"
              :active="rental.active"
              :deadline="rental.deadline"
              :rentTo="rental.rentTo"
              :rentFrom="rental.rentFrom"
              :dateOfRental="rental.dateOfRental"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import RentalComponent from "@/components/RentalComponent";

export default {
  name: "RentalListComponent",
  components: {
    RentalComponent
  },
  props: {
    rentals: {
      type: Array,
    }
  },

}
</script>

<style scoped></style>
