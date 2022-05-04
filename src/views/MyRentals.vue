<template>
  <div class="container">
    <div class="d-flex justify-content-start align-items-center">
      <div class="align-items-center back-arrow-container" @click="back">
        <i class="fa fa-arrow-left"></i>
        <span class="mx-2">Tilbake</span>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <h2>Mine lån</h2>
    </div>
    <div class="d-flex justify-content-center search-box-container-style">
      <div class="d-flex search-container">
        <input type="search" placeholder="Søk" class="w-100" />
        <button class="btn btn-primary btn-style" type="button">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </div>
  </div>
  <div>
    <RentalListComponent
        :rentals="rentals"
    />
  </div>
</template>

<script>
import RentalListComponent from "@/components/RentalListComponent";
import lendingService from "@/services/lendingService";

export default {
  name: "MyRentals",
  components: {
    RentalListComponent,
  },
  data() {
    return {
      rentals: [],
    };
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
  },
  created() {
      lendingService
          .getHistoryRentalForUser(localStorage.getItem("userId"))
          .then(response => {
            for (let i = 0; i < response.data.rentals.length; i++) {
              this.rentals.push(response.data.rentals[i])
            }
            console.log(this.rentals)
            if(response.status!==200){
              alert("Fikk ikke kontakt med serveren")
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
};
</script>

<style scoped>
.search-box-container-style {
  margin-bottom: 20px;
}

.btn-style {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  width: 80px;
}

.categories-card-container-style {
  padding: 10px;
}

@media (min-width: 992px) {
  .search-container {
    width: 50%;
  }
}

@media (max-width: 991px) {
  .search-container {
    width: 80%;
  }
}

.back-arrow-container {
  cursor: pointer;
}
</style>
